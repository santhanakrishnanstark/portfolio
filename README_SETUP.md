# Portfolio Setup Instructions

## 🎉 Your Portfolio is Ready!

All missing pages have been created and the project structure is complete. Here's what you need to do next:

## 📝 Step 1: Personalize Your Content

Edit `data/portfolio.json` and replace the placeholder data with your actual information:

### Personal Information
```json
{
  "personal": {
    "name": "Your Actual Name",
    "title": "Your Job Title",
    "email": "your.actual.email@example.com",
    "phone": "+1 (555) 123-4567",
    "location": "Your City, Country",
    "bio": "Write your actual bio here...",
    "social": {
      "github": "https://github.com/youractualusername",
      "linkedin": "https://linkedin.com/in/youractualusername",
      "twitter": "https://twitter.com/youractualusername"
    }
  }
}
```

### Projects
- Replace the sample projects with your actual projects
- Add real GitHub URLs and live demo links
- Update technologies, descriptions, and dates

### Experience
- Add your actual work experience
- Update company names, positions, and achievements
- Modify the date ranges

### Skills
- Update the skills list with your actual proficiencies
- Adjust the experience levels (Beginner, Intermediate, Advanced)

## 📁 Step 2: Add Your Assets

### Resume
Replace `public/santhanakrishnan_resume.pdf` with your actual resume file.

### Project Images
Add project screenshots to `public/images/projects/`:
- `ecommerce.jpg` - for the e-commerce project
- `task-manager.jpg` - for the task management app
- `weather.jpg` - for the weather dashboard
- Add images for any new projects you add

### Profile Picture (Optional)
Add your professional headshot as `public/images/avatar.jpg`

## 🚀 Step 3: Test Locally

Once npm install completes, run:
```bash
npm run dev
```

Visit `http://localhost:3000` to see your portfolio.

## 📋 Step 4: Deploy to GitHub Pages

1. **Create a GitHub repository** (name it `portfolio` or `yourusername.github.io`)

2. **Update next.config.js** if needed:
   - If repo name is `yourusername.github.io`, comment out the basePath and assetPrefix lines
   - If repo name is `portfolio`, keep the current configuration

3. **Push your code**:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio setup"
   git remote add origin https://github.com/yourusername/portfolio.git
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to Pages section
   - Select "Deploy from a branch"
   - Choose "gh-pages" branch
   - Save

Your site will be live at `https://yourusername.github.io/portfolio`

## 🎨 Step 5: Customize (Optional)

### Colors
Edit `tailwind.config.js` to change the color scheme:
```javascript
colors: {
  primary: {
    500: '#your-color',
    600: '#your-darker-color',
    // ... etc
  }
}
```

### Add New Pages
Create new files in the `pages/` directory following the existing pattern.

## 📊 Step 6: Analytics (Optional)

To add Google Analytics:
1. Get your GA4 tracking ID
2. Add it as `NEXT_PUBLIC_GA_ID` environment variable
3. The tracking code is already set up in `_document.js`

## 🔧 Troubleshooting

### Build Issues
- Ensure all JSON syntax is valid in `portfolio.json`
- Check that all image paths exist
- Verify Node.js version is 18+

### Deployment Issues
- Check GitHub Actions logs for errors
- Ensure GitHub Pages is enabled
- Verify the correct branch is selected

## 📞 Need Help?

If you encounter any issues:
1. Check the browser console for errors
2. Review the GitHub Actions logs
3. Ensure all file paths are correct
4. Validate your JSON syntax

## 🎯 What You Have Now

✅ **Complete Portfolio Website**
- Professional homepage with hero section
- About page with experience timeline
- Projects page with filtering
- Blog page with search functionality
- Contact page with form and info
- Responsive design for all devices
- SEO optimized
- GitHub Pages ready

✅ **Modern Tech Stack**
- Next.js 14 with static export
- Tailwind CSS for styling
- React Icons for consistency
- Framer Motion for animations
- Automated deployment with GitHub Actions

Your portfolio is now ready to showcase your work professionally!