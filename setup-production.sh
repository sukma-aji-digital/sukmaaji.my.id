#!/bin/bash

# Production Environment Setup Script
# Jalankan script ini saat deploy production

echo "🚀 Setting up production environment..."

# Copy environment variables for production
if [ -f .env.production ]; then
    echo "✅ Using .env.production configuration"
    cp .env.production .env.local
else
    echo "❌ .env.production not found!"
    exit 1
fi

# Show current configuration (without secrets)
echo "📋 Current configuration:"
echo "NEXTAUTH_URL: $(grep NEXTAUTH_URL .env.local | cut -d'=' -f2)"
echo "NEXT_PUBLIC_SITE_URL: $(grep NEXT_PUBLIC_SITE_URL .env.local | cut -d'=' -f2)"
echo "NODE_ENV: $(grep NODE_ENV .env.local | cut -d'=' -f2)"

echo "✅ Production environment setup complete!"
echo ""
echo "🔧 Next steps for Google OAuth:"
echo "1. Go to Google Cloud Console: https://console.cloud.google.com/"
echo "2. Navigate to APIs & Services > Credentials"
echo "3. Find your OAuth 2.0 Client ID: 522607925729-bg5k2rjhcltunaq5lthmihn6n633mq6q.apps.googleusercontent.com"
echo "4. Add these Authorized redirect URIs:"
echo "   - https://sukmaaji.my.id/api/auth/callback/google"
echo "   - http://localhost:3000/api/auth/callback/google (for development)"
echo "5. Add these Authorized JavaScript origins:"
echo "   - https://sukmaaji.my.id"
echo "   - http://localhost:3000 (for development)"
echo ""
echo "📱 Don't forget to update your deployment platform environment variables:"
echo "- Vercel: https://vercel.com/dashboard > Project > Settings > Environment Variables"
echo "- Netlify: https://app.netlify.com > Site > Environment variables"
echo "- Railway: https://railway.app > Project > Variables"