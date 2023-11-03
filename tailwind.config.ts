import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        myTheme: {
          "primary": "#8B5FBF",
          "secondary": "#ebf1ff",
          "accent": "#D6C6E1",
          "neutral": "#261f2e",
          "base-100": "#F5F3F7",
        },
      },
    ],
  },

}


export default config
