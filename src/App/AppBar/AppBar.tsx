import React from 'react'

import { Avatar, Box, Icon, Toolbar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import incubatorIcon from '../../assets/img/It-incubator.png'
import { GeneralButton, PATH, useAppSelector } from '../../common'

import { appBarSx, appSx, iconItSx } from './appBar.styled'

export const AppBar = () => {
  const user = useAppSelector(state => state.profile.user)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const statusLoad = useAppSelector(state => state.app.status)
  const navigate = useNavigate()

  const avatarUser =
    user.avatar != null
      ? user.avatar
      : 'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg'

  return (
    <div>
      <Toolbar color="inherit" sx={appBarSx}>
        <Box sx={appSx}>
          <Icon sx={iconItSx}>
            <Typography component="img" src={incubatorIcon} alt="IT INCUBATOR" />
          </Icon>
        </Box>

        <Box sx={appSx}>
          <Typography variant="h6" component="div" sx={{ lineHeight: ' 40px' }}>
            {user.name}
          </Typography>
          {isLoggedIn ? (
            <Avatar alt="Remy Sharp" src={avatarUser} />
          ) : (
            <GeneralButton
              name="Sign In"
              sx={{ width: '133px' }}
              onClick={() => navigate(PATH.LOGIN)}
              disabled={statusLoad === 'loading'}
            />
          )}
        </Box>
      </Toolbar>
    </div>
  )
}
