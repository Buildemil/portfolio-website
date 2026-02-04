# Portfolio Website - Quick Reference

## What is this?

This is a **production-ready Next.js 14 portfolio website** with:
- Modern TypeScript + React architecture
- SEO optimization (Google-friendly)
- Responsive design (mobile, tablet, desktop)
- Optimized images and performance
- Static export capability (can host anywhere)

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. View at http://localhost:3000
```

## Deploy to Production

### Option 1: Vercel (Easiest - Recommended)
1. Push code to GitHub
2. Go to vercel.com
3. Click "Import Project"
4. Select your GitHub repo
5. Click "Deploy" - Done! ✅

### Option 2: Netlify
1. Push code to GitHub
2. Go to netlify.com
3. Click "Add new site"
4. Select your GitHub repo
5. Build command: `npm run build`
6. Publish directory: `out`
7. Click "Deploy" - Done! ✅

### Option 3: Any Static Host
```bash
npm run build
# Upload contents of 'out/' folder to your host
```

## File Structure Explained

- `app/page.tsx` - Your portfolio content (projects, about, etc.)
- `app/layout.tsx` - SEO metadata and overall layout
- `public/images/` - All your images
- `package.json` - Dependencies and scripts

## Customization

### Update Content
Edit `app/page.tsx` - all text, projects, and links are here

### Update SEO
Edit `app/layout.tsx` - change title, description, social sharing

### Update Styling
Edit `app/globals.css` - change colors, animations, fonts

### Add New Images
Add to `public/images/` and reference in code

## Tech Stack

- **Framework:** Next.js 14 (latest React framework)
- **Language:** TypeScript (JavaScript with types)
- **Styling:** Tailwind CSS (utility-first CSS)
- **Deployment:** Static export (works everywhere)

## Performance

✅ Optimized images (Next.js Image)
✅ Code splitting
✅ Static generation
✅ Fast page loads
✅ SEO-friendly markup

## Support

Built with latest web standards (2024).
Compatible with all modern browsers.

---

**Need help?** Check README.md for detailed documentation
