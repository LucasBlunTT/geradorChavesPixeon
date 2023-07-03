import { styled } from '../../styles';
import { Container } from '../../styles/global';

export const SectioHeroStyle = styled('section', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: '2rem',

  [`${Container}`]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',

    h1: {
      fontSize: '1.8rem',
      marginBottom: '2rem',
    },

    form: {
      width: '100%',
      maxWidth: '32rem',

      input: {
        '&:not(last-child)': {
          marginBottom: '0.4rem',
        },
      },

      button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },

      '.produtos': {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '3rem',

        select: {
          position: 'absolute',
          left: '-5.8rem',
          width: '100%',
          height: '3rem',
          maxWidth: '10.4rem',
        },

        ul: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          li: {
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 5s ease-in-out',

            '& :hover': {
              transform: 'translateY(-1rem)',
            },

            '&:not(:last-child)': {
              marginRight: '1rem',
            },

            img: {
              borderRadius: '0.5rem',
              width: '60px',
              height: '60px',
            },
          },
        },
      },

      button: {
        textAlign: 'center',
        width: '100%',
        padding: '1.2rem',
        alignItems: 'center',
        gap: '1rem',
        alignSelf: 'stretch',
        borderRadius: '4px',
        border: '1px solid $gray300',
        background: '$inputFocusColor',
        color: '$white',
        transition: '0.2s',
        cursor: 'pointer',
        marginTop: '1rem', // Adiciona um espaçamento entre o input e o botão
        transition: 'opacity 0.3s',

        '&:hover': {
          opacity: '0.8',
        },
      },
    },
  },
});
