/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Noto Sans TC", "sans-serif"],
			},
			screens: {
				xxs: "480px",
				xs: "560px",
				"3xl": "1600px",
			},
		},
	},
	plugins: [],
};
