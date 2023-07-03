import { styled } from '../../styles';
import { Container } from '../../styles/global';

export const HeaderStyle = styled('header', {
  width: '100%',
  height: 96,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  [`${Container}`]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});
