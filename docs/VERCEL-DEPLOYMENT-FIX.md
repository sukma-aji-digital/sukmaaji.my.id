# Vercel Deployment Fix

## Problem

```
sh: line 1: copy: command not found
Error: Command "npm run build" exited with 127
```

## Root Cause

Script build di package.json menggunakan Windows-specific command `copy` yang tidak tersedia di Linux environment (Vercel).

## Solution Applied

### 1. Fixed package.json

**Before:**

```json
"build": "next build && copy .nojekyll out\\ && copy CNAME out\\ && copy robots.txt out\\ && copy sitemap.xml out\\ && copy site.webmanifest out\\"
```

**After:**

```json
"build": "next build"
```

### 2. Moved Static Files to Public Folder

Files yang dipindahkan ke `/public/`:

- `.nojekyll` - untuk GitHub Pages
- `CNAME` - untuk custom domain
- `site.webmanifest` - PWA manifest

### 3. Removed Conflicting Static Files

File yang dihapus karena sudah ada dynamic version:

- `public/robots.txt` (sudah ada `/robots.txt` API route)
- `public/sitemap.xml` (sudah ada `/sitemap.xml` API route)

### 4. Updated vercel.json

Simplified configuration:

```json
{
  "version": 2,
  "name": "sukmaajidigital-website",
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "headers": [...]
}
```

## Files Structure After Fix

```
public/
├── .nojekyll          ✅ Static file
├── CNAME              ✅ Static file
├── site.webmanifest   ✅ Static file
└── images/            ✅ Static assets

src/app/
├── robots.txt/route.ts           ✅ Dynamic
├── sitemap.xml/route.ts          ✅ Dynamic
├── sitemap-blog.xml/route.ts     ✅ Dynamic
├── sitemap-projects.xml/route.ts ✅ Dynamic
├── sitemap-images.xml/route.ts   ✅ Dynamic
└── sitemapindex.xml/route.ts     ✅ Dynamic
```

## Verification

### Local Build Test

```bash
npm run build
```

Result: ✅ Success (17/17 pages generated)

### API Routes Generated

- `/robots.txt` - Dynamic robots.txt
- `/sitemap.xml` - Main sitemap
- `/sitemap-blog.xml` - Blog posts sitemap
- `/sitemap-projects.xml` - Projects sitemap
- `/sitemap-images.xml` - Images sitemap
- `/sitemapindex.xml` - Sitemap index

## Deployment Instructions

1. **Commit and Push:**

```bash
git add .
git commit -m "fix: resolve Vercel build error - remove Windows-specific commands"
git push origin main
```

2. **Vercel Deployment:**

- Build command: `npm run build` (automatic)
- Output directory: `.next` (automatic)
- Framework: Next.js (auto-detected)

3. **Verify After Deployment:**

- Check `yoursite.com/robots.txt`
- Check `yoursite.com/sitemap.xml`
- Check all dynamic sitemaps
- Verify static files (.nojekyll, CNAME, manifest)

## Benefits of This Fix

1. **Cross-Platform Compatibility:** Works on Windows, macOS, Linux
2. **No External Dependencies:** No need for cp, copy, or cross-env packages
3. **Next.js Native:** Uses built-in public folder serving
4. **Dynamic Content:** Sitemaps update automatically
5. **Better Caching:** Proper headers for SEO files

## Common Issues & Solutions

### Issue: Static files not served

**Solution:** Ensure files are in `/public/` folder

### Issue: Dynamic routes not working

**Solution:** Check API route files are in correct App Router structure

### Issue: Sitemap conflicts

**Solution:** Remove static sitemap.xml from public folder

### Issue: Build still failing

**Solution:** Clear `.next` and `node_modules`, then rebuild:

```bash
rm -rf .next node_modules
npm install
npm run build
```

---

✅ **Status: Fixed and Ready for Production**
