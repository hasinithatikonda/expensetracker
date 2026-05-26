# Connect Frontend and Backend Deployments

## Current Deployment URLs

### Backend
- **Production URL**: https://backend-delta-eight-26.vercel.app
- **API Endpoint**: https://backend-delta-eight-26.vercel.app/api

### Frontend
- **Production URL**: https://frontend-nu-seven-69.vercel.app

---

## Step 1: Add Backend Environment Variables

### Go to Backend Settings:
https://vercel.com/hasinithatikondas-projects/backend/settings/environment-variables

### Add These Variables:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `MONGODB_URI` | Your MongoDB Atlas connection string | Production, Preview, Development |
| `JWT_SECRET` | Your secure random string (32+ chars) | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |
| `OPENAI_API_KEY` | Your OpenAI API key (optional) | Production, Preview, Development |
| `FRONTEND_URL` | `https://frontend-nu-seven-69.vercel.app` | Production, Preview, Development |

**MongoDB URI Format:**
```
mongodb+srv://username:password@cluster.mongodb.net/expense-tracker?retryWrites=true&w=majority
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Step 2: Add Frontend Environment Variable

### Go to Frontend Settings:
https://vercel.com/hasinithatikondas-projects/frontend/settings/environment-variables

### Add This Variable:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `VITE_API_URL` | `https://backend-delta-eight-26.vercel.app/api` | Production, Preview, Development |

---

## Step 3: Redeploy Both Services

After adding environment variables, redeploy:

### Redeploy Backend:
```bash
cd backend
vercel --prod
```

Or via dashboard: https://vercel.com/hasinithatikondas-projects/backend/deployments

### Redeploy Frontend:
```bash
cd frontend
vercel --prod
```

Or via dashboard: https://vercel.com/hasinithatikondas-projects/frontend/deployments

---

## Quick Links

### Backend Dashboard
- **Settings**: https://vercel.com/hasinithatikondas-projects/backend/settings
- **Environment Variables**: https://vercel.com/hasinithatikondas-projects/backend/settings/environment-variables
- **Deployments**: https://vercel.com/hasinithatikondas-projects/backend/deployments
- **Logs**: https://vercel.com/hasinithatikondas-projects/backend/logs

### Frontend Dashboard
- **Settings**: https://vercel.com/hasinithatikondas-projects/frontend/settings
- **Environment Variables**: https://vercel.com/hasinithatikondas-projects/frontend/settings/environment-variables
- **Deployments**: https://vercel.com/hasinithatikondas-projects/frontend/deployments
- **Analytics**: https://vercel.com/hasinithatikondas-projects/frontend/analytics

---

## After Setup - Test Your App

### 1. Test Backend Health
Visit: https://backend-delta-eight-26.vercel.app/api/health

Should return: `{"status":"ok"}`

### 2. Test Frontend
Visit: https://frontend-nu-seven-69.vercel.app

### 3. Test Full Flow
1. Register a new user
2. Login
3. Add a manual expense
4. View dashboard
5. Check analytics

---

## Your Live App

**🌐 Live Application**: https://frontend-nu-seven-69.vercel.app

**📱 Share this link with anyone to access your expense tracker!**

---

## Troubleshooting

### If Backend Returns Errors:
- Check environment variables are set correctly
- View logs: https://vercel.com/hasinithatikondas-projects/backend/logs
- Verify MongoDB connection string

### If Frontend Shows Connection Errors:
- Verify VITE_API_URL is set correctly
- Check browser console for errors
- Ensure backend is running and healthy

### CORS Errors:
- Ensure FRONTEND_URL is set in backend environment variables
- Redeploy backend after adding FRONTEND_URL

---

## Environment Variables Summary

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker
JWT_SECRET=your_secure_random_string_32_chars
OPENAI_API_KEY=your_openai_key_optional
NODE_ENV=production
FRONTEND_URL=https://frontend-nu-seven-69.vercel.app
```

### Frontend (.env)
```env
VITE_API_URL=https://backend-delta-eight-26.vercel.app/api
```

---

**Complete these steps and your app will be fully functional!** 🚀
