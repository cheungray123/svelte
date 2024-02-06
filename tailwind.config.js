/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte}'],
    theme: {
        extend: {
            animation: {
                fade: 'fade 0.3s ease-in-out'
            },
            keyframes: {
                fade: {
                    from: { opacity: 0 },
                    to: { opacity: 1 }
                }
            }
        }
    },
    plugins: []
}