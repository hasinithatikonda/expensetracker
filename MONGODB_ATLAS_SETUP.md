# MongoDB Atlas Setup - Quick Guide

## Why You Need This

Your local MongoDB (`mongodb://localhost:27017`) won't work on Vercel. You need a cloud database.

## Quick Setup (5 minutes)

### Step 1: Create MongoDB Atlas Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google/GitHub or email
3. Choose **FREE** tier (M0)

### Step 2: Create a Cluster
1. After signup, click "Build a Database"
2. Choose **FREE** (M0) tier
3. Select a cloud provider (AWS recommended)
4. Choose a region close to you
5. Cluster name: `Cluster0` (default is fine)
6. Click "Create Cluster" (takes 1-3 minutes)

### Step 3: Create Database User
1. You'll see a security quickstart
2. Choose "Username and Password"
3. **Username**: `expenseuser` (or your choice)
4. **Password**: Click "Autogenerate Secure Password" and **COPY IT**
5. Click "Create User"

### Step 4: Add IP Whitelist
1. Scroll down to "Where would you like to connect from?"
2. Choose "My Local Environment"
3. Click "Add My Current IP Address"
4. **IMPORTANT**: Also add `0.0.0.0/0` (allows from anywhere - needed for Vercel)
5. Click "Finish and Close"

### Step 5: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Driver: Node.js, Version: 5.5 or later
4. Copy the connection string (looks like):
   ```
   mongodb+srv://expenseuser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **Replace `<password>`** with the password you copied earlier
6. **Add database name** after `.net/`: 
   ```
   mongodb+srv://expenseuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/expense-tracker?retryWrites=true&w=majority
   ```

### Step 6: Add to Vercel

Run this command (replace with your actual connection string):

```bash
cd backend
vercel env add MONGODB_URI production
```

When prompted, paste your MongoDB Atlas connection string.

### Step 7: Redeploy Backend

```bash
vercel --prod
```

---

## Example Connection String

**Before (Local - Won't work on Vercel):**
```
mongodb://localhost:27017/expense-tracker
```

**After (Atlas - Works on Vercel):**
```
mongodb+srv://expenseuser:MySecurePass123@cluster0.abc123.mongodb.net/expense-tracker?retryWrites=true&w=majority
```

---

## Quick Access Links

- **MongoDB Atlas Dashboard**: https://cloud.mongodb.com
- **Create Account**: https://www.mongodb.com/cloud/atlas/register
- **Documentation**: https://docs.atlas.mongodb.com/getting-started/

---

## Troubleshooting

### Can't connect to database
- Check username and password are correct
- Ensure `0.0.0.0/0` is in IP whitelist
- Verify database name is in connection string

### Special characters in password
If your password has special characters, URL-encode them:
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`

---

## After Setup

1. Add MONGODB_URI to Vercel
2. Redeploy backend
3. Test your app: https://frontend-nu-seven-69.vercel.app

Your app will then be fully functional! 🚀
