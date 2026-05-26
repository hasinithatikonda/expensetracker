# Deploy to Vercel - Quick Start Guide

## 🚀 Deployment Steps

### Method 1: Using Vercel CLI (Fastest)

#### Step 1: Login to Vercel
```bash
vercel login
```
Follow the prompts to authenticate with your email or GitHub account.

#### Step 2: Deploy Backend
```bash
cd backend
vercel
```

When prompted:
- **Set up and deploy**: Yes
- **Which scope**: Select your account
- **Link to existing project**: No
- **Project name**: expense-tracker-backend (or your choice)
- **Directory**: ./
- **Override settings**: No

**Add Environment Variables:**
After deployment, add environment variables:
```bash
vercel env add MONGODB_URI
vercel env add JWT_SECRET
vercel env add OPENAI_API_KEY
vercel env add NODE_ENV
```

Or add them via Vercel Dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add each variable for Production, Preview, and Development

**Required Environment Variables:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker
JWT_SECRET=your_secure_random_string_min_32_characters
OPENAI_API_KEY=your_openai_api_key_optional
NODE_ENV=production
```

#### Step 3: Deploy Frontend
```bash
cd ../frontend
vercel
```

When prompted:
- **Set up and deploy**: Yes
- **Which scope**: Select your account
- **Link to existing project**: No
- **Project name**: expense-tracker-frontend (or your choice)
- **Directory**: ./
- **Override settings**: No

**Add Environment Variable:**
```bash
vercel env add VITE_API_URL
```

Set the value to your backend URL from Step 2:
```
VITE_API_URL=https://your-backend-url.vercel.app/api
```

#### Step 4: Redeploy Frontend
After adding the environment variable, redeploy:
```bash
vercel --prod
```

### Method 2: Using Vercel Web Dashboard

#### Step 1: Push to GitHub

1. **Create a new repository on GitHub**
   - Go to https://github.com/new
   - Name it: `expense-tracker`
   - Don't initialize with README (we already have one)
   - Click "Create repository"

2. **Push your code**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/expense-tracker.git
   git branch -M main
   git push -u origin main
   ```

#### Step 2: Deploy Backend on Vercel

1. Go to https://vercel.com/new
2. Click "Import Project"
3. Import your GitHub repository
4. Configure:
   - **Root Directory**: `backend`
   - **Framework Preset**: Other
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
   - **Install Command**: `npm install`

5. Add Environment Variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secure_random_string
   OPENAI_API_KEY=your_openai_api_key
   NODE_ENV=production
   ```

6. Click "Deploy"
7. **Copy your backend URL** (e.g., `https://expense-tracker-backend.vercel.app`)

#### Step 3: Deploy Frontend on Vercel

1. Go to https://vercel.com/new again
2. Import the same GitHub repository
3. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app/api
   ```
   (Replace with your actual backend URL from Step 2)

5. Click "Deploy"

## 📋 Pre-Deployment Checklist

### 1. MongoDB Atlas Setup

- [ ] Create MongoDB Atlas account
- [ ] Create a free cluster (M0)
- [ ] Create database user with password
- [ ] Whitelist all IPs (0.0.0.0/0) in Network Access
- [ ] Get connection string
- [ ] Replace `<password>` and `<dbname>` in connection string

**Connection String Format:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/expense-tracker?retryWrites=true&w=majority
```

### 2. Generate JWT Secret

Use a strong random string (minimum 32 characters):
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Or use: https://randomkeygen.com/

### 3. OpenAI API Key (Optional)

- [ ] Sign up at https://platform.openai.com
- [ ] Add billing information
- [ ] Create API key
- [ ] Copy and save securely

**Note:** AI receipt scanning is optional. Manual entry works without API key.

## 🔧 Post-Deployment Configuration

### Update Backend CORS

After deploying frontend, update backend to allow frontend domain:

1. Go to backend project in Vercel
2. Settings → Environment Variables
3. Add:
   ```
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```

4. Update `backend/server.js` (if not already done):
   ```javascript
   app.use(cors({
     origin: process.env.FRONTEND_URL || 'http://localhost:3000',
     credentials: true
   }));
   ```

5. Redeploy backend

### Verify Deployment

1. **Test Backend:**
   - Visit: `https://your-backend-url.vercel.app/api/health`
   - Should return: `{"status":"ok"}`

2. **Test Frontend:**
   - Visit your frontend URL
   - Try registering a new user
   - Login and add an expense
   - Check dashboard and analytics

## 🎯 Quick Commands Reference

### Deploy Backend
```bash
cd backend
vercel --prod
```

### Deploy Frontend
```bash
cd frontend
vercel --prod
```

### View Logs
```bash
vercel logs
```

### List Deployments
```bash
vercel ls
```

### Remove Project
```bash
vercel remove expense-tracker-backend
vercel remove expense-tracker-frontend
```

## 🐛 Troubleshooting

### Backend Issues

**Error: Cannot connect to MongoDB**
- Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Check connection string format
- Ensure password doesn't contain special characters (or URL-encode them)

**Error: Environment variables not found**
- Go to Vercel Dashboard → Settings → Environment Variables
- Verify all variables are set for Production
- Redeploy after adding variables

**Error: CORS policy blocking requests**
- Add FRONTEND_URL environment variable
- Update CORS configuration in server.js
- Redeploy backend

### Frontend Issues

**Error: API calls failing**
- Verify VITE_API_URL is correct
- Check browser console for errors
- Ensure backend is deployed and running
- Test backend health endpoint

**Error: Build fails**
- Check build logs in Vercel dashboard
- Verify all dependencies are in package.json
- Try building locally: `npm run build`

**Error: Blank page after deployment**
- Check browser console for errors
- Verify vercel.json rewrites configuration
- Check if all assets are loading

### Database Issues

**Error: Authentication failed**
- Verify MongoDB username and password
- Check connection string format
- Ensure special characters in password are URL-encoded
  - `@` → `%40`
  - `#` → `%23`
  - `$` → `%24`

**Error: Network timeout**
- Check MongoDB Atlas network access settings
- Ensure 0.0.0.0/0 is whitelisted
- Try connecting from MongoDB Compass first

## 📊 Monitoring

### Vercel Dashboard
- View deployment logs
- Monitor function executions
- Check error rates
- View analytics

### MongoDB Atlas
- Monitor database performance
- Check connection count
- View query performance
- Set up alerts

## 🔐 Security Best Practices

1. **Never commit .env files**
   - Already in .gitignore
   - Use Vercel environment variables

2. **Use strong secrets**
   - JWT_SECRET: minimum 32 characters
   - Use cryptographically secure random strings

3. **Rotate credentials regularly**
   - Change JWT secret periodically
   - Rotate API keys
   - Update database passwords

4. **Monitor API usage**
   - Check OpenAI API usage
   - Monitor Vercel function executions
   - Set up billing alerts

## 💰 Cost Considerations

### Free Tier Limits

**Vercel Free Tier:**
- 100 GB bandwidth per month
- 100 GB-hours serverless function execution
- Unlimited deployments
- Automatic HTTPS

**MongoDB Atlas Free Tier (M0):**
- 512 MB storage
- Shared RAM
- Shared vCPU
- No backup
- Perfect for development/small projects

**OpenAI API:**
- Pay-per-use
- ~$0.00015 per receipt scan (gpt-4o-mini)
- Set usage limits in OpenAI dashboard

### Upgrade Recommendations

**When to upgrade Vercel:**
- High traffic (>100 GB/month)
- Need custom domains
- Require team collaboration
- Need advanced analytics

**When to upgrade MongoDB:**
- Storage >512 MB
- Need backups
- Require dedicated resources
- Production workloads

## 🎉 Success Checklist

After deployment, verify:

- [ ] Backend is accessible and returns health status
- [ ] Frontend loads without errors
- [ ] User registration works
- [ ] User login works
- [ ] Manual expense creation works
- [ ] Dashboard displays data correctly
- [ ] Analytics charts render
- [ ] Filtering and search work
- [ ] Settings page accessible
- [ ] No console errors in browser
- [ ] No errors in Vercel function logs

## 📞 Support Resources

- **Vercel Documentation**: https://vercel.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com
- **OpenAI API Docs**: https://platform.openai.com/docs
- **Project Issues**: Create an issue on GitHub

## 🚀 Next Steps

After successful deployment:

1. **Custom Domain** (Optional)
   - Add custom domain in Vercel settings
   - Configure DNS records
   - Automatic HTTPS

2. **Monitoring**
   - Set up error tracking (Sentry)
   - Configure uptime monitoring
   - Set up alerts

3. **Performance**
   - Enable Vercel Analytics
   - Optimize images
   - Implement caching

4. **Features**
   - Add more expense categories
   - Implement budget alerts
   - Add export functionality
   - Create mobile app

## 📝 Environment Variables Summary

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker
JWT_SECRET=your_super_secret_jwt_key_min_32_characters
OPENAI_API_KEY=sk-your_openai_api_key_here
NODE_ENV=production
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.vercel.app/api
```

---

**Ready to deploy? Start with Method 1 (CLI) for the fastest deployment!**

Need help? Check the troubleshooting section or create an issue on GitHub.
