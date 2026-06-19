import type { Config } from 'tailwindcss'

// Tailwind v4: primary configuration is in src/styles/globals.css via @theme {}
// This file is kept for content path configuration only.
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
}

export default config
