@echo off
echo ========================================
echo Add MongoDB Atlas URI to Vercel
echo ========================================
echo.
echo STEP 1: Get your MongoDB Atlas connection string
echo ------------------------------------------------
echo 1. Go to: https://cloud.mongodb.com
echo 2. Click "Connect" on your cluster
echo 3. Choose "Connect your application"
echo 4. Copy the connection string
echo 5. Replace ^<password^> with your actual password
echo 6. Add /expense-tracker after .net/
echo.
echo Example:
echo mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/expense-tracker?retryWrites=true^&w=majority
echo.
echo Press any key when you have your connection string ready...
pause >nul
echo.
echo STEP 2: Add to Vercel
echo ----------------------
cd backend
vercel env add MONGODB_URI production
echo.
echo STEP 3: Redeploy Backend
echo ------------------------
vercel --prod
echo.
echo ========================================
echo SUCCESS! Backend is now configured!
echo ========================================
echo.
echo Test your app at: https://frontend-nu-seven-69.vercel.app
echo.
pause
