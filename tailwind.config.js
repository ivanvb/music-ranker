module.exports = {
    purge: [],
    theme: {
        extend: {
            colors: {
                'base-bg': '#121212',
                'base-fg': '#1E1E1E',
                primary: '#651FFF',
                'primary-dark': '#262035',
            },
            spacing: {
                22: '5.5rem',
                144: '36rem',
                200: '50rem',
                250: '62.5rem',
            },
            screens: {
                '2xl': '1536px',
                '3xl': '1600px',
            },
            zIndex: {
                '-10': '-10',
                '-20': '-20',
            },
        },
        container: {
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                lg: '4rem',
                xl: '5rem',
                '2xl': '6rem',
            },
            center: true,
        },
    },
    variants: {
        scrollbar: ['rounded'],
    },
    plugins: [require('tailwind-scrollbar')],
};
