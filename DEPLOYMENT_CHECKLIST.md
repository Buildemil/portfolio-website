# 📋 Deployment Checklist

Before deploying your portfolio to production, complete these steps:

## 1. Content Review
- [ ] All project descriptions are accurate
- [ ] Contact email is correct (currently: emilnet@gmx.de)
- [ ] All links work (GitHub, LinkedIn, etc.)
- [ ] Images load correctly

## 2. SEO Check
- [ ] Update domain in `app/layout.tsx` (currently: emilvorbrugg.com)
- [ ] Update domain in `app/sitemap.ts`
- [ ] Update domain in `public/robots.txt`
- [ ] Add favicon.ico to `public/` folder

## 3. Build Test
```bash
npm run build
```
- [ ] Build completes without errors
- [ ] Check `out/` folder contains files

## 4. Domain Setup (if using custom domain)
- [ ] Purchase domain (e.g., namecheap.com, godaddy.com)
- [ ] Point DNS to your hosting provider
- [ ] Wait for DNS propagation (up to 48 hours)

## 5. Deploy

### Vercel:
```bash
vercel --prod
```

### Netlify:
```bash
netlify deploy --prod --dir=out
```

## 6. Post-Deployment
- [ ] Test site on mobile
- [ ] Test site on desktop
- [ ] Check all links work
- [ ] Test contact form/email
- [ ] Submit to Google Search Console
- [ ] Add to LinkedIn profile

## 7. Optional Enhancements
- [ ] Add Google Analytics
- [ ] Add contact form (Formspree, etc.)
- [ ] Add blog section
- [ ] Connect custom domain

---

**Current Status:** ✅ Ready to deploy!
