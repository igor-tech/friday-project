import React from 'react'

import { Avatar, Box, Toolbar, Typography } from '@mui/material'

export const AppBar = () => {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar color="inherit">
          <Typography variant="h6" component="div">
            IT-Incubator
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="h6" component="div">
            Name
          </Typography>
          <Avatar
            alt="Remy Sharp"
            src="https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg"
          />
        </Toolbar>
      </Box>
    </div>
  )
}
