import React from 'react'

import { Box, Icon, Toolbar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import questionAnswerIcon from '../../assets/img/question-answer.png'

import {
  appBarLeftSx,
  appBarRightSx,
  appBarSx,
  defaultBoxSx,
  iconItSx,
  imgSx,
  useStylesAppbar,
} from './appBar.muiSx'
import { DropDownNavigate } from './DropDownNavigate'

import {
  appStatusSelector,
  GeneralButton,
  isLoggedInSelector,
  PATH,
  useAppSelector,
  userNameSelector,
} from 'common'

export const AppBar = () => {
  const userName = useAppSelector(userNameSelector)
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const statusLoad = useAppSelector(appStatusSelector)
  const navigate = useNavigate()

  const classes = useStylesAppbar()

  return (
    <Box sx={defaultBoxSx}>
      <Toolbar color="inherit" sx={appBarSx} className={classes.AppBarSx}>
        <Box sx={appBarLeftSx} className={classes.appBarLeftSx}>
          <Icon sx={iconItSx} className={classes.appBarIconItSx}>
            <Typography
              onClick={() => navigate(PATH.PROFILE)}
              component="img"
              src={questionAnswerIcon}
              alt="Cards"
              className={classes.appBarIconItSx}
              sx={imgSx}
            />
          </Icon>
        </Box>

        <Box sx={appBarRightSx} className={classes.appBarRightSx}>
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
    </Box>
  )
}
