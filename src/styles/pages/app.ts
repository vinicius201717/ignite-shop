import { styled } from '..'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',
})

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  justifyContent: 'space-between',

  svg: {
    width: 35,
    height: 35,
    padding: '0.25rem',
    backgroundColor: '$gray800',
    borderRadius: 4,
    color: '$gray100',
  },
})
