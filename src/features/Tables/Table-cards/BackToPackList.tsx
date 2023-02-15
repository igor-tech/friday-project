import React from 'react'

import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import arrow from '../../../assets/img/arrow.png'
import { PATH } from '../../../common'

const containerBackToPackListSx = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '12px',
  cursor: 'pointer',
}
const titleBackPackListSx = {
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '24px',
  color: '#000000',
}

export const BackToPackList = () => {
  const navigate = useNavigate()

  return (
    <Box sx={containerBackToPackListSx} onClick={() => navigate(PATH.PACKS)}>
      <Typography component="img" src={arrow} alt="arrow back" />
      <Typography component="h1" variant="h5" sx={titleBackPackListSx}>
        Back to Packs List
      </Typography>
    </Box>
  )
}
