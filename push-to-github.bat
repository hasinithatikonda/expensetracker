@echo off
echo ========================================
echo Push Expense Tracker to GitHub
echo ========================================
echo.
echo STEP 1: Create GitHub Repository
echo ---------------------------------
echo 1. Go to: https://github.com/new
echo 2. Repository name: expense-tracker
echo 3. Description: AI-powered expense tracker with receipt scanning
echo 4. Choose Public or Private
echo 5. DO NOT initialize with README
echo 6. Click "Create repository"
echo.
echo Press any key after creating the repository...
pause >nul
echo.
echo STEP 2: Enter Your GitHub Username
echo -----------------------------------
set /p username="Enter your GitHub username: "
echo.
echo STEP 3: Pushing to GitHub...
echo ----------------------------
echo.

git remote add origin https://github.com/%username%/expense-tracker.git
git branch -M main
git push -u origin main

echo.
echo ========================================
echo SUCCESS! Your code is now on GitHub!
echo ========================================
echo.
echo Your repository: https://github.com/%username%/expense-tracker
echo.
echo Next steps:
echo 1. Visit your repository on GitHub
echo 2. Add description and topics
echo 3. Connect Vercel for auto-deploy (optional)
echo.
pause
