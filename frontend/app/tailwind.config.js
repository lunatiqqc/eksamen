const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./src/**/*.{html,js,tsx}"],
    theme: {
        screens: {
            "2xl": { max: "1535px" },
            // => @media (max-width: 1535px) { ... }

            xl: { max: "1279px" },
            // => @media (max-width: 1279px) { ... }

            lg: { max: "1023px" },
            // => @media (max-width: 1023px) { ... }

            md: { max: "767px" },
            // => @media (max-width: 767px) { ... }

            sm: { max: "639px" },
            // => @media (max-width: 639px) { ... }
            smmin: { min: "640px" },
            // => @media (max-width: 639px) { ... }
            xs: { max: "420px" },
            // => @media (max-width: 639px) { ... }
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
                fadetotop: {
                    "0%": { top: "0px", opacity: "1" },
                    "100%": {
                        top: "-100px",
                        opacity: "0",
                        pointerEvents: "none",
                    },
                },
                fadefromtop: {
                    "0%": { top: "-100px", opacity: "0" },
                    "100%": { top: "0px", opacity: "1" },
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
                fadetotop: "fadetotop 300ms ease forwards",
                fadefromtop: "fadefromtop 300ms ease forwards",
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
