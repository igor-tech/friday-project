import React from 'react'

import { Box, LinearProgress } from '@mui/material'

export const AppStatusLoader = () => {
  return (
    <Box sx={{ width: '100%', position: 'absolute' }}>
      <LinearProgress />
    </Box>
  )
}
