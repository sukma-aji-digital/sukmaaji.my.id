module.exports = {
    apps: [
        {
            name: 'sukmaaji-digital-website',
            script: 'server.js',
            cwd: './.next/standalone',
            instances: 'max',
            exec_mode: 'cluster',
            env: {
                NODE_ENV: 'production',
                PORT: 3000,
                NEXT_PUBLIC_SITE_URL: 'https://sukmaaji.my.id'
            },
            env_production: {
                NODE_ENV: 'production',
                PORT: 3000,
                NEXT_PUBLIC_SITE_URL: 'https://sukmaaji.my.id'
            },
            log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
            error_file: './logs/err.log',
            out_file: './logs/out.log',
            log_file: './logs/combined.log',
            time: true,
            max_memory_restart: '1G',
            node_args: '--max-old-space-size=1024'
        }
    ]
}
