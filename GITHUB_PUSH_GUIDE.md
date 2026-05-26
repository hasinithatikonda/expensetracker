# Push to GitHub - Step by Step Guide

## Option 1: Create Repository via GitHub Website (Recommended)

### Step 1: Create GitHub Repository

1. Go to: https://github.com/new
2. Fill in the details:
   - **Repository name**: `expense-tracker` (or your preferred name)
   - **Description**: "AI-powered expense tracker with receipt scanning, analytics, and budget management"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
3. Click "Create repository"

### Step 2: Push Your Code

After creating the repository, GitHub will show you commands. Use these:

```bash
git remote add origin https://github.com/YOUR_USERNAME/expense-tracker.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

---

## Option 2: Using GitHub CLI (If Installed)

If you have GitHub CLI installed:

```bash
gh repo create expense-tracker --public --source=. --remote=origin --push
```

---

## Quick Commands (Copy & Paste)

### For GitHub Website Method:

```bash
# Add your GitHub repository as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/expense-tracker.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## After Pushing

### 1. Verify on GitHub
Visit: `https://github.com/YOUR_USERNAME/expense-tracker`

### 2. Add Repository Description
- Go to your repository on GitHub
- Click the gear icon next to "About"
- Add description: "AI-powered expense tracker with receipt scanning, analytics, and budget management"
- Add topics: `react`, `nodejs`, `mongodb`, `express`, `ai`, `expense-tracker`, `vercel`
- Add website: `https://frontend-nu-seven-69.vercel.app`

### 3. Enable GitHub Pages (Optional)
- Go to Settings → Pages
- Select branch: `main`
- Select folder: `/ (root)`

### 4. Connect Vercel to GitHub (Optional - Auto Deploy)

**Backend:**
1. Go to: https://vercel.com/hasinithatikondas-projects/backend/settings/git
2. Connect your GitHub repository
3. Set root directory: `backend`
4. Enable automatic deployments

**Frontend:**
1. Go to: https://vercel.com/hasinithatikondas-projects/frontend/settings/git
2. Connect your GitHub repository
3. Set root directory: `frontend`
4. Enable automatic deployments

---

## Troubleshooting

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/expense-tracker.git
```

### Error: "failed to push some refs"
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Error: "Permission denied (publickey)"
Use HTTPS instead of SSH, or set up SSH keys:
- Guide: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

---

## Repository Settings Recommendations

### Branch Protection (Optional)
- Go to Settings → Branches
- Add rule for `main` branch
- Enable "Require pull request reviews before merging"

### Secrets for CI/CD (Optional)
- Go to Settings → Secrets and variables → Actions
- Add secrets:
  - `MONGODB_URI`
  - `JWT_SECRET`
  - `OPENAI_API_KEY`

---

## What Gets Pushed

✅ **Included:**
- All source code (backend & frontend)
- Documentation files
- Configuration files
- .gitignore rules
- License

❌ **Excluded (via .gitignore):**
- node_modules/
- .env files
- build/dist folders
- uploads/*.jpg (receipt images)
- package-lock.json

---

## Next Steps After Push

1. ✅ Verify all files are on GitHub
2. ✅ Add repository description and topics
3. ✅ Update README with GitHub badges (optional)
4. ✅ Connect Vercel for auto-deploy (optional)
5. ✅ Share your repository link!

---

## Your Repository Will Be At:

`https://github.com/YOUR_USERNAME/expense-tracker`

**Remember to replace YOUR_USERNAME with your actual GitHub username!**
