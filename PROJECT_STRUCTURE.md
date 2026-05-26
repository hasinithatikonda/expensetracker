# Project Structure

## 📁 Clean Project Layout

```
expensetracker/
├── backend/                    # Backend API (Node.js + Express)
│   ├── config/                # Configuration files
│   ├── middleware/            # Express middleware
│   ├── models/                # MongoDB models
│   ├── routes/                # API routes
│   ├── services/              # Business logic
│   ├── uploads/               # Receipt uploads
│   ├── .env                   # Environment variables (not in git)
│   ├── .env.example           # Environment template
│   ├── package.json           # Backend dependencies
│   ├── server.js              # Entry point
│   └── vercel.json            # Vercel config
│
├── frontend/                   # Frontend App (React + Vite)
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── context/           # React context
│   │   ├── pages/             # Page components
│   │   ├── App.jsx            # Main app component
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Global styles
│   ├── .env                   # Environment variables (not in git)
│   ├── .env.example           # Environment template
│   ├── index.html             # HTML template
│   ├── package.json           # Frontend dependencies
│   ├── tailwind.config.js     # Tailwind CSS config
│   ├── vite.config.js         # Vite config
│   └── vercel.json            # Vercel config
│
├── .git/                       # Git repository
├── .gitignore                  # Git ignore rules
├── add-backend-env.bat         # Helper script for env setup
├── CONTRIBUTING.md             # Contribution guidelines
├── DEPLOY_TO_VERCEL.md         # Deployment instructions
├── DEPLOYMENT_COMPLETE.md      # Deployment status & next steps
├── FEATURES.md                 # Feature documentation
├── LICENSE                     # MIT License
├── PROJECT_STRUCTURE.md        # This file
└── README.md                   # Main documentation
```

## 📄 Essential Files

### Root Level
- **README.md** - Main project documentation
- **DEPLOYMENT_COMPLETE.md** - Deployment guide and live URLs
- **DEPLOY_TO_VERCEL.md** - Detailed deployment instructions
- **FEATURES.md** - Feature list and capabilities
- **CONTRIBUTING.md** - How to contribute
- **LICENSE** - MIT License
- **.gitignore** - Files to ignore in git

### Backend
- **server.js** - Express server entry point
- **package.json** - Dependencies and scripts
- **.env** - Environment variables (local only)
- **.env.example** - Template for environment setup
- **vercel.json** - Vercel deployment configuration

### Frontend
- **src/App.jsx** - Main React application
- **src/main.jsx** - React entry point
- **package.json** - Dependencies and scripts
- **vite.config.js** - Vite build configuration
- **tailwind.config.js** - Tailwind CSS configuration
- **.env** - Environment variables (local only)
- **.env.example** - Template for environment setup
- **vercel.json** - Vercel deployment configuration

## 🚀 Quick Commands

### Development
```bash
# Start backend
cd backend
npm run dev

# Start frontend
cd frontend
npm run dev
```

### Deployment
```bash
# Deploy backend
cd backend
vercel --prod

# Deploy frontend
cd frontend
vercel --prod
```

### Build
```bash
# Build frontend
cd frontend
npm run build
```

## 📦 Dependencies

### Backend
- express - Web framework
- mongoose - MongoDB ODM
- jsonwebtoken - JWT authentication
- bcryptjs - Password hashing
- multer - File uploads
- cors - CORS middleware
- dotenv - Environment variables
- openai - OpenAI API client

### Frontend
- react - UI library
- react-router-dom - Routing
- axios - HTTP client
- recharts - Charts library
- lucide-react - Icons
- react-hot-toast - Notifications
- tailwindcss - CSS framework
- vite - Build tool

## 🔗 Live URLs

- **Frontend**: https://frontend-nu-seven-69.vercel.app
- **Backend**: https://backend-delta-eight-26.vercel.app/api

## 📚 Documentation

- **README.md** - Start here for project overview
- **DEPLOYMENT_COMPLETE.md** - Deployment guide
- **FEATURES.md** - Feature documentation
- **CONTRIBUTING.md** - Contribution guidelines

## 🎯 Key Features

- User authentication (JWT)
- Manual expense entry
- AI receipt scanning (OpenAI)
- Dashboard with analytics
- Charts and visualizations
- Expense filtering and search
- Budget tracking
- Settings management
- Responsive design

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Recharts
- **Backend**: Node.js, Express, MongoDB
- **AI**: OpenAI Vision API
- **Deployment**: Vercel
- **Database**: MongoDB Atlas
- **Authentication**: JWT

---

**Clean, organized, and production-ready!** 🚀
