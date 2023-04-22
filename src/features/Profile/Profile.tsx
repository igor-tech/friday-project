import React, { useState } from 'react'

import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import { Box, Container, Paper, Typography } from '@mui/material'
import { Navigate, useNavigate } from 'react-router-dom'

import { LogoutAT } from '../Auth'

import { AvatarComponent } from './AvatarComponents/AvatarComponents'
import { UpdateProfileName } from './EditableSpanProfileName/EditableSpanProfileName'
import { upDateProfileTC } from './profile-slice'
import {
  backBlockSx,
  BtnLogOutSubmitSx,
  contentContainerSx,
  describeSx,
  describeTitleSx,
  profileContainerSx,
  titleSx,
} from './profile.muiSx'

import {
  appStatusSelector,
  GeneralButton,
  isLoggedInSelector,
  PATH,
  useAppDispatch,
  useAppSelector,
  userEmailSelector,
  userNameSelector,
} from 'common'

export const Profile = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const userName = useAppSelector(userNameSelector)
  const userEmail = useAppSelector(userEmailSelector)
  const statusLoad = useAppSelector(appStatusSelector)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  let [newName, setNewName] = useState(userName)

  const backHandler = () => navigate(PATH.PACKS)

  const logOut = () => {
    dispatch(LogoutAT())
      .unwrap()
      .then(() => {
        navigate(PATH.LOGIN)
      })
  }
  const onChangeName = (newName: string) => setNewName(newName)

  const updateUserName = () => {
    if (newName.trim() !== '') {
      dispatch(upDateProfileTC({ newName }))
    }
  }

  if (!isLoggedIn) return <Navigate to={PATH.LOGIN} />

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
            <AvatarComponent />
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
