import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "theme": "radial-gradient(52.21% 50.73% at 50.73% 44.43%, #4B449F 0%, #191825 100%)"
      },
      colors: {
        "p-color": "#191825",
        "s-color": "#F3ECFF",
        "t-color": "#00E5AF"
      },
      width: {
        '1vw': '1vw',
        '2vw': '2vw',
        '3vw': '3vw',
        '5vw': '5vw',
        '7vw': '7vw',
        '9vw': '9vw',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
export default config;
