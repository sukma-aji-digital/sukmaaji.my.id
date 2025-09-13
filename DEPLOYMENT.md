# Sukmaaji Digital Website - VPS Deployment Guide

## Prerequisites

1. **VPS dengan Docker & Docker Compose**

   ```bash
   # Install Docker
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh

   # Install Docker Compose
   sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

2. **Domain & DNS**
   - Domain: sukmaaji.my.id
   - DNS A Record pointing to VPS IP
   - SSL Certificate (optional, recommended)

## Deployment Options

### Option 1: Simple Docker Compose (Recommended)

1. **Upload files ke VPS**

   ```bash
   # Clone repository atau upload files
   git clone https://github.com/sukma-aji-digital/sukmaaji.my.id.git
   cd sukmaaji.my.id
   ```

2. **Deploy dengan script**

   ```bash
   # Linux/Mac
   chmod +x deploy.sh
   ./deploy.sh

   # Windows (di VPS Linux)
   bash deploy.sh
   ```

3. **Manual deployment**

   ```bash
   # Build dan jalankan
   docker-compose -f docker-compose.simple.yml up --build -d

   # Check status
   docker ps
   docker logs sukmaaji-digital-website
   ```

### Option 2: Docker Manual

```bash
# Build image
docker build -t sukmaaji-digital-website .

# Run container
docker run -d \
  --name sukmaaji-digital-website \
  -p 80:3000 \
  -e NODE_ENV=production \
  -e NEXT_PUBLIC_SITE_URL=https://sukmaaji.my.id \
  --restart unless-stopped \
  sukmaaji-digital-website
```

### Option 3: PM2 (Traditional Node.js)

```bash
# Install PM2
npm install -g pm2

# Build application
npm run build

# Start dengan PM2
pm2 start npm --name "sukmaaji-website" -- start
pm2 startup
pm2 save
```

## SSL/HTTPS Setup

### Option A: Nginx + Let's Encrypt

1. **Install Nginx**

   ```bash
   sudo apt install nginx certbot python3-certbot-nginx
   ```

2. **Configure Nginx** (`/etc/nginx/sites-available/sukmaaji.my.id`)

   ```nginx
   server {
       server_name sukmaaji.my.id www.sukmaaji.my.id;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

3. **Enable dan SSL**
   ```bash
   sudo ln -s /etc/nginx/sites-available/sukmaaji.my.id /etc/nginx/sites-enabled/
   sudo certbot --nginx -d sukmaaji.my.id -d www.sukmaaji.my.id
   ```

### Option B: Traefik (Recommended for multiple apps)

1. **Use docker-compose.yml** (sudah include Traefik labels)
2. **Setup Traefik** sebagai reverse proxy dengan auto SSL

## Monitoring

### Check Status

```bash
# Docker containers
docker ps
docker logs sukmaaji-digital-website

# System resources
htop
df -h
free -m
```

### Logs

```bash
# Application logs
docker logs -f sukmaaji-digital-website

# Nginx logs (if using)
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

## Updating

```bash
# Pull latest code
git pull origin main

# Rebuild and restart
./deploy.sh

# Or manual
docker-compose -f docker-compose.simple.yml down
docker-compose -f docker-compose.simple.yml up --build -d
```

## Backup

```bash
# Backup files
tar -czf sukmaaji-backup-$(date +%Y%m%d).tar.gz /path/to/project

# Backup Docker images
docker save sukmaaji-digital-website > sukmaaji-image-backup.tar
```

## Troubleshooting

### Port sudah digunakan

```bash
sudo lsof -i :80
sudo kill -9 <PID>
```

### Container tidak bisa start

```bash
docker logs sukmaaji-digital-website
docker exec -it sukmaaji-digital-website sh
```

### DNS tidak resolve

- Check DNS propagation: https://dnschecker.org/
- Check A Record: `nslookup sukmaaji.my.id`

## Performance Optimization

1. **Enable Gzip** (sudah diaktifkan di next.config.js)
2. **Use CDN** untuk static assets
3. **Enable caching** di Nginx/Traefik
4. **Monitor resources** dengan htop, docker stats

## Security

1. **Firewall**

   ```bash
   sudo ufw enable
   sudo ufw allow 22
   sudo ufw allow 80
   sudo ufw allow 443
   ```

2. **Regular updates**

   ```bash
   sudo apt update && sudo apt upgrade
   docker system prune
   ```

3. **Fail2ban** untuk SSH protection
   ```bash
   sudo apt install fail2ban
   ```
