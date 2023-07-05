import { styled } from '../../styles';

export const InputStyle = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',

  input: {
    width: '100%',
    display: 'flex',
    padding: '1.2rem',
    alignItems: 'center',
    gap: '1rem',
    alignSelf: 'stretch',
    borderRadius: '4px',
    border: '1px solid  $gray300',
    background: '$gray200',
    transition: ' 0.2s',
    '&:focus': {
      outline: 'none',
      borderColor: '$inputFocusColor',
      background: 'white',
      boxShadow: '0 0 0 3px $colorLlight)',
    },
    '&[type="file"]': {
      display: 'none',

      '&:hover': {
        background: '$gray300',
      },
    },
  },
});
