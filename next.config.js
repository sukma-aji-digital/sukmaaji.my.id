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

    // Disable caching for always fresh content
    experimental: {
        staleTimes: {
            dynamic: 0,  // Disable dynamic page cache
            static: 0,   // Disable static page cache
        },
    },

    images: {
        // For VPS deployment, we can use optimized images
        // unoptimized: true    // Commented out for VPS deployment
        formats: ['image/webp', 'image/avif'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },

    // Security headers and cache control
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
                    },
                    // Disable caching for all pages
                    {
                        key: 'Cache-Control',
                        value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
                    },
                    {
                        key: 'Pragma',
                        value: 'no-cache'
                    },
                    {
                        key: 'Expires',
                        value: '0'
                    }
                ]
            },
            {
                source: '/api/(.*)',
                headers: [
                    // Extra strong no-cache headers for API routes
                    {
                        key: 'Cache-Control',
                        value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0'
                    },
                    {
                        key: 'Pragma',
                        value: 'no-cache'
                    },
                    {
                        key: 'Expires',
                        value: '0'
                    }
                ]
            }
        ]
    }
}

module.exports = nextConfig
