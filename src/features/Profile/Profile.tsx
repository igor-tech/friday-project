import React, { useState } from 'react'

import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import { Avatar, Container, Paper, Typography, Box } from '@mui/material'
import { Navigate, useNavigate } from 'react-router-dom'

import {
  appStatusSelector,
  GeneralButton,
  isLoggedInSelector,
  PATH,
  useAppDispatch,
  useAppSelector,
  userAvatarSelector,
  userEmailSelector,
  userNameSelector,
} from '../../common'
import { LogoutAT } from '../Auth/auth-slice'

import { UpdateProfileName } from './EditableSpanProfileName/EditableSpanProfileName'
import { upDateNameTC } from './profile-slice'
import {
  avatarSx,
  backBlockSx,
  BtnLogOutSubmitSx,
  contentContainerSx,
  describeSx,
  describeTitleSx,
  profileContainerSx,
  titleSx,
} from './profile.muiSx'

export const Profile = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const userName = useAppSelector(userNameSelector)
  const userEmail = useAppSelector(userEmailSelector)
  const userAvatar = useAppSelector(userAvatarSelector)
  const statusLoad = useAppSelector(appStatusSelector)

  const avatarUser =
    userAvatar !== null
      ? userAvatar
      : 'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg'

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  let [newName, setNewName] = useState(userName)

  const backHandler = () => {
    // потом нужно дописать логику предыдущей страницы или другую
    alert('навигация пока не работает')
  }

  const logOut = () => {
    dispatch(LogoutAT())
    navigate(PATH.LOGIN)
  }
  const onChangeName = (newName: string) => {
    setNewName(newName)
  }
  const updateUserName = () => {
    if (newName.trim() !== '') {
      dispatch(upDateNameTC(newName))
    }
  }

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <>
      <Box sx={backBlockSx} onClick={backHandler}>
        <ArrowBackOutlinedIcon sx={titleSx} />
        <Typography sx={titleSx} component="h1" variant="h5">
          Back to Packs List
        </Typography>
      </Box>
      <Box sx={profileContainerSx}>
        <Paper elevation={3}>
          <Container sx={contentContainerSx}>
            <Typography component="h1" variant="h5" sx={describeTitleSx}>
              Personal Information
            </Typography>
            <Avatar alt="Remy Sharp" src={avatarUser} sx={avatarSx} />
            <UpdateProfileName
              value={newName}
              onEnter={updateUserName}
              onChangeName={onChangeName}
              onClick={updateUserName}
              buttonName="Save"
            />
            <Typography component="p" sx={describeSx}>
              {userEmail}
            </Typography>
            <GeneralButton
              disabled={statusLoad === 'loading'}
              name="Log Out"
              type="submit"
              sx={BtnLogOutSubmitSx}
              onClick={logOut}
            />
          </Container>
        </Paper>
      </Box>
    </>
  )
}
