/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        colors: {
            primary: '#efcb68',
            secondary: '#160c28',
            gray: '#f4f3ee',
            'gray-dark': '#bcb8b1',
            black: '#000411',
        },
        fontFamily: {
            kodchasan: ['Kodchasan', 'sans-serif'],
            mallanna: ['Mallanna', 'serif'],
        },
        extend: {
            spacing: {
                content: 'max-content',
                q: '1px',
                h: '2px',
            },
            borderRadius: {
                '4xl': '2rem',
            },
        },
    },
    plugins: [],
};
