/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                dark: {
                    100: "#1E293B",
                    200: "#172033",
                    300: "#0F172A",
                    400: "#0A0F1C",
                },
                accent: {
                    DEFAULT: "#6366F1",
                    light: "#818CF8",
                    dark: "#4F46E5",
                },
                slate: {
                    light: "#F1F5F9",
                    dark: "#94A3B8",
                },
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },
            animation: {
                float: "float 6s ease-in-out infinite",
                'fade-in': 'fadeIn 1s ease-out forwards',
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                fadeIn: {
                    from: {
                        opacity: '0',
                        transform: 'translateY(20px)',
                    },
                    to: {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
            },
        },
    },
    plugins: [],
}
