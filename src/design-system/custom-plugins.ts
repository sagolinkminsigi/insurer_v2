import plugin from 'tailwindcss/plugin'

const typographyPlugin = plugin(({ addComponents }) => {
  addComponents({
    '.typo-h1m': {
      fontWeight: '500',
      fontSize: '36px',
      lineHeight: '1.6',
      letterSpacing: '-0.02em',
    },
    '.typo-h2b': {
      fontWeight: 'bold',
      fontSize: '32px',
      lineHeight: '1.6',
      letterSpacing: '-0.02em',
    },
    '.typo-h3sb': {
      fontWeight: '600',
      fontSize: '28px',
      lineHeight: '1.6',
      letterSpacing: '-0.02em',
    },
    '.typo-t1b': {
      fontWeight: 'bold',
      fontSize: '24px',
      lineHeight: '1.6',
      letterSpacing: '-0.02em',
    },
    '.typo-t1sb': {
      fontWeight: '600',
      fontSize: '24px',
      lineHeight: '1.6',
      letterSpacing: '-0.02em',
    },
    '.typo-t2b': {
      fontWeight: 'bold',
      fontSize: '20px',
      lineHeight: '1.6',
      letterSpacing: '-0.02em',
    },
    '.typo-st1sb': {
      fontWeight: '600',
      fontSize: '18px',
      lineHeight: '1.6',
      letterSpacing: '-0.02em',
    },
    '.typo-b1sb': {
      fontWeight: '600',
      fontSize: '16px',
      lineHeight: '1.6',
      letterSpacing: '-0.02em',
    },
    '.typo-b1m': {
      fontWeight: '500',
      fontSize: '16px',
      lineHeight: '1.6',
      letterSpacing: '-0.02em',
    },
    '.typo-b2sb': {
      fontWeight: '600',
      fontSize: '14px',
      lineHeight: '1.6',
      letterSpacing: '-0.02em',
    },
    '.typo-c1m': {
      fontWeight: '500',
      fontSize: '12px',
      lineHeight: '1.6',
      letterSpacing: '-0.02em',
    },
  })
})

export default [typographyPlugin]
