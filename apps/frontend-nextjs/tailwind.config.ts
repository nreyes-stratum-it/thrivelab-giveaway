import type {Config} from "tailwindcss"
import {heroui} from "@heroui/react"

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                olive: {
                    50: '#f6f7f4',
                    100: '#e8ebe3',
                    200: '#d1d7c7',
                    300: '#b3bca3',
                    400: '#96a181',
                    500: '#7a8764',
                    600: '#5d6b4c',
                    700: '#48533b',
                    800: '#3a4330',
                    900: '#31382a',
                },
                background: {
                    light: '#fcfcfa',
                    DEFAULT: '#fcfcfa',
                },
            },
            fontFamily: {
                serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            backgroundColor: {
                'light-mode': '#fcfcfa',
            },
        },
    },
    darkMode: "class",
    plugins: [heroui()],
}

export default config