import React, { useState } from 'react'

import { Box, Typography } from '@mui/material'

import defaultCover from '../../assets/img/defaultCover.jpg'

import { fontWeight, questionSx } from './Learn.muiSx'

type Props = {
  name: string
  cardId: string
  cardGist: string
  img: string
}
export const CustomQuestion = ({ img, name, cardId, cardGist }: Props) => {
  const [isCoverBroken, setIsCoverBroken] = useState(false)
  const errorHandler = () => {
    setIsCoverBroken(true)
  }
  const deckCover = img ? img : defaultCover

  return (
    <Box sx={questionSx}>
      <Typography sx={fontWeight}>{name}</Typography>
      {img ? (
        <img
          src={isCoverBroken ? defaultCover : deckCover}
          alt={'no img'}
          style={{ width: '100%' }}
          onError={errorHandler}
        />
      ) : (
        <Typography key={cardId}>{cardGist}</Typography>
      )}
    </Box>
  )
}
