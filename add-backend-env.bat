@echo off
echo Adding Environment Variables to Backend...
echo.
echo Please have your MongoDB URI, JWT Secret, and OpenAI API Key ready.
echo.

cd backend

echo Adding MONGODB_URI...
vercel env add MONGODB_URI production

echo.
echo Adding JWT_SECRET...
vercel env add JWT_SECRET production

echo.
echo Adding OPENAI_API_KEY...
vercel env add OPENAI_API_KEY production

echo.
echo Adding NODE_ENV...
echo production | vercel env add NODE_ENV production

echo.
echo Environment variables added successfully!
echo.
echo Now redeploying backend with environment variables...
vercel --prod

echo.
echo Backend deployment complete!
echo.
pause
