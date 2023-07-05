import { createStitches } from '@stitches/react';

export const { styled, globalCss, keyframes, getCssText, theme } =
  createStitches({
    theme: {
      colors: {
        bluePix: '#1a3a68',
        footer: '#00B4AC',
        inputFocusColor: '#19f',
        colorLlight: '#adf',
        white: '#ffffff',
        black: '#000000',
        fontPrimaryDefault: '#7a7a7a',
        gray900: '#33303e',
        gray800: '#4e4b59',
        gray700: '#5f5c6b',
        gray600: '#7a7786',
        gray500: '#8c8a97',
        gray400: '#acabb7',
        gray300: '#ccc',
        gray200: '#eee',
      },
    },
    media: {
      xxs: '(max-width: 360px)',
      xs: '(max-width: 414px)',
      sm: '(max-width: 640px)',
      md: '(max-width: 768px)',
      tmd: '(max-width: 828px)',
      mmd: '(max-width: 960px)',
      lg: '(max-width: 1024px)',
      xl: '(max-width: 1280px)',
      xxl: '(min-width: 1536px)',
    },
  });
