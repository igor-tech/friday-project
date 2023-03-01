import React, { ChangeEvent } from 'react'

import { Badge, IconButton, styled, Avatar } from '@mui/material'

import { setAppMessage, setAppStatus } from '../../../App/app-slice'
import changeAvatarIcon from '../../../assets/img/changePhoto.png'
import {
  convertFileToBase64,
  useAppDispatch,
  useAppSelector,
  userAvatarSelector,
} from '../../../common'
import { upDateProfileTC } from '../profile-slice'
import { avatarSx } from '../profile.muiSx'

export const AvatarComponent = () => {
  const userAvatar = useAppSelector(userAvatarSelector)
  const dispatch = useAppDispatch()

  const avatarUser =
    userAvatar !== null
      ? userAvatar
      : 'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg'

  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 32,
    height: 32,
  }))

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          dispatch(upDateProfileTC({ newPhoto: file64 }))
        })
      } else {
        dispatch(setAppStatus('failed'))
        dispatch(setAppMessage('Файл слишком большой'))
      }
    }
  }

  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      badgeContent={
        <IconButton component="label">
          <input type="file" onChange={uploadHandler} style={{ display: 'none' }} />
          <SmallAvatar alt="Remy Sharp" src={changeAvatarIcon} />
        </IconButton>
      }
    >
      <Avatar alt="Remy Sharp" src={avatarUser} sx={avatarSx} />
    </Badge>
  )
}
