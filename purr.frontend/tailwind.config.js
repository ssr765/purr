/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                accent: '#aa76de'
            }
        },
        fontFamily: {
            raleway: ['Raleway'],
            jost: ['Jost'],
            sans: ['Poppins']
        }
    },
    plugins: [
        require('tailwindcss-animated'),
        require('@headlessui/tailwindcss')
    ]
}
