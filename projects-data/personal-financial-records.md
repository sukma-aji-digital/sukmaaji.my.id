---
title: "FinSu - Personal Financial Records"
description: "Aplikasi pencatatan keuangan pribadi yang modern dan aman. Dilengkapi dashboard interaktif, perencanaan transaksi, analitik lanjutan, dan two-factor authentication. Dibangun dengan Laravel 12, Vue 3, dan TypeScript."
shortDescription: "Aplikasi pencatatan keuangan pribadi dengan dashboard interaktif, perencanaan transaksi, dan analitik keuangan."
technologies: ["Laravel 12", "Vue 3", "Inertia.js", "TypeScript", "Tailwind CSS v4"]
category: "Web Application"
status: "completed"
featured: true
demoUrl: "https://fin.sukmaaji.my.id"
githubUrl: "https://github.com/sukmaajidigital/personal-financial-records"
image: "/images/finsu.png"
year: "2026"
client: "Personal Project"
createdAt: "2026-03-01"
---

# FinSu - Personal Financial Records

**FinSu** adalah aplikasi web untuk pencatatan dan analisis keuangan pribadi. Aplikasi ini membantu pengguna memantau pemasukan, pengeluaran, dan saldo melalui interface yang bersih dan dashboard yang interaktif.

## Project Overview

Banyak orang kesulitan melacak keuangan pribadi karena tidak memiliki tools yang praktis. FinSu dikembangkan untuk menjawab kebutuhan tersebut dengan pendekatan yang sederhana namun fungsional:

- **Pencatatan mudah** tanpa proses yang berbelit
- **Visualisasi data** agar pola keuangan terlihat jelas
- **Perencanaan transaksi** untuk budgeting yang lebih baik
- **Keamanan akun** dengan two-factor authentication
- **Gratis dan open source** untuk siapa saja

## Technical Stack

### Backend

- **Laravel 12**: Framework PHP terbaru dengan fitur-fitur modern
- **Inertia.js**: Bridge antara backend dan frontend tanpa memerlukan API terpisah
- **MySQL/MariaDB**: Database relasional untuk penyimpanan data transaksi

### Frontend

- **Vue 3**: Framework JavaScript reaktif dengan Composition API
- **TypeScript**: Static typing untuk code yang lebih reliable
- **Tailwind CSS v4**: Utility-first CSS framework versi terbaru

## Key Features

### 1. Dashboard Interaktif

Dashboard menampilkan ringkasan keuangan secara real-time:

- Grafik tren pemasukan dan pengeluaran 6 bulan terakhir
- Pie chart pengeluaran berdasarkan kategori
- Ringkasan saldo, total pemasukan, dan total pengeluaran

### 2. Manajemen Transaksi

Sistem pencatatan transaksi yang lengkap:

- Input transaksi dengan tanggal, deskripsi, kategori, dan jumlah
- Filter berdasarkan bulan, tahun, atau kategori
- Riwayat transaksi yang terorganisir dan mudah dicari

### 3. Perencanaan Transaksi (Draft)

Fitur perencanaan untuk membantu budgeting:

- Simpan rencana transaksi sebagai draft
- Eksekusi draft menjadi transaksi aktual saat sudah terjadi
- Membantu memastikan tidak ada pengeluaran yang terlewat

### 4. Kategori Custom

Pengguna bisa mengelola kategori sesuai kebutuhan:

- Kategori bawaan (Gaji, Makanan, Transportasi, dll)
- Tambah kategori baru kapan saja
- Fleksibel untuk berbagai jenis pencatatan keuangan

### 5. Analitik Lanjutan

Halaman analitik untuk insight yang lebih dalam:

- Perbandingan pemasukan vs pengeluaran bulanan
- Ringkasan keuangan tahunan
- Breakdown detail per kategori pengeluaran

### 6. Keamanan

Fitur keamanan untuk melindungi data keuangan pengguna:

- Manajemen profil dan password
- Two-Factor Authentication (2FA)
- Session management

### 7. Tampilan Responsif

- Dark mode dan light mode
- Responsive design untuk desktop dan mobile
- Interface yang bersih dan modern

## Development Highlights

### Arsitektur Monolith Modern

FinSu menggunakan arsitektur monolith modern dengan Inertia.js sebagai penghubung antara Laravel dan Vue. Pendekatan ini memberikan pengalaman Single Page Application tanpa kompleksitas membangun dan memaintain API terpisah.

```typescript
// Contoh penggunaan Inertia.js dengan Vue 3 + TypeScript
import { usePage } from "@inertiajs/vue3";

interface Transaction {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: "income" | "expense";
}

const { props } = usePage<{
  transactions: Transaction[];
  balance: number;
  totalIncome: number;
  totalExpense: number;
}>();
```

### Visualisasi Data

Dashboard menggunakan chart library untuk menampilkan data keuangan secara visual, memudahkan pengguna memahami tren dan pola pengeluaran tanpa harus membaca angka satu per satu.

### Security Implementation

Implementasi 2FA menggunakan TOTP (Time-based One-Time Password) yang kompatibel dengan aplikasi authenticator seperti Google Authenticator atau Authy.

## Project Results

- **User Experience**: Interface yang intuitif, bisa digunakan tanpa panduan
- **Performance**: Loading cepat dengan SSR via Inertia.js
- **Security**: Data keuangan terlindungi dengan 2FA
- **Accessibility**: Bisa diakses dari perangkat apapun dengan browser

## Links

- **Live Demo**: [fin.sukmaaji.my.id](https://fin.sukmaaji.my.id)
- **Source Code**: [GitHub Repository](https://github.com/sukmaajidigital/personal-financial-records)

---

_FinSu adalah bukti bahwa pencatatan keuangan pribadi bisa dilakukan dengan cara yang modern, aman, dan menyenangkan. Open source dan gratis untuk semua orang._
