import React from 'react'

import { Box, Typography } from '@mui/material'

import { rateYouSelfSx } from './Learn.muiSx'

import { SuperRadio } from 'common'

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
