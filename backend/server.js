const dns = require('dns');
const { promisify } = require('util');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const resolveSrv = promisify(dns.resolveSrv);

// Load environment variables
dotenv.config();

function configureAtlasDns() {
  const dnsServers = (process.env.DNS_SERVERS || '8.8.8.8,8.8.4.4')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (dnsServers.length) {
    dns.setServers(dnsServers);
  }
}

/** Atlas mongodb+srv often fails TLS on some hosts; resolve to a standard URI. */
async function resolveMongoUri(uri) {
  if (!uri || !uri.startsWith('mongodb+srv://')) {
    return uri;
  }

  configureAtlasDns();

  const match = uri.match(/^mongodb\+srv:\/\/([^@]+)@([^/?]+)(\/[^?]*)?(\?.*)?$/);
  if (!match) {
    return uri;
  }

  const [, credentials, clusterHost, dbPath = '/expense-tracker', query = ''] = match;
  const records = await resolveSrv(`_mongodb._tcp.${clusterHost}`);
  const hosts = records.map((r) => `${r.name}:${r.port}`).join(',');
  const params = new URLSearchParams(query.replace(/^\?/, ''));
  if (!params.has('authSource')) params.set('authSource', 'admin');
  if (!params.has('ssl')) params.set('ssl', 'true');

  const qs = params.toString();
  return `mongodb://${credentials}@${hosts}${dbPath}${qs ? `?${qs}` : ''}`;
}

// Import routes
const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expenses');
const analyticsRoutes = require('./routes/analytics');
const settingsRoutes = require('./routes/settings');

const app = express();

// Middleware — allow Vercel frontend and local dev
const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    const allowed = [
      process.env.FRONTEND_URL,
      'http://localhost:3000',
      'http://localhost:3002',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3002',
    ].filter(Boolean);
    if (allowed.includes(origin) || /\.vercel\.app$/i.test(origin)) {
      return callback(null, true);
    }
    callback(new Error(`CORS blocked origin: ${origin}`));
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

let dbConnectPromise = null;

if (!global.__expenseTrackerMongoose) {
  global.__expenseTrackerMongoose = { conn: null, promise: null };
}

function ensureDatabase() {
  if (global.__expenseTrackerMongoose.conn) {
    return Promise.resolve(global.__expenseTrackerMongoose.conn);
  }
  if (!dbConnectPromise) {
    dbConnectPromise = connectDatabase()
      .then((conn) => {
        global.__expenseTrackerMongoose.conn = conn;
        return conn;
      })
      .catch((err) => {
        dbConnectPromise = null;
        throw err;
      });
  }
  return dbConnectPromise;
}

app.use('/api', async (req, res, next) => {
  if (req.path === '/health') {
    return next();
  }
  try {
    await ensureDatabase();
    next();
  } catch (err) {
    console.error('Database middleware error:', err);
    res.status(503).json({ message: 'Database is unavailable. Please try again in a moment.' });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/settings', settingsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'development' ? err.message : undefined 
  });
});

const PORT = process.env.PORT || 5000;

async function connectDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (global.__expenseTrackerMongoose.promise) {
    return global.__expenseTrackerMongoose.promise;
  }

  const mongoUri = await resolveMongoUri(process.env.MONGODB_URI || '');
  if (!mongoUri) {
    throw new Error('MONGODB_URI is not configured');
  }

  global.__expenseTrackerMongoose.promise = mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 10000,
    bufferCommands: false,
  });

  await global.__expenseTrackerMongoose.promise;
  console.log('✅ MongoDB connected successfully');
  return mongoose.connection;
}

if (!process.env.VERCEL) {
  ensureDatabase().catch((err) => console.error('❌ MongoDB connection error:', err));
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports = app;
