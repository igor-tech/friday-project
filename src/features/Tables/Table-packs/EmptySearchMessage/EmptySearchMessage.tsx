import React from 'react'

import { Box, Typography } from '@mui/material'

import { useAppSelector } from '../../../../common'

import { containerEmptySearchPacksSx, emptyPackNameSx } from './searchPackNameParam.muiSx'

export const EmptySearchMessage = () => {
  const searchPackNameParam = useAppSelector(state => state.packs.packsQueryParams.packName)

  return (
    <Box sx={containerEmptySearchPacksSx}>
      <Typography sx={emptyPackNameSx}>
        Nothing was found with the given values {searchPackNameParam || ''} <br />
        Change settings
      </Typography>
    </Box>
  )
}
