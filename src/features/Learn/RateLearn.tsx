import React from 'react'

import { Box, Typography } from '@mui/material'

import { SuperRadio } from '../../common'

import { rateYouSelfSx } from './Learn.muiSx'
type Props = {
  grades: Array<{ id: number; value: string }>
  onChangeRadio: (value: number) => void
  value: number
}

export const RateLearn = ({ grades, value, onChangeRadio }: Props) => {
  return (
    <Box>
      <Typography sx={rateYouSelfSx}>Rate yourself:</Typography>
      <SuperRadio options={grades} onChangeOption={onChangeRadio} value={value} />
    </Box>
  )
}
