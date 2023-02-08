// common styles
export const cardContainerSx = {
  display: 'flex',
  flexWrap: 'wrap',
  '& > :not(style)': {
    m: 1,
    width: 413,
    margin: '60px auto',
  },
}

export const contentContainerSx = {
  '&.MuiContainer-root': {
    paddingLeft: '33px',
    paddingRight: '33px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}

export const titleSx = {
  marginTop: '35px',
  fontWeight: '600',
  fontSize: '26px',
  lineHeight: '32px',
}

export const formSx = { paddingTop: '80px' }

// PasswordRecoveryFrom
export const BtnSubmitSx = {
  marginTop: '73px',
}
export const describeSx = {
  marginTop: '25px',
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: ' 24px',
  color: '#000000',
  opacity: '0.5',
}

export const rememberPassSx = {
  marginTop: '31px',
  marginBottom: '11px',
  fontWeight: '600',
  fontSize: '14px',
  lineHeight: '24px',
  textAlign: 'center',
  color: '#000000',
  opacity: '0.5',
}

export const linkContentSx = { marginBottom: '42px', textAlign: 'center' }
export const linkSx = {
  color: '#366EFF',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}

// CheckEmail

export const imgSx = {
  marginTop: '29px',
}
export const BtnSubmitEmailSx = {
  margin: '41px 0 48px ',
}
export const instructionSx = {
  textAlign: 'center',
  marginTop: '31px',
  fontWeight: '400',
  fontSize: '14px',
  color: '#000000',
  lineHeight: '24px',
  opacity: '0.5',
}

// NewPassword
export const BtnSubmitNpSx = {
  margin: '41px 0 48px ',
}

export const newPassDescribeSx = {
  marginTop: '18px',
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: ' 24px',
  color: '#000000',
  opacity: '0.5',
}
