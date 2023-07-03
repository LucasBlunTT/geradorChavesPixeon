import { styled } from '../../styles';
import { Container } from '../../styles/global';

export const StyleSection404 = styled('div', {
  marginTop: 96,
  paddingTop: 95,
  paddingBottom: 150,

  [`${Container}`]: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },

  h1: {
    fontWeight: 600,
    fontSize: 49,
    lineHeight: '59px',
    marginBottom: 24,
  },

  p: {
    width: '100%',
    maxWidth: 641,
    margin: '0 auto',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '24px',
    color: '$gray400',
    textAlign: 'center',
    marginBottom: 40,
  },
  a: {
    display: 'inline-block',
    lineHeight: '54px',
    padding: '0 75px',
    backgroundColor: '$red800',
    borderRadius: 5,
    fontWeight: 400,
    fontSize: 16,
    color: '#fff',
    transition: 'all 0.3s ease-in-out',
    marginBottom: 72,

    '&:hover': {
      filter: 'brightness(0.8)',
    },
  },
});
