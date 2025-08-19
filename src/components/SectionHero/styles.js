import { styled } from '../../styles';
import { Container } from '../../styles/global';

export const SectioHeroStyle = styled('section', {
  width: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  [`${Container}`]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',

    h1: {
      fontSize: '1.8rem',
      marginBottom: '2rem',

      '@md': { fontSize: '1.7rem' },
      '@sm': { fontSize: '1.6rem' },
      '@xs': { fontSize: '1.5rem' },
    },

    form: {
      width: '100%',
      maxWidth: '32rem',

      '.file-label': {
        marginTop: '2rem',
        width: '100%',
        display: 'flex',
        padding: '1.2rem',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        alignSelf: 'stretch',
        borderRadius: '4px',
        border: '1px solid $gray300',
        background: '$gray200',
        transition: '0.2s',
        cursor: 'pointer',
        '&:hover': {
          background: '$gray300',
        },

        '@sm': {
          flexDirection: 'column',
          padding: '1rem',
          gap: '0.6rem',
        },
      },

      input: {
        '&:not(:last-child)': {
          marginBottom: '0.4rem',
        },
        '@sm': {
          fontSize: '1.4rem',
        },
      },

      button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
        marginTop: '1rem',
        transition: 'opacity 0.3s',

        '@md': { padding: '1rem' },
        '@sm': { padding: '0.9rem', fontSize: '1.4rem' },

        '&:hover': {
          opacity: '0.8',
        },
      },

      '.produtos': {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '3rem',

        '@sm': { marginTop: '2rem' },

        select: {
          position: 'absolute',
          left: '-5.8rem',
          width: '100%',
          height: '3rem',
          maxWidth: '10.4rem',

          '@sm': {
            position: 'static',
            maxWidth: '100%',
            height: '3.2rem',
            marginBottom: '1rem',
          },
        },

        ul: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '1rem',

          li: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            cursor: 'pointer',
            transition: 'transform 5s ease-in-out',
            opacity: '0.5',

            '& :hover': {
              transform: 'translateY(-1rem)',
            },

            '&:not(:last-child)': {
              marginRight: '1rem',
            },

            '@sm': {
              '&:not(:last-child)': {
                marginRight: 0,
              },
            },

            span: {
              fontSize: '1.3rem',
              '@sm': { fontSize: '1.2rem' },
            },

            img: {
              borderRadius: '0.5rem',
              width: '60px',
              height: '60px',

              '@md': {
                width: '52px',
                height: '52px',
              },
              '@sm': {
                width: '44px',
                height: '44px',
              },
            },
          },
        },
      },

      p: {
        textAlign: 'center',
        '@sm': { fontSize: '1.2rem' },
      },

      '@md': {
        maxWidth: '30rem',
      },
      '@sm': {
        maxWidth: '100%',
      },
    },
  },

  variants: {
    aplicacao: {
      Capta: {
        li: {
          '&:nth-child(1)': {
            opacity: '1 !important',
          },
        },
      },
      PixPrint: {
        li: {
          '&:nth-child(2)': {
            opacity: '1 !important',
          },
        },
      },
      Docscan: {
        li: {
          '&:nth-child(3)': {
            opacity: '1 !important',
          },
        },
      },
    },
  },
});
