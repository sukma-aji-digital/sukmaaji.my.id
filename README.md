# 🚀 Sukma Aji Digital - Progressive Web App Portfolio

<div align="center">

![Portfolio Preview](https://img.shields.io/badge/Portfolio-Next.js_PWA-blueviolet)
![Status](https://img.shields.io/badge/Status-Live-success)
![License](https://img.shields.io/badge/License-MIT-green)
![PWA](https://img.shields.io/badge/PWA-Ready-orange)
![Responsive](https://img.shields.io/badge/Design-Responsive-blue)

**Modern Progressive Web App untuk Sukma Aji Digital**  
_Solusi Digital Profesional dengan Teknologi Terdepan_

[🌐 Live Demo](https://sukmaaji.my.id) • [📱 Install PWA](https://sukmaaji.my.id) • [📚 Documentation](#-dokumentasi)

![Banner](./public/images/banner.png)

</div>

## ✨ Overview

**Sukma Aji Digital Portfolio** adalah Progressive Web App (PWA) yang dibangun dengan Next.js 14, TypeScript, dan Tailwind CSS. Website ini menampilkan layanan digital profesional, portfolio project interaktif, blog dengan sidebar dinamis, dan fitur PWA yang memungkinkan instalasi seperti aplikasi native.

### 🎯 Key Features

- 🔥 **Progressive Web App** - Installable, offline-ready dengan service worker
- 📱 **Mobile-First Design** - Responsive di semua device dengan touch-friendly interface
- ⚡ **Ultra Fast** - Static site generation dengan caching optimal
- 🎨 **Modern UI/UX** - Dark theme dengan animations dan transitions
- 📊 **Dynamic Portfolio** - Carousel showcase dengan data dari Markdown
- 📝 **Smart Blog System** - Sidebar dengan related posts, sharing, dan newsletter
- 🔍 **SEO Optimized** - Structured data, meta tags, dan dynamic sitemaps
- 🛡️ **Security Ready** - Modern security headers dan best practices

## 🛠️ Tech Stack

### Core Technologies

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Font Awesome 6](https://fontawesome.com/)
- **PWA**: Service Worker + Web App Manifest

### Content Management

- **Blog**: Static Site Generation dengan Gray Matter
- **Projects**: Markdown-based dengan dynamic routing
- **Images**: Next.js Image optimization
- **SEO**: Dynamic sitemap generation

### Deployment & Performance

- **Hosting**: GitHub Pages (Static Export)
- **CDN**: Image optimization & caching
- **Performance**: Lighthouse score 90+
- **Analytics**: Ready for Google Analytics integration

## � Project Structure

```
sukmaaji.my.id/
├── 📂 src/
│   ├── 📂 app/                    # Next.js 14 App Router
│   │   ├── 📂 blog/              # Blog system
│   │   │   ├── 📂 [slug]/        # Dynamic blog posts
│   │   │   └── page.tsx          # Blog listing
│   │   ├── 📂 projects/          # Portfolio system
│   │   │   ├── 📂 [slug]/        # Dynamic project pages
│   │   │   └── page.tsx          # Projects listing
│   │   ├── 📂 me/                # About page
│   │   ├── 📂 sitemap*/          # Dynamic SEO sitemaps
│   │   ├── favicon.ico           # App icon
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout + PWA config
│   │   └── page.tsx              # Homepage
│   ├── 📂 components/            # Reusable React components
│   │   ├── Header.tsx            # Navigation with active states
│   │   ├── Footer.tsx            # Footer with social links
│   │   ├── PortfolioSection.tsx  # Dynamic carousel
│   │   ├── NewsletterSubscription.tsx # Client component
│   │   ├── ShareButtons.tsx      # Social sharing
│   │   └── PWAInstaller.tsx      # Install prompt handler
│   └── 📂 lib/                   # Utilities & helpers
│       ├── blog.ts               # Blog content parser
│       └── projects.ts           # Projects content parser
├── 📂 posts/                     # Blog content (Markdown)
│   ├── hello-world.md
│   └── laravel-umkm-tutorial.md
├── 📂 projects-data/             # Portfolio content (Markdown)
│   ├── blog-pribadi-nextjs.md
│   ├── marketplace-umkm-desa-bae.md
│   └── umkm-management-system.md
├── 📂 public/                    # Static assets
│   ├── 📂 images/               # Optimized images
│   ├── site.webmanifest         # PWA manifest
│   ├── sw.js                    # Service worker
│   ├── browserconfig.xml        # Windows tiles
│   └── robots.txt               # SEO crawling rules
└── 📂 out/                       # Build output (static export)
```

## � Features Showcase

### 🏠 Homepage

- **🎯 Hero Section**: Dynamic typing animation dengan CTA buttons
- **💼 Services Showcase**: 4 layanan utama dengan hover effects
- **📊 Portfolio Carousel**: Auto-play showcase dengan navigation controls
- **👤 About Section**: Company story dengan statistics
- **📞 Contact Form**: Interactive form dengan validation
- **🔗 Social Integration**: Links ke semua platform digital

### 📝 Blog System

- **📖 Article Layout**: Natural reading experience seperti Medium
- **📱 Sidebar Widgets**:
  - 🔗 Social sharing (Twitter, LinkedIn, Facebook, WhatsApp)
  - 📰 Related articles dengan thumbnails
  - 👤 Author information dengan links
  - 📧 Newsletter subscription dengan validation
  - 🏷️ Interactive tags
- **🎨 Content Styling**: Syntax highlighting, typography optimal
- **📱 Mobile Responsive**: Perfect reading di semua devices

### 🗂️ Portfolio System

- **📁 Dynamic Projects**: Content loaded dari Markdown files
- **🎠 Interactive Carousel**: Touch-friendly dengan auto-play
- **📊 Project Stats**: Categories, completion status, technologies
- **🔗 Quick Actions**: Live demo dan GitHub links
- **📱 Responsive Grid**: Adaptive layout untuk semua screen sizes

### 📱 Progressive Web App

- **⬇️ Install Prompt**: Custom beautiful install banner
- **🔄 Service Worker**: Offline caching dengan smart updates
- **🚀 App Shortcuts**: Quick access ke Portfolio, Blog, Contact
- **🎨 Native Feel**: Fullscreen experience tanpa browser UI
- **📊 Performance**: Fast loading dengan cached resources

## ⚡ Quick Start

### Prerequisites

```bash
node -v  # v18.0.0 or higher
npm -v   # v8.0.0 or higher
```

### Installation

```bash
# 1. Clone repository
git clone https://github.com/sukma-aji-digital/sukmaaji.my.id.git
cd sukmaaji.my.id

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
open http://localhost:3000
```

### 🛠️ Available Scripts

| Command              | Description                                      |
| -------------------- | ------------------------------------------------ |
| `npm run dev`        | 🔥 Start development server dengan hot reload    |
| `npm run build`      | 🏗️ Build production version dengan optimizations |
| `npm run start`      | 🚀 Start production server (after build)         |
| `npm run lint`       | 🔍 Run ESLint untuk code quality check           |
| `npm run type-check` | ✅ TypeScript type checking                      |

## 📝 Content Management

### ✍️ Menambah Blog Post

1. **Buat file Markdown** di `posts/`:

```bash
touch posts/my-new-post.md
```

2. **Tambahkan frontmatter**:

````markdown
---
title: "Judul Artikel yang Menarik"
date: "2025-09-09"
excerpt: "Ringkasan artikel yang engaging untuk preview"
author: "Muhammad Aji Sukma"
tags: ["Next.js", "PWA", "Web Development"]
image: "/images/blog/my-post.jpg" # Optional
---

# Content artikel dalam Markdown

Tulis konten artikel menggunakan **Markdown syntax**.

## Subheading

- List item 1
- List item 2

```javascript
// Code example dengan syntax highlighting
const example = "Hello World";
```
````

### �️ Menambah Project Portfolio

1. **Buat file Markdown** di `projects-data/`:

```bash
touch projects-data/my-new-project.md
```

2. **Tambahkan project frontmatter**:

```markdown
---
title: "Nama Project Keren"
description: "Deskripsi project yang engaging"
image: "/images/project/project-thumbnail.jpg"
category: "Web Development"
status: "Completed"
liveUrl: "https://project-demo.com"
repoUrl: "https://github.com/username/repo"
technologies: ["Next.js", "TypeScript", "Tailwind"]
completion: "100%"
---

# Detail Project

Penjelasan lengkap tentang project, challenges yang dihadapi,
dan solusi yang diterapkan.

## Key Features

- Feature 1 dengan impact yang jelas
- Feature 2 dengan teknologi yang digunakan

## Screenshots

![Screenshot 1](/images/project/screenshot1.jpg)
```

3. **Tambahkan images** ke folder `public/images/project/`
4. **Refresh development server** untuk melihat perubahan

### 🎨 Customization Guide

#### 🎭 Theme & Styling

```typescript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6", // Ubah warna utama
        secondary: "#64748b", // Ubah warna sekunder
      },
    },
  },
};
```

#### ⚙️ PWA Configuration

```javascript
// public/site.webmanifest
{
  "name": "Website Name",           // Ubah nama app
  "short_name": "Short Name",       // Nama pendek
  "theme_color": "#3b82f6",        // Warna tema
  "background_color": "#ffffff",    // Warna background
  "start_url": "/",                // URL pembuka
  "display": "standalone"          // Mode tampilan
}
```

## 🌐 Deployment

### 📚 GitHub Pages (Recommended)

```bash
# 1. Build static export
npm run build

# 2. Configure GitHub Pages
# Settings → Pages → Source: GitHub Actions

# 3. Push to main branch - auto deploy! ✨
git add .
git commit -m "🚀 Deploy update"
git push origin main
```

### ⚡ Vercel (Alternative)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login dan deploy
vercel --prod

# 3. Custom domain (optional)
vercel domains add your-domain.com
```

### 🐳 Docker (Advanced)

```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Performance & SEO

### 🚀 Performance Metrics

- **Lighthouse Score**: 95+ (Performance)
- **First Contentful Paint**: < 1.2s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Total Blocking Time**: < 100ms

### 🔍 SEO Features

- ✅ **Meta Tags**: Dynamic title, description, og:image
- ✅ **Structured Data**: JSON-LD untuk blog dan projects
- ✅ **Sitemaps**: Auto-generated XML sitemaps
- ✅ **Robots.txt**: Optimized crawling rules
- ✅ **Schema Markup**: Rich snippets untuk Google

### 📱 PWA Capabilities

- ✅ **Offline Support**: Service worker dengan caching strategy
- ✅ **Install Prompt**: Native app-like installation
- ✅ **App Shortcuts**: Quick access ke fitur utama
- ✅ **Background Sync**: Update content otomatis
- ✅ **Push Notifications**: Ready untuk implementasi

## 🤝 Contributing

Kontribusi sangat diterima! Lihat [CONTRIBUTING.md](./CONTRIBUTING.md) untuk:

- 📋 **Code of Conduct** - Panduan berperilaku
- 🔄 **Pull Request Process** - Cara submit changes
- 🎨 **Code Standards** - Styling dan formatting
- 🧪 **Testing Guidelines** - Quality assurance
- 💡 **Feature Requests** - Cara mengusulkan fitur baru

### � Quick Contribute

```bash
# 1. Fork repository
# 2. Create feature branch
git checkout -b feature/amazing-feature

# 3. Make changes & commit
git commit -m "✨ Add amazing feature"

# 4. Push & create PR
git push origin feature/amazing-feature
```

## 📄 License

Project ini menggunakan **MIT License** - lihat file [LICENSE](./LICENSE) untuk detail lengkap.

**Ringkasan lisensi:**

- ✅ Commercial use - Boleh untuk komersial
- ✅ Modification - Boleh dimodifikasi
- ✅ Distribution - Boleh didistribusikan
- ✅ Private use - Boleh untuk penggunaan pribadi
- ⚠️ Liability - Tidak ada garansi
- ⚠️ Warranty - Tidak ada jaminan

## 🙏 Acknowledgments

- 💙 **Next.js Team** - Framework yang luar biasa
- 🎨 **Tailwind CSS** - Styling yang powerful
- 🚀 **Vercel** - Platform deployment terbaik
- 🔧 **Open Source Community** - Semua tools yang digunakan
- 📝 **DEV Community** - Inspirasi dan pembelajaran

## 📞 Support & Contact

Butuh bantuan? Punya pertanyaan? Hubungi kami:

- 📧 **Email**: hello@sukmaaji.my.id
- 💼 **LinkedIn**: [Muhammad Aji Sukma](https://linkedin.com/in/muhammad-aji-sukma)
- 🐦 **Twitter**: [@sukma_aji_dev](https://twitter.com/sukma_aji_dev)
- 💬 **WhatsApp**: [+62 851-5648-8212](https://wa.me/6285156488212)
- 🌐 **Website**: [sukmaaji.my.id](https://sukmaaji.my.id)

---

<div align="center">

**⭐ Jika project ini bermanfaat, berikan star ya! ⭐**

Made with ❤️ by [Muhammad Aji Sukma](https://sukmaaji.my.id)

_Empowering digital transformation in rural Indonesia_ 🇮🇩

</div>
