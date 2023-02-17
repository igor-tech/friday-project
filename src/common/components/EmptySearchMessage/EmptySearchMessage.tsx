import React from 'react'

import { Box, Typography } from '@mui/material'

import { containerEmptySearchPacksSx, emptyPackNameSx } from './searchPackNameParam.muiSx'

export const EmptySearchMessage: React.FC<{ searchParam: string }> = ({ searchParam }) => {
  return (
    <Box sx={containerEmptySearchPacksSx}>
      <Typography sx={emptyPackNameSx}>
        Nothing was found with the given values {searchParam || ''} <br />
        Change settings
      </Typography>
    </Box>
  )
}
