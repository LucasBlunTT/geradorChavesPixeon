import { styled } from '../../styles';
import { Container } from '../../styles/global';

export const HeaderStyle = styled('header', {
  width: '100%',
  height: 96,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '@md': { height: 84 },
  '@sm': { height: 72 },
  '@xs': { height: 64 },

  [`${Container}`]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingTop: 0,
    paddingBottom: 0,
  },
});
