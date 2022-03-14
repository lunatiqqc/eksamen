const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./src/**/*.{html,js,tsx}"],
    theme: {
        screens: {
            xs: "475px",
            ...defaultTheme.screens,
        },
        extend: {
            keyframes: {
                fadein: {
                    "0%": { opacity: 0 },
                    "100%": { opacity: 1 },
                },
                showfromtop: {
                    "0%": { height: "0px" },
                    "100%": { height: "400px" },
                },
                pingright: {
                    "0%": {
                        transform: "translateX(0px)",
                        opacity: 0,
                    },

                    "50%": {
                        transform: "translate(0)",
                        opacity: 1,
                    },
                    "100%": {
                        transform: "translateX(20px)",
                        opacity: 0,
                    },
                },
            },

            animation: {
                fadein: "fadein 200ms ease forwards",
                fadeinslow: "fadein 1000ms ease forwards",
                showfromtop: "showfromtop 300ms ease forwards",
                pingright:
                    "pingright 2000ms cubic-bezier(0, 0, 0.2, 1) infinite",
            },
        },
    },
    plugins: [
        require("@tailwindcss/line-clamp"),
        // ...
    ],
};
