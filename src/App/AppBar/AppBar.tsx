import React from 'react'

import { Avatar, Box, Icon, Toolbar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import incubatorIcon from '../../assets/img/It-incubator.png'
import {
  appStatusSelector,
  GeneralButton,
  isLoggedInSelector,
  PATH,
  useAppSelector,
  userAvatarSelector,
  userNameSelector,
} from '../../common'

import { appBarSx, appSx, iconItSx } from './appBar.muiSx'

export const AppBar = () => {
  const userName = useAppSelector(userNameSelector)
  const userAvatar = useAppSelector(userAvatarSelector)
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const statusLoad = useAppSelector(appStatusSelector)
  const navigate = useNavigate()

  const avatarUser =
    userAvatar !== null
      ? userAvatar
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
            {userName}
          </Typography>

          {isLoggedIn && <Avatar alt="Remy Sharp" src={avatarUser} />}

          {!isLoggedIn && (
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
