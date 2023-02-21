export const paperLearnSx = {
  display: 'flex',
  flexWrap: 'wrap',
  '& > :not(style)': {
    m: 1,
    width: 440,
    margin: '18px auto',
  },
}

export const centerTextSx = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}
export const questionSx = {
  display: 'flex',
  gap: '15px',
}
export const answerSx = {
  display: 'flex',
  gap: '15px',
  marginTop: '35px',
}

export const learnContainerSx = {
  '&.MuiContainer-root': {
    paddingLeft: '33px',
    paddingRight: '33px',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '30px',
  },
}
export const countAttemptSx = {
  paddingTop: '15px',
  opacity: '0.5',
  fontSize: '14px',
}

export const rateYouSelfSx = {
  fontSize: '16px',
  lineHeight: '24px',
  marginTop: '24px',
  marginBottom: '12px',
}
