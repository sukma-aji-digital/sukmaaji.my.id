# Contributing to Sukma Aji Digital Portfolio

🎉 Terima kasih telah tertarik untuk berkontribusi! Semua bentuk kontribusi sangat dihargai.

## 📋 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [How to Contribute](#-how-to-contribute)
- [Development Setup](#-development-setup)
- [Code Standards](#-code-standards)
- [Pull Request Process](#-pull-request-process)
- [Issue Guidelines](#-issue-guidelines)
- [Feature Requests](#-feature-requests)
- [Testing](#-testing)
- [Documentation](#-documentation)
- [Community](#-community)

## 🤝 Code of Conduct

Project ini mengikuti [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/). Dengan berpartisipasi, Anda diharapkan untuk mengikuti kode etik ini.

### Perilaku yang Diharapkan:

- ✅ Menggunakan bahasa yang ramah dan inklusif
- ✅ Menghormati sudut pandang dan pengalaman yang berbeda
- ✅ Menerima kritik konstruktif dengan baik
- ✅ Fokus pada yang terbaik untuk komunitas
- ✅ Menunjukkan empati terhadap anggota komunitas lain

### Perilaku yang Tidak Diterima:

- ❌ Penggunaan bahasa atau imagery yang bersifat seksual
- ❌ Trolling, komentar yang menghina atau menyerang
- ❌ Pelecehan publik atau pribadi
- ❌ Mempublikasikan informasi pribadi orang lain tanpa izin
- ❌ Perilaku lain yang tidak pantas dalam lingkungan profesional

## 🚀 How to Contribute

### 1. 🍴 Fork Repository

```bash
# Klik tombol "Fork" di GitHub
# Clone fork Anda
git clone https://github.com/YOUR_USERNAME/sukmaajidigital.github.io.git
cd sukmaajidigital.github.io
```

### 2. 🌟 Create Branch

```bash
# Create dan checkout branch baru
git checkout -b feature/nama-fitur-baru

# Atau untuk bugfix
git checkout -b bugfix/nama-bug-yang-diperbaiki
```

### 3. ✨ Make Changes

- Buat perubahan pada code
- Test perubahan Anda secara lokal
- Commit dengan pesan yang jelas

### 4. 📝 Commit Changes

```bash
git add .
git commit -m "✨ Add: fitur baru yang keren"

# Gunakan conventional commits:
# ✨ feat: fitur baru
# 🐛 fix: perbaikan bug
# 📝 docs: update dokumentasi
# 🎨 style: perubahan formatting/styling
# ♻️ refactor: refactoring code
# ⚡ perf: peningkatan performance
# ✅ test: menambah/update tests
```

### 5. 🔄 Push & Create PR

```bash
git push origin feature/nama-fitur-baru

# Buat Pull Request di GitHub
# Isi template PR dengan lengkap
```

## 💻 Development Setup

### Prerequisites

- Node.js 18+ dan npm
- Git
- VS Code (recommended)

### Installation

```bash
# 1. Clone repository
git clone https://github.com/sukmaajidigital/sukmaajidigital.github.io.git
cd sukmaajidigital.github.io

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
open http://localhost:3000
```

### Useful Commands

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # Linting
npm run lint:fix     # Auto-fix linting issues
npm run type-check   # TypeScript validation
```

## 🎨 Code Standards

### TypeScript

- Gunakan TypeScript untuk semua file baru
- Hindari penggunaan `any`, lebih baik `unknown`
- Export types dan interfaces yang reusable

```typescript
// ✅ Good
interface BlogPost {
  title: string;
  author: string;
  publishedAt: Date;
}

// ❌ Avoid
const post: any = {
  /* ... */
};
```

### React Components

- Gunakan functional components dengan hooks
- Props destructuring di parameter
- Meaningful component names

```tsx
// ✅ Good
interface BlogCardProps {
  title: string;
  excerpt: string;
  slug: string;
}

export default function BlogCard({ title, excerpt, slug }: BlogCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md">
      <h3>{title}</h3>
      <p>{excerpt}</p>
    </article>
  );
}
```

### CSS/Tailwind

- Gunakan Tailwind CSS classes
- Responsive-first approach
- Consistent spacing menggunakan Tailwind scale

```tsx
// ✅ Good
<div className="p-4 md:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">

// ❌ Avoid custom CSS kecuali benar-benar perlu
<div style={{ padding: '16px', backgroundColor: 'white' }}>
```

### File Naming

- **Components**: PascalCase (`BlogCard.tsx`)
- **Pages**: kebab-case (`about-us.tsx`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Types**: PascalCase (`BlogPost.ts`)

### Folder Structure

```
src/
├── components/          # Reusable components
│   ├── ui/             # Basic UI components
│   └── sections/       # Page sections
├── app/                # Next.js app router pages
├── lib/                # Utilities & helpers
├── types/              # TypeScript type definitions
└── hooks/              # Custom React hooks
```

## 📋 Pull Request Process

### PR Template

Ketika membuat PR, isi template dengan:

```markdown
## 📝 Description

Brief description of changes

## 🔄 Type of Change

- [ ] 🐛 Bug fix
- [ ] ✨ New feature
- [ ] 📝 Documentation update
- [ ] 🎨 Style changes
- [ ] ♻️ Code refactoring

## ✅ Testing

- [ ] Manual testing completed
- [ ] Responsive design tested
- [ ] Cross-browser compatibility checked

## 📷 Screenshots (if applicable)

![Before](url)
![After](url)

## 📋 Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated if needed
- [ ] No console errors or warnings
```

### Review Process

1. **Automated Checks**: PR akan di-check otomatis untuk linting dan build
2. **Code Review**: Maintainer akan review code dalam 1-2 hari
3. **Feedback**: Jika ada feedback, lakukan perubahan dan push
4. **Merge**: Setelah approved, PR akan di-merge ke main branch

### PR Guidelines

- ✅ **Small & Focused**: Satu PR untuk satu fitur/bugfix
- ✅ **Clear Title**: Descriptive title dengan emoji
- ✅ **Complete Description**: Jelaskan what, why, dan how
- ✅ **Screenshots**: Untuk perubahan UI
- ✅ **Test Locally**: Pastikan berjalan tanpa error

## 🐛 Issue Guidelines

### Bug Reports

```markdown
**🐛 Bug Description**
Clear description of the bug

**🔄 Steps to Reproduce**

1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**💻 Environment**

- OS: [e.g. Windows 11]
- Browser: [e.g. Chrome 91]
- Device: [e.g. Desktop/Mobile]

**📷 Screenshots**
If applicable, add screenshots

**📋 Additional Context**
Add any other context about the problem
```

### Feature Requests

```markdown
**✨ Feature Description**
Clear description of the feature

**🎯 Problem Statement**
What problem does this solve?

**💡 Proposed Solution**
How would you like it to work?

**📋 Additional Context**
Mockups, examples, references
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] **Homepage**: All sections load properly
- [ ] **Blog**: Posts load, pagination works
- [ ] **Projects**: Portfolio items display correctly
- [ ] **Contact**: Form submission works
- [ ] **PWA**: Install prompt shows, offline works
- [ ] **Responsive**: Mobile, tablet, desktop views
- [ ] **Performance**: Page loads in < 3 seconds
- [ ] **SEO**: Meta tags, structured data correct

### Cross-Browser Testing

Test pada browser berikut sebelum submit PR:

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (if available)
- ✅ Edge (latest)

### Responsive Testing

Test pada device sizes:

- 📱 **Mobile**: 320px - 768px
- 📟 **Tablet**: 768px - 1024px
- 💻 **Desktop**: 1024px+

## 📚 Documentation

### Code Documentation

```typescript
/**
 * Formats date untuk display di blog posts
 * @param date - ISO date string dari frontmatter
 * @param locale - Locale untuk formatting (default: 'id-ID')
 * @returns Formatted date string
 */
export function formatDate(date: string, locale: string = "id-ID"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}
```

### Markdown Documentation

- Update README.md jika menambah fitur major
- Dokumentasi API jika ada endpoint baru
- Screenshot untuk fitur UI baru

## 💬 Community

### Communication Channels

- 📧 **Email**: hello@sukmaaji.my.id
- 💼 **LinkedIn**: [Muhammad Aji Sukma](https://linkedin.com/in/sukmaaji)
- 🐦 **Twitter**: [@sukma_aji_dev](https://x.com/sukmaajidigital)

### Getting Help

- 🔍 **Search Issues**: Cek apakah pertanyaan sudah pernah diajukan
- 💬 **Discussions**: Gunakan GitHub Discussions untuk pertanyaan umum
- 📝 **New Issue**: Buat issue baru jika tidak menemukan jawaban

### Recognition

Kontributor akan diakui melalui:

- 🎉 **Contributors Section** di README.md
- 🏆 **GitHub Contributors Graph**
- 📱 **Social Media Shoutouts** untuk kontribusi significant

## 🎁 Good First Issues

Baru pertama kali berkontribusi? Mulai dengan label:

- 🔰 `good first issue` - Cocok untuk pemula
- 📝 `documentation` - Update dokumentasi
- 🐛 `bug` - Fix bug sederhana
- 🎨 `design` - UI/UX improvements

## ❓ Questions?

Jangan ragu untuk bertanya! Tidak ada pertanyaan yang terlalu sederhana.

---

**Terima kasih telah berkontribusi pada Sukma Aji Digital! 🚀**

_Together, we're building better digital experiences for everyone._
