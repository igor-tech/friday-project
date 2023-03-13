import React, { useState } from 'react'

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined'
import {
  Tooltip,
  MenuItem,
  Menu,
  ListItemIcon,
  IconButton,
  Avatar,
  Box,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { colorBlack, containerPackMenuSx, iconButtonSx, menuPaperPropsSx } from './appBar.muiSx'

import {
  isLoggedInSelector,
  PATH,
  useAppDispatch,
  useAppSelector,
  userAvatarSelector,
} from 'common'
import { LogoutAT } from 'features'

export const DropDownNavigate = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const userAvatar = useAppSelector(userAvatarSelector)
  const isLoggedIn = useAppSelector(isLoggedInSelector)

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: any) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const profileHandler = () => {
    navigate(PATH.PROFILE)
    setAnchorEl(null)
  }
  const logoutHandler = () => {
    dispatch(LogoutAT())
      .unwrap()
      .then(() => {
        navigate(PATH.LOGIN)
      })
    setAnchorEl(null)
  }

  const avatarUser =
    userAvatar !== null
      ? userAvatar
      : 'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg'

  return (
    <>
      <Box sx={containerPackMenuSx}>
        <Tooltip title="profile navigate" placement="top">
          <IconButton onClick={handleClick} sx={iconButtonSx}>
            {isLoggedIn && <Avatar alt="Remy Sharp" src={avatarUser} />}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={menuPaperPropsSx}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={profileHandler}>
          <ListItemIcon sx={colorBlack}>
            <AccountCircleOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <Typography component="p" sx={colorBlack}>
            Profile
          </Typography>
        </MenuItem>
        <MenuItem onClick={logoutHandler}>
          <ListItemIcon sx={colorBlack}>
            <LoginOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <Typography component="p" sx={colorBlack}>
            Log out
          </Typography>
        </MenuItem>
      </Menu>
    </>
  )
}
