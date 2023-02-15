import React from 'react'

import { Box, Typography } from '@mui/material'

import { useAppSelector } from '../../../../common'

import { containerEmptySearchPacksSx, emptyPackNameSx } from './searchPackNameParam.muiSx'

export const EmptySearchMessage = () => {
  const searchPackNameParam = useAppSelector(state => state.packs.packsQueryParams.packName)

  return (
    <Box sx={containerEmptySearchPacksSx}>
      <Typography sx={emptyPackNameSx}>
        Decks with the entered name: {searchPackNameParam} not found <br />
        Please re-enter your search details
      </Typography>
    </Box>
  )
}
