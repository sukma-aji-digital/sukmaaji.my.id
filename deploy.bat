@echo off
REM Deploy Sukmaaji Digital Website to VPS (Windows)
REM Usage: deploy.bat

echo 🚀 Starting deployment of Sukmaaji Digital Website...

REM Check if docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed. Please install Docker first.
    exit /b 1
)

REM Check if docker-compose is installed
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose is not installed. Please install Docker Compose first.
    exit /b 1
)

REM Stop existing containers
echo 🛑 Stopping existing containers...
docker-compose -f docker-compose.simple.yml down

REM Remove old images (optional)
echo 🧹 Cleaning old images...
docker image prune -f

REM Build and start new containers
echo 🔨 Building and starting new containers...
docker-compose -f docker-compose.simple.yml up --build -d

REM Check if container is running
for /f %%i in ('docker ps -q -f name^=sukmaaji-digital-website') do set CONTAINER_ID=%%i
if defined CONTAINER_ID (
    echo ✅ Deployment successful! Website is running on port 80
    echo 🌐 Visit: http://your-server-ip or https://sukmaaji.my.id
    
    echo 📋 Container logs:
    docker logs sukmaaji-digital-website --tail 20
) else (
    echo ❌ Deployment failed! Container is not running.
    echo 📋 Check logs:
    docker logs sukmaaji-digital-website
    exit /b 1
)

echo 🎉 Deployment completed!
pause
