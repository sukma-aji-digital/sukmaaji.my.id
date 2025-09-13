/** @type {import('next').NextConfig} */
const nextConfig = {
    // Remove static export settings for VPS deployment
    // output: 'export',        // Commented out for VPS deployment
    // trailingSlash: true,     // Commented out for VPS deployment
    // skipTrailingSlashRedirect: true,  // Commented out for VPS deployment
    // distDir: 'out',          // Commented out for VPS deployment

    // VPS-optimized settings
    output: 'standalone',        // For Docker deployment
    poweredByHeader: false,
    compress: true,

    images: {
        // For VPS deployment, we can use optimized images
        // unoptimized: true    // Commented out for VPS deployment
        formats: ['image/webp', 'image/avif'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },

    // Security headers
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin'
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()'
                    }
                ]
            }
        ]
    }
}

module.exports = nextConfig
