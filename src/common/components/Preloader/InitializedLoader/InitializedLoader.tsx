import React from 'react'

import { Box, CircularProgress } from '@mui/material'

export const InitializedLoader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        background: '#eeeeee',
      }}
    >
      <CircularProgress />
    </Box>
  )
}
