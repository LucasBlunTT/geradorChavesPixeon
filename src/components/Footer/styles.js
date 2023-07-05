import { styled } from '../../styles';
import { Container } from '../../styles/global';

export const FooterStyle = styled('footer', {
  padding: '2rem',
  backgroundColor: '$footer',
  height: '8rem',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: '2rem',

  [`${Container}`]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '.copyright': {
      display: 'flex',
      alignItems: 'flex-start',
      flexDirection: 'column',

      p:{
        color: 'white',
        fontSize: '1rem',     
      }
    },
  },
});
