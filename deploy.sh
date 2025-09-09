#!/bin/bash

# Deploy Sukmaaji Digital Website to VPS
# Usage: ./deploy.sh

echo "🚀 Starting deployment of Sukmaaji Digital Website..."

# Check if docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if docker-compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose -f docker-compose.simple.yml down

# Remove old images (optional)
echo "🧹 Cleaning old images..."
docker image prune -f

# Build and start new containers
echo "🔨 Building and starting new containers..."
docker-compose -f docker-compose.simple.yml up --build -d

# Check if container is running
if [ $(docker ps -q -f name=sukmaaji-digital-website) ]; then
    echo "✅ Deployment successful! Website is running on port 80"
    echo "🌐 Visit: http://your-server-ip or https://sukmaaji.my.id"
    
    # Show container logs
    echo "📋 Container logs:"
    docker logs sukmaaji-digital-website --tail 20
else
    echo "❌ Deployment failed! Container is not running."
    echo "📋 Check logs:"
    docker logs sukmaaji-digital-website
    exit 1
fi

echo "🎉 Deployment completed!"
