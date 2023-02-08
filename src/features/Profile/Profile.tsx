import React, { ChangeEvent, useEffect, useState } from 'react'

import Button from '@mui/material/Button/Button'
import TextField from '@mui/material/TextField/TextField'
import { useNavigate } from 'react-router-dom'

import { PATH, SuperButton, useAppDispatch, useAppSelector } from '../../common'

import iconBack from './Img/iconBack.png'
import { getMeAuthTC, upDateNameTC, UserType } from './profile-slice'
import s from './Profile.module.css'

export const Profile = () => {
  let [editMode, setEditMode] = useState(false)
  let [title, setTitle] = useState('Name')

  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const user = useAppSelector<UserType>(state => state.profile.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // вопрос по типизации getMeAuth({}) и диспача внутри, если убрать request: {}
  useEffect(() => {
    if (!isLoggedIn) return
    dispatch(getMeAuthTC({}))
  }, [])

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const backHandler = () => {
    navigate(PATH.LOGIN)
  }

  const activateEditMode = () => {
    setEditMode(true)
  }

  const activateViewMode = () => {
    upDateNameTC(title)

    // dispatch(UpdateUserData({ name, avatar: photo }))
    setEditMode(false)
  }

  if (isLoggedIn) {
    navigate(PATH.LOGIN)
  }

  return (
    <div className={s.background}>
      <div className={s.backBlock}>
        <div className={s.backBlock} onClick={backHandler}>
          <img src={iconBack} alt="icon back" />
          <p>Back to Packs List</p>
        </div>
      </div>
      <div className={s.profile}>
        <div className={s.profileBlock}>
          <p>Personal Information</p>
          <div className={s.photoProfile}>
            <img
              src={
                user.avatar != null
                  ? user.avatar
                  : 'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg'
              }
              alt="Avatar"
            />
          </div>
          {editMode ? (
            <div className={s.changeNameBlock}>
              <TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} />
              <Button onClick={activateViewMode} variant="contained" size="small">
                Save
              </Button>
            </div>
          ) : (
            <span onDoubleClick={activateEditMode}>{user.name}</span>
          )}
          <div>
            <p>{user.email}</p>
          </div>
          <div>
            <SuperButton onClick={backHandler}>Log Out</SuperButton>
          </div>
        </div>
      </div>
    </div>
  )
}
