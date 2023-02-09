import React from 'react'

import { Avatar, Box, Icon, Link, Toolbar, Typography } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'

import { GeneralButton, PATH, useAppSelector } from '../../common'
import {
  linkContentSx,
  linkSx,
} from '../../features/Auth/RecoveryPasswordForms/RecoveryPasswordForms.styled'
import { logOutAccountTC } from '../../features/Profile/profile-slice'
import editIcon from '../../img/Edit.png'
import incubatorIcon from '../../img/It-incubator.png'

import { appBarSx, appSx, iconItSx } from './appBar.styled'

export const AppBar = () => {
  const user = useAppSelector(state => state.profile.user)
  const isLoggedIn = useAppSelector(state => state.app.isLoggedIn)
  const statusLoad = useAppSelector(state => state.app.status)
  const navigate = useNavigate()

  const logInHandler = () => {
    navigate(PATH.LOGIN)
  }

  const avatarUser =
    user.avatar != null
      ? user.avatar
      : 'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg'

  return (
    <div>
      <Toolbar color="inherit" sx={appBarSx}>
        <Box sx={appSx}>
          <Icon sx={iconItSx}>
            <img src={incubatorIcon} />
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
              name={'Sign In'}
              type={'submit'}
              variant={'contained'}
              onClick={logInHandler}
              disabled={statusLoad === 'loading'}
            />
          )}
        </Box>
      </Toolbar>
    </div>
  )
}
