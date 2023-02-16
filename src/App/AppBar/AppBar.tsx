import React from 'react'

import { Box, Icon, Toolbar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import incubatorIcon from '../../assets/img/It-incubator.png'
import {
  appStatusSelector,
  GeneralButton,
  isLoggedInSelector,
  PATH,
  useAppSelector,
  userNameSelector,
} from '../../common'

import { appBarSx, appSx, iconItSx } from './appBar.muiSx'
import { DropDownNavigate } from './DropDownNavigate'

export const AppBar = () => {
  const userName = useAppSelector(userNameSelector)
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const statusLoad = useAppSelector(appStatusSelector)
  const navigate = useNavigate()

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
          <DropDownNavigate />

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
