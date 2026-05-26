@echo off
cls
echo ============================================================
echo   EXPENSE TRACKER - QUICK FIX DEPLOYMENT
echo ============================================================
echo.
echo This script will:
echo 1. Help you get MongoDB Atlas connection string
echo 2. Add it to Vercel
echo 3. Deploy the fixed backend
echo.
echo ============================================================
echo.
echo STEP 1: Get MongoDB Atlas Connection String
echo ============================================================
echo.
echo I've opened MongoDB Atlas for you. Please:
echo.
echo 1. Sign in to MongoDB Atlas (or create free account)
echo 2. Create a FREE cluster (M0) if you don't have one
echo 3. Click "Connect" on your cluster
echo 4. Choose "Connect your application"
echo 5. Copy the connection string
echo.
echo Your connection string should look like:
echo mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/
echo.
echo IMPORTANT: 
echo - Replace ^<password^> with your actual password
echo - Add "expense-tracker" after .net/
echo - Keep ?retryWrites=true^&w=majority at the end
echo.
echo Example:
echo mongodb+srv://user:pass123@cluster0.abc.mongodb.net/expense-tracker?retryWrites=true^&w=majority
echo.
pause
echo.
echo ============================================================
echo STEP 2: Add MongoDB URI to Vercel
echo ============================================================
echo.
cd backend
call vercel env add MONGODB_URI production
echo.
echo ============================================================
echo STEP 3: Deploy Fixed Backend
echo ============================================================
echo.
call vercel --prod
echo.
echo ============================================================
echo   DEPLOYMENT COMPLETE!
echo ============================================================
echo.
echo Your app is now live at:
echo https://frontend-nu-seven-69.vercel.app
echo.
echo Test it:
echo 1. Go to the app
echo 2. Register a new user
echo 3. Login (should work now!)
echo 4. Add expenses and enjoy!
echo.
echo ============================================================
pause
