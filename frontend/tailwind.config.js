/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                vr: {
                    white: "#F8FCF1",
                },
            },
            fontFamily: {
                roboto: ["Roboto Slab", "sans-serif"],
                inter: ["Inter", "sans-serif"],
            },
            borderRadius: {
                card: "55px",
            },
        },
    },
};
