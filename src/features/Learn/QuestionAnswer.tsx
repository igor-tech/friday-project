import React from 'react'

import { Box, Typography } from '@mui/material'

import { fontWeight, questionSx } from './Learn.muiSx'

type Props = {
  name: string
  cardId: string
  cardGist: string
}
export const QuestionAnswer = ({ name, cardId, cardGist }: Props) => {
  return (
    <Box sx={questionSx}>
      <Typography sx={fontWeight}>{name}</Typography>
      <Typography key={cardId}>{cardGist}</Typography>
    </Box>
  )
}
