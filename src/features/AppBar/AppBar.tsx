import React from 'react'

import { Avatar, Box, Toolbar, Typography } from '@mui/material'

import { useAppSelector } from '../../common'

import { appBarSx, appSx } from './appBar.styled'

export const AppBar = () => {
  const user = useAppSelector(state => state.profile.user)

  const avatarUser =
    user.avatar != null
      ? user.avatar
      : 'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg'

  return (
    <div>
      <Toolbar color="inherit" sx={appBarSx}>
        <Box>
          <Typography variant="h6" component="div">
            IT-Incubator
          </Typography>
        </Box>

        <Box sx={appSx}>
          <Typography variant="h6" component="div">
            {user.name}
          </Typography>
          <Avatar alt="Remy Sharp" src={avatarUser} />
        </Box>
      </Toolbar>
    </div>
  )
}
