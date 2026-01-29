---
title: "Ubuntu Web Dev Environment ala Laragon"
date: "2026-01-30"
excerpt: "Panduan lengkap setup environment web development di Ubuntu 24.04 dengan stack Apache, PHP, Redis, MariaDB, auto SSL, dan auto .test domain, serta script otomatisasi ala Laragon."
tags:
["Ubuntu", "Web Development", "Laragon", "Apache", "PHP", "MariaDB", "Redis", "SSL", "Linux", "DevOps"]
image: "/images/blog/sslaraku.png"
---

# Ubuntu Web Dev Environment (Laragon Style)

**OS:** Ubuntu 24.04 | **Stack:** Apache, PHP, Redis, MariaDB | **Feature:** Auto SSL, Auto .test Domain

---

## 1. Instalasi Core & Dependensi

Jalankan perintah ini satu kali saat pertama kali setup komputer.

```bash

# 1. Update & Add PHP Repository (PPA Ondrej)

sudo apt update && sudo apt upgrade -y
sudo add-apt-repository ppa:ondrej/php -y
sudo apt update

# 2. Install Apache, Redis, Git, Curl, Unzip

sudo apt install apache2 redis-server curl git unzip libnss3-tools -y

# 3. Install PHP Default (8.3 di Ubuntu 24) & PHP 8.4

sudo apt install php8.3 php8.3-cli php8.3-common php8.3-mysql php8.3-xml php8.3-curl php8.3-mbstring php8.3-zip php8.3-gd php8.3-intl php8.3-redis -y
sudo apt install php8.4 php8.4-cli php8.4-common php8.4-mysql php8.4-xml php8.4-curl php8.4-mbstring php8.4-zip php8.4-gd php8.4-intl php8.4-redis -y

# 4. Aktifkan Modul Apache Wajib

sudo a2enmod rewrite ssl headers
sudo systemctl restart apache2
```

---

## ## 2. Setup Auto Domain (.test)

Menggunakan Dnsmasq agar tidak perlu edit `/etc/hosts` manual.

```bash

# Matikan systemd-resolved (konflik port 53)

sudo systemctl disable --now systemd-resolved
sudo rm /etc/resolv.conf
echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf

# Install & Config Dnsmasq

sudo apt install dnsmasq -y
echo "address=/.test/127.0.0.1" | sudo tee /etc/dnsmasq.d/test-domain
```

## 3. Setup SSL Trusted (Mkcert)

Membuat browser (Chrome/Firefox) percaya pada sertifikat lokal.

```b. Setup SSL Trusted (Mkcert)

Membuat browser (Chrome/Firefox) percaya pada sertifikat lokal.
Bash

# Download Mkcert

curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64"
chmod +x mkcert-v*-linux-amd64
sudo mv mkcert-v*-linux-amd64 /usr/local/bin/mkcert

# Install CA Root (Lakukan Sekali Seumur Hidup)

```

---

## 4. Setup Folder Kerja

```bash
mkdir -p ~/Sites
```

---

## 5. Script Otomatisasi (Tools)

### A. Script laraku (Create/Link Project)

**Fungsi:** Membuat VHost Apache, SSL otomatis, dan mendeteksi folder public (Laravel).

1. Buat file: `sudo nano /usr/local/bin/laraku`
2. Paste kode ini:

```b
Bash

#!/bin/bash
BASE_DIR="/home/$USER/Sites"
DOMAIN_EXT="test"
CERT_DIR="/etc/ssl/localcerts"

if [ -z "$1" ]; then
echo "❌ Usage: laraku <project_name>"
exit 1
fi

PROJECT_NAME=$1
PROJECT_DIR="$BASE_DIR/$PROJECT_NAME"
DOMAIN="$PROJECT_NAME.$DOMAIN_EXT"

# Smart Detect Document Root

if [ -d "$PROJECT_DIR/public" ]; then
DOC_ROOT="$PROJECT_DIR/public"
    echo "✅ Laravel/Framework detected (using /public)"
else
    DOC_ROOT="$PROJECT_DIR"
echo "✅ Native PHP detected (using root folder)"
fi

# Create Folder if not exists

if [ ! -d "$PROJECT_DIR" ]; then
echo "📂 Creating new project..."
mkdir -p "$PROJECT_DIR"
    echo "<?php phpinfo(); ?>" > "$PROJECT_DIR/index.php"
chown -R $USER:$USER "$PROJECT_DIR"
else
echo "🔗 Linking existing folder..."
fi

# Fix Permissions (User & Apache)

sudo chown -R $USER:www-data "$PROJECT_DIR"
sudo chmod -R 775 "$PROJECT_DIR"

# Generate SSL

if [ ! -d "$CERT_DIR" ]; then sudo mkdir -p "$CERT_DIR"; fi
if [ ! -f "$CERT_DIR/$DOMAIN.pem" ]; then
    mkcert -cert-file "$CERT_DIR/$DOMAIN.pem" -key-file "$CERT_DIR/$DOMAIN-key.pem" "$DOMAIN"
fi

# Apache Config

VHOST_CONFIG="/etc/apache2/sites-available/$DOMAIN.conf"
sudo bash -c "cat > $VHOST_CONFIG" <<EOF
<VirtualHost *:80>
    ServerName $DOMAIN
    DocumentRoot $DOC_ROOT
    Redirect permanent / https://$DOMAIN/
</VirtualHost>
<VirtualHost \*:443>
ServerName $DOMAIN
    DocumentRoot $DOC_ROOT
    SSLEngine on
    SSLCertificateFile $CERT_DIR/$DOMAIN.pem
SSLCertificateKeyFile $CERT_DIR/$DOMAIN-key.pem
<Directory $PROJECT_DIR>
        Options Indexes FollowSymLinks MultiViews
        AllowOverride All
        Require all granted
    </Directory>
    ErrorLog \${APACHE_LOG_DIR}/$DOMAIN-error.log
```

### B. Script ganti-php (PHP Switcher)

**Fungsi:** Berpindah versi PHP dengan satu perintah.

1. Buat file: `sudo nano /usr/local/bin/ganti-php`
2. Paste kode ini:

```b
Fungsi: Berpindah versi PHP dengan satu perintah.

    Buat file: sudo nano /usr/local/bin/ganti-php

    Paste kode ini:

Bash

#!/bin/bash
if [ -z "$1" ]; then echo "❌ Usage: ganti-php <version> (e.g., 8.4)"; exit 1; fi
NEW_VERSION=$1

# Disable Current PHP Module

CURRENT_PHP=$(ls /etc/apache2/mods-enabled/php*.load 2>/dev/null | xargs -n 1 basename | sed 's/.load//')
if [ ! -z "$CURRENT_PHP" ]; then
for ver in $CURRENT_PHP; do sudo a2dismod "$ver" > /dev/null; done
fi

# Enable New & Restart
```

**PENTING:** Jangan lupa chmod kedua file tersebut:

```budo update-alternatives --set php "/usr/bin/php$NEW_VERSION"
sudo systemctl restart apache2
echo "✅ Switched to PHP $NEW_VERSION"
php -v | head -n 1

PENTING: Jangan lupa chmod kedua file tersebut:
Bash

```

---

## 6. Cara Penggunaan (Workflow)

# Hasil: https://nama_projek_baru.test

````

### Clone dari GitHub (Laravel/Lainnya)

1. Masuk ke folder Sites:
```bash
cd ~/Sites
````

2. Clone repo:

```bash
git clone https://github.com/user/repo-laravel.git
```

3. Jalankan tools (gunakan nama folder hasil clone):

```bash
laraku repo-laravel
```

4. Setup Laravel (Manual):

```bash
cd repo-laravel
cp .env.example .env && composer install && php artisan key:generate
```

### Mengganti Versi PHP

```bash
ganti-php 8.4 # Pindah ke 8.4
ganti-php 8.3 # Pindah ke 8.3
```

### Menghapus Proyek (Manual)

Jika ingin bersih-bersih:

```b
ganti-php 8.4 # Pindah ke 8.4
ganti-php 8.3 # Pindah ke 8.3

Menghapus Proyek (Manual)

Jika ingin bersih-bersih:
rm -rf ~/Sites/namaprojek
```

sudo a2dissite namaprojek.test.conf
sudo rm /etc/apache2/sites-available/namaprojek.test.conf
sudo systemctl reload apache2

# Hapus foldernya jika perlu

rm -rf ~/Sites/namaprojek
