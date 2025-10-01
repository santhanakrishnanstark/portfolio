# 🚀 Portfolio Deployment Guide

## GitHub Pages Deployment Steps

### 1. Create GitHub Repository for Root Domain

**For the cleanest URL (`https://santhanakrishnanstark.github.io/`):**

1. **Go to GitHub.com** and sign in to your account
2. **Click "New Repository"** (green button)
3. **Repository Settings:**
   - Repository name: `santhanakrishnanstark.github.io` (MUST match your username)
   - Description: `My professional portfolio website`
   - Set to **Public** (required for free GitHub Pages)
   - ✅ Add a README file
   - ✅ Add .gitignore (choose Node template)
   - Click **"Create repository"**

### 1b. Rename Existing Repository (If Already Created)

If you already created `portfolio-project`, rename it:
1. **Go to your repository** on GitHub
2. **Settings** tab
3. **Scroll down to "Repository name"**
4. **Change from** `portfolio-project` **to** `santhanakrishnanstark.github.io`
5. **Click "Rename"**

**⚠️ Important:** The repository name MUST be exactly `santhanakrishnanstark.github.io` for the root domain to work.

### 2. Upload Your Portfolio Code

**Option A: Using GitHub Desktop (Recommended for beginners)**
1. Download and install GitHub Desktop
2. Clone your new repository to your computer
3. Copy all your portfolio files into the cloned folder
4. Commit and push the changes

**Option B: Using Command Line**
```bash
# Navigate to your portfolio folder
cd /Users/santhanakrishnan01/Desktop/portfolio-project

# Initialize git (if not already done)
git init

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/portfolio-project.git

# Add all files
git add .

# Commit files
git commit -m "Initial portfolio commit"

# Push to GitHub
git push -u origin main
```

### 3. Enable GitHub Pages & Permissions

1. **Go to your repository** on GitHub.com
2. **Click "Settings"** tab
3. **Enable GitHub Actions permissions:**
   - Go to "Actions" → "General" in left sidebar
   - Under "Workflow permissions" select **"Read and write permissions"**
   - ✅ Check "Allow GitHub Actions to create and approve pull requests"
   - Click **"Save"**
4. **Set up GitHub Pages:**
   - Go to "Pages" in left sidebar
   - **Source:** Select **"GitHub Actions"**
5. **Push your code** - The workflow will automatically deploy

### 4. Fix Permission Issues (If Needed)

If you get a 403 permission error:

1. **Repository Settings** → **Actions** → **General**
2. **Workflow permissions:** Select **"Read and write permissions"**
3. **Save** and re-run the failed workflow
4. **Alternative:** Go to **Settings** → **Pages** → Select **"GitHub Actions"** as source

### 5. Access Your Live Portfolio

After deployment (takes 2-5 minutes), your portfolio will be available at:
```
https://santhanakrishnanstark.github.io/
```

**🎉 Clean, Professional URL - No subdirectories needed!**

## 🔧 Local Testing Before Deployment

Test the production build locally:

```bash
# Build for production
npm run build

# The build output will be in the 'out' folder
# You can serve it locally to test:
npx serve out
```

## 🎯 Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] Images display properly
- [ ] Navigation works
- [ ] Contact form functions
- [ ] Mobile responsiveness
- [ ] All links work

## 🔄 Making Updates

After initial deployment, simply:
1. Make changes to your code
2. Commit and push to GitHub
3. GitHub Actions will automatically rebuild and deploy

## 🌐 Custom Domain (Optional)

To use a custom domain like `yourname.com`:

1. **Purchase a domain** from a registrar
2. **Add CNAME file** to your repository root:
   ```
   yourname.com
   ```
3. **Configure DNS** at your domain registrar:
   - Add CNAME record pointing to `YOUR_USERNAME.github.io`
4. **Enable custom domain** in GitHub Pages settings

## 📊 Analytics Setup (Next Step)

After deployment, you can add Google Analytics:
1. Create Google Analytics account
2. Get tracking ID
3. Add tracking code to your portfolio
4. Monitor visitor statistics

## 🆘 Troubleshooting

**Common Issues:**
- **404 errors:** Check basePath in next.config.js
- **Images not loading:** Ensure images are in public folder
- **Build fails:** Check for syntax errors in code
- **Deployment stuck:** Check GitHub Actions tab for errors

**Need Help?**
- Check GitHub Actions logs for detailed error messages
- Ensure all file paths are correct
- Verify Next.js configuration

---

## 🎉 Ready to Deploy!

Your portfolio is configured and ready for GitHub Pages deployment. Follow the steps above to get your portfolio live on the web!