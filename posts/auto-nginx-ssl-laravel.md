---
title: "Auto Nginx SSL untuk Laravel on Ubuntu 24.04 (FOR DEVELOPMENT)"
date: "2026-01-30"
excerpt: "Code untuk auto nginx SSL di Laravel pada environment web development di Ubuntu 24.04 dengan stack Nginx, PHP, MariaDB, auto SSL, dan auto .test domain, serta script otomatisasi ala Laragon."
tags:
  [
    "Ubuntu",
    "Web Development",
    "Laragon",
    "Nginx",
    "PHP",
    "MariaDB",
    "Redis",
    "SSL",
    "Linux",
    "DevOps",
  ]
image: "/images/blog/auto-nginx-ssl-laravel.png"
---

# Auto Nginx SSL untuk Laravel on Ubuntu 24.04 (FOR DEVELOPMENT)

**OS:** Ubuntu 24.04 | **Stack:** Nginx, PHP, Redis, MariaDB | **Feature:** Auto SSL, Auto .test Domain

## Prerequisites

Sebelum menjalankan script, pastikan sistem Ubuntu/Linux Anda sudah memiliki:

### 1. Web Server & Processor

- **Nginx**: Web server utama  
   Cek: `nginx -v`
- **PHP-FPM**: Processor untuk Laravel (versi 8.2, 8.3, atau 8.4)  
   Cek: `php -v` dan `systemctl status php8.x-fpm`

### 2. Keamanan & SSL

- **mkcert**: Membuat sertifikat SSL lokal yang trusted browser  
   Cek: `mkcert --version`
- **libnss3-tools**: Library pendukung untuk browser certificate database  
   Install: `sudo apt install libnss3-tools`

### 3. Utilitas Sistem

- **OpenSSL**: Biasanya sudah bawaan Ubuntu
- **Bash**: Script ditulis dalam Bash
- **Sudo Access**: Diperlukan untuk menulis ke `/etc/nginx/` dan `/etc/hosts`

### Instalasi Lengkap

```bash
# Update repository
sudo apt update

# Install Nginx dan PHP (sesuaikan versi)
sudo apt install nginx php8.4-fpm php8.4-cli php8.4-common

# Install mkcert (jika belum lewat brew/binary)
sudo apt install libnss3-tools

```

Buat file script dengan perintah berikut:

```bash
sudo nano /usr/local/bin/auto-nginx-laravel
```

Kemudian paste kode di bawah ini ke dalam file tersebut:

```bash
#!/bin/bash

# Pastikan dijalankan sebagai root/sudo
if [ "$EUID" -ne 0 ]; then
  echo "Silakan jalankan dengan sudo: sudo auto-nginx-laravel"
  exit
fi

# Input Lokasi Proyek
read -p "lokasi folder public (contoh: /home/sukmaji/Sites/'proyek'/public): " PUBLIC_LOC

# Validasi folder public
if [ ! -d "$PUBLIC_LOC" ]; then
  echo "Error: Folder $PUBLIC_LOC tidak ditemukan!"
  exit
fi

# Ambil nama folder sebagai nama domain
PROJECT_DIR=$(dirname "$PUBLIC_LOC")
DOMAIN=$(basename "$PROJECT_DIR").test
USER_NAME="sukmaji" # ganti dengan User pada sistem anda


echo "------------------------------------------"
echo "Mengonfigurasi: $DOMAIN"
echo "Lokasi Proyek: $PROJECT_DIR"
echo "------------------------------------------"

# 1. Buat Sertifikat dengan mkcert
SSL_DIR="/etc/nginx/ssl"
mkdir -p $SSL_DIR
cd $SSL_DIR
mkcert "$DOMAIN"

# 2. Buat File Konfigurasi Nginx
CONF_FILE="/etc/nginx/sites-available/$DOMAIN"
PHP_V=$(php -r 'echo PHP_MAJOR_VERSION.".".PHP_MINOR_VERSION;')

cat > $CONF_FILE <<EOF
server {
    listen 80;
    server_name $DOMAIN;
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl;
    server_name $DOMAIN;
    root $PUBLIC_LOC;

    ssl_certificate $SSL_DIR/$DOMAIN.pem;
    ssl_certificate_key $SSL_DIR/$DOMAIN-key.pem;

    index index.php;
    charset utf-8;

    location / {
        try_files \$uri \$uri/ /index.php?\$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php$PHP_V-fpm.sock;
        fastcgi_param SCRIPT_FILENAME \$realpath_root\$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
EOF

# 3. Handle Permissions
echo "Mengatur permissions untuk Laravel..."

# Pastikan folder penting ada
mkdir -p "$PROJECT_DIR/storage" "$PROJECT_DIR/bootstrap/cache"

# Atur kepemilikan: Anda sebagai owner, www-data sebagai group
chown -R $USER_NAME:www-data "$PROJECT_DIR"

# Atur izin khusus untuk folder yang butuh akses tulis
chmod -R 775 "$PROJECT_DIR/storage"
chmod -R 775 "$PROJECT_DIR/bootstrap/cache"

# Pastikan file log atau file baru di masa depan tetap bisa ditulis (sticky bit)
find "$PROJECT_DIR/storage" -type d -exec chmod g+s {} +
find "$PROJECT_DIR/bootstrap/cache" -type d -exec chmod g+s {} +

# 4. Aktifkan Konfigurasi (Symlink)
ln -sf "$CONF_FILE" /etc/nginx/sites-enabled/

# 5. Tambahkan ke /etc/hosts jika belum ada
if ! grep -q "$DOMAIN" /etc/hosts; then
  echo "127.0.0.1 $DOMAIN" >> /etc/hosts
fi

# 6. Cek Nginx dan Restart
nginx -t && systemctl restart nginx

echo "------------------------------------------"
echo "BERHASIL! Situs Anda siap di: https://$DOMAIN"
echo "Izin folder storage & cache telah diperbaiki."
echo "------------------------------------------"

# Selesai
```

Jalankan perintah berikut untuk memberikan izin eksekusi pada script:

```bashbash
sudo chmod +x /usr/local/bin/auto-nginx-laravel
```

Sekarang Anda dapat menjalankan script ini kapan saja dengan perintah:

```bash
sudo auto-nginx-laravel
```

Script ini akan:

![Gambar SS Percobaan](/images/blog/auto-nginx-ssl-laravel.png)

1. Meminta lokasi folder `public` dari proyek Laravel Anda.
2. Membuat sertifikat SSL lokal untuk domain `.test` menggunakan `mkcert`.
3. Membuat konfigurasi Nginx untuk proyek Laravel Anda.
4. Mengatur izin folder `storage` dan `bootstrap/cache` agar Laravel dapat menulis ke dalamnya.
5. Menambahkan entri ke `/etc/hosts` untuk domain `.test`.
6. Menguji konfigurasi Nginx dan me-restart layanan Nginx.
