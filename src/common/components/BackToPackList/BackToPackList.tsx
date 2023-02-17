import React from 'react'

import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import arrow from '../../../assets/img/arrow.png'

import { containerBackToPackListSx, titleBackPackListSx } from './backToPackList.muiSx'

import { PATH } from 'common/index'

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
