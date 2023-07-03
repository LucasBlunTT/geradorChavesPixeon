import { globalCss, styled } from './index';

export const globalStyles = globalCss({
  '*': {
    padding: 0,
    margin: 0,
    boxSizing: 'border-box',
    fontFamily: 'Poppins, sans-serif',
  },

  html: {
    fontSize: '62.5%',
  },

  body: {
    backgroundColor: '$white',
    color: '$fontPrimaryDefault',
    '-webkit-font-smoothing': 'antialiased',
    textRendering: 'optimizeLegibility',
    '-moz-osx-font-smoothing': 'grayscale',
    '-ms-text-size-adjust': '100%',
    '-webkit-text-size-adjust': '100%',
  },
  img: {
    maxWidth: '100%',
    display: 'block',
  },
  button: {
    cursor: 'pointer',
    border: 'none',
  },
  
  label: {
    marginBottom: '0.25rem',
  },

  a: {
    textDecoration: 'none',
  },
});

export const Container = styled('div', {
  width: '100%',
  maxWidth: 1248,
  margin: '0 auto',
  padding: '0 16px',
});
