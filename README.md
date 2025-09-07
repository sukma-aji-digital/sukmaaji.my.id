# Sukma Aji Digital - Portfolio Website

![Portfolio Preview](https://img.shields.io/badge/Portfolio-Next.js_Developer-blueviolet)
![Status](https://img.shields.io/badge/Status-Live-success)
![License](https://img.shields.io/badge/License-MIT-green)
![Responsive](https://img.shields.io/badge/Design-Responsive-blue)

Portfolio website dan company profile untuk **Sukma Aji Digital** yang dibangun dengan Next.js, TypeScript, dan Tailwind CSS. Website ini menampilkan layanan digital, portfolio project, dan blog dengan static site generation.

## 🚀 Teknologi yang Digunakan

- **Framework**: Next.js 14 dengan App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Blog**: Static Site Generator dengan Markdown
- **Icons**: Font Awesome
- **Deployment**: GitHub Pages dengan static export

## 📁 Struktur Project

```
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── blog/           # Blog pages & dynamic routes
│   │   ├── owner/          # Owner profile page
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Homepage
│   ├── components/         # Reusable React components
│   └── lib/               # Utility functions (blog parser)
├── posts/                 # Markdown blog posts
├── public/
│   └── images/            # Static assets
├── old-html-files/        # Backup HTML lama
└── out/                   # Build output (static export)
```

## 🎯 Fitur Website

### Homepage

- ✅ Hero section responsive
- ✅ Services showcase (4 layanan utama)
- ✅ Portfolio projects dengan gambar
- ✅ About company section
- ✅ Contact information
- ✅ Social media integration

### Blog System

- ✅ Static site generation dengan Markdown
- ✅ Blog post listing dengan pagination-ready
- ✅ Dynamic routing `/blog/[slug]`
- ✅ SEO-friendly metadata
- ✅ Syntax highlighting ready
- ✅ Tags dan categories support

### Owner Profile

- ✅ Personal profile Muhammad Aji Sukma
- ✅ Experience timeline
- ✅ Technical skills rating
- ✅ Personal quote section

### Optimisasi

- ✅ Mobile-first responsive design
- ✅ SEO optimized
- ✅ Fast loading dengan static export
- ✅ Progressive Web App ready
- ✅ Optimized images dengan Next.js Image

## �️ Development

### Prerequisites

- Node.js 18+
- npm atau yarn

### Installation

```bash
# Clone repository
git clone https://github.com/sukmaajidigital/sukmaajidigital.github.io.git
cd sukmaajidigital.github.io

# Install dependencies
npm install

# Run development server
npm run dev
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run export   # Build dan export static files
```

### Membuat Blog Post Baru

1. Buat file `.md` baru di folder `posts/`
2. Tambahkan frontmatter:

```markdown
---
title: "Judul Artikel"
date: "2025-01-01"
excerpt: "Deskripsi singkat artikel"
author: "Muhammad Aji Sukma"
tags: ["tag1", "tag2"]
image: "/images/blog/thumbnail.jpg" # optional
---

# Konten artikel dalam Markdown...
```

3. Build ulang website: `npm run build`

## 📦 Deployment

Website ini di-deploy otomatis ke GitHub Pages melalui static export:

```bash
# Build dan export static files
npm run build

# Files akan tersimpan di folder /out/
# Deploy ke GitHub Pages secara manual atau otomatis
```

### GitHub Actions (Opsional)

Bisa ditambahkan workflow untuk auto-deploy saat push ke main branch.

## 🎨 Customization

### Warna & Theme

Edit `tailwind.config.js` untuk mengubah color scheme:

```javascript
theme: {
  extend: {
    colors: {
      dark: {
        100: "#1E293B", // Bisa diubah
        200: "#172033",
        // ...
      },
      accent: {
        DEFAULT: "#6366F1", // Primary color
        // ...
      }
    }
  }
}
```

### Konten

- Edit komponen di `src/components/` untuk mengubah konten
- Ganti gambar di `public/images/`
- Update metadata di `src/app/layout.tsx`

## 📷 Screenshot

![Homepage Screenshot](images/screenshot.png)

## 🌐 Live Website

🔗 [https://sukmaaji.my.id](https://sukmaaji.my.id)

## 📞 Kontak

- **Email**: sukmaajidigital@gmail.com
- **LinkedIn**: [Muhammad Aji Sukma](https://www.linkedin.com/in/sukma-aji-08b470286/)
- **GitHub**: [sukmaajidigital](https://github.com/sukmaajidigital)
- **Instagram**: [@sukmaaji.digital](https://instagram.com/sukmaaji.digital)

## 📄 License

MIT License - lihat file [LICENSE](LICENSE) untuk detail.

---

**Sukma Aji Digital** © 2025 - Solusi Digital untuk Bisnis Anda
