import React, { ChangeEvent, useState } from 'react'

import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { Avatar, Icon, InputLabel, Typography } from '@mui/material'
import Box from '@mui/material/Box/Box'
import Button from '@mui/material/Button/Button'
import TextField from '@mui/material/TextField/TextField'
import { Navigate, useNavigate } from 'react-router-dom'

import { GeneralButton, PATH, SuperButton, useAppDispatch, useAppSelector } from '../../common'
import editIcon from '../../img/Edit.png'
import logOutIcon from '../../img/logout.png'
import iconBack from '../../img/logout.png'

import { logOutAccountTC, upDateNameTC } from './profile-slice'
import {
  avatarSx,
  backBlockSx,
  BtnLogOutSubmitSx,
  buttonSaveSx,
  describeNameSx,
  describeSx,
  describeTitleSx,
  iconNameSx,
  profileContainerSx,
  profileSx,
  titleSx,
} from './profile.styled'

export const Profile = () => {
  const isLoggedIn = useAppSelector(state => state.app.isLoggedIn)
  const user = useAppSelector(state => state.profile.user)
  const statusLoad = useAppSelector(state => state.app.status)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  let [editMode, setEditMode] = useState(false)
  let [title, setTitle] = useState(user.name)

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const backHandler = () => {
    // потом нужно дописать логику предыдущей страницы или другую
    alert('навигация пока не работает')
  }

  const logOut = () => {
    dispatch(logOutAccountTC())
    navigate(PATH.LOGIN)
  }

  const activateEditMode = () => {
    setEditMode(true)
  }

  const activateViewMode = () => {
    dispatch(upDateNameTC(title))
    setEditMode(false)
  }

  const avatarUser =
    user.avatar != null
      ? user.avatar
      : 'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg'

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <Box>
      <Box sx={backBlockSx} onClick={backHandler}>
        <ArrowBackOutlinedIcon sx={titleSx} />
        <Typography sx={titleSx} component="h1" variant="h5">
          Back to Packs List
        </Typography>
      </Box>
      <Box sx={profileContainerSx}>
        <Box sx={profileSx}>
          <Typography component="h1" variant="h5" sx={describeTitleSx}>
            Personal Information
          </Typography>
          <Avatar alt="Remy Sharp" src={avatarUser} sx={avatarSx} />
          {editMode ? (
            <Box>
              <TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} />
              <Button
                disabled={statusLoad === 'loading'}
                onClick={activateViewMode}
                variant="contained"
                size="small"
                sx={buttonSaveSx}
              >
                Save
              </Button>
            </Box>
          ) : (
            <Typography component="p" sx={describeNameSx} onDoubleClick={activateEditMode}>
              {user.name}
              <Icon sx={iconNameSx}>
                <img src={editIcon} />
              </Icon>
            </Typography>
          )}
          <Typography component="p" sx={describeSx}>
            {user.email}
          </Typography>
          <GeneralButton
            disabled={statusLoad === 'loading'}
            name="Log Out"
            type="submit"
            sx={BtnLogOutSubmitSx}
            onClick={logOut}
          />
        </Box>
      </Box>
    </Box>
  )
}
