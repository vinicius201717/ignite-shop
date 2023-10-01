import { styled } from '@stitches/react'

export const SidebarContainer = styled('aside', {
  width: '400px',
  height: '100%',
  background: '$gray800',
  position: 'absolute',
  padding: '3rem',
  right: 0,
  top: 0,
  zIndex: 100,
  overflow: 'hidden',
  transition: 'width 0.1s ease-in-out, opacity 0.1s ease-in-out',

  '&.closed': {
    width: '0',
    opacity: '0',
  },

  svg: {
    width: 25,
    height: 25,
    cursor: 'pointer',

    position: 'absolute',
    right: '20px',
    top: '20px',
  },

  h1: {
    color: '$gray100',
    marginBottom: '2rem',
  },
})

export const ProductsContainer = styled('div', {
  width: '100%',
  height: '100%',
  maxHeight: 'calc(100vh - 350px)',
  overflowY: 'auto',

  '&::-webkit-scrollbar': {
    width: 7,
  },
})

export const ProductShoppingContainer = styled('div', {
  width: '100%',
  height: 'auto',
  display: 'flex',
  marginBottom: 20,

  div: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '20px',
    h2: {
      fontSize: '$md',
      color: '$gray300',
      lineHeight: '160%',
    },

    span: {
      color: '$gray100',
      fontSize: '$md',
    },

    button: {
      marginTop: 'auto',
      background: 'transparent',
      border: 'none',
      textAlign: 'left',
      color: '$green300',
      cursor: 'pointer',

      '&:hover': {
        color: '$green500',
      },
    },
  },
})

export const ImageContainer = styled('div', {
  width: '5.81rem',
  height: '5.81rem',
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0!important',
})

export const FooterContainer = styled('footer', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  flex: 1,

  div: {
    display: 'flex',
    lineHeight: '260%',
    justifyContent: 'space-between',
  },

  button: {
    width: '100%',
    borderRadius: 8,
    background: '$green500',
    padding: '1.25rem 0 1.25rem 0',
    textAlign: 'center',
    marginTop: 57,
    cursor: 'pointer',
    color: '$white',

    '&:hover': {
      background: '$green300',
    },
  },
})
