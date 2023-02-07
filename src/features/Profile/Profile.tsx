import React, { ChangeEvent, useState } from 'react'

import Button from '@mui/material/Button/Button'
import TextField from '@mui/material/TextField/TextField'

import { SuperButton } from '../../common'

import iconBack from './Img/iconBack.png'
import s from './Profile.module.css'

export const Profile = () => {
  let [editMode, setEditMode] = useState(false)
  let [title, setTitle] = useState('Name')

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const activateEditMode = () => {
    setEditMode(true)
  }

  const activateViewMode = () => {
    setTitle(title)
    // dispatch(UpdateUserData({ name, avatar: photo }))
    setEditMode(false)
  }

  return (
    <div className={s.background}>
      <div className={s.backBlock}>
        <img src={iconBack} alt="icon back" />
        <p>Back to Packs List</p>
      </div>
      <div className={s.profile}>
        <div className={s.profileBlock}>
          <p>Personal Information</p>
          <div className={s.photoProfile}>
            <img
              src="https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg"
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
            <span onDoubleClick={activateEditMode}>{title}</span>
          )}
          <div>
            <p>Email</p>
          </div>
          <div>
            <SuperButton>Log Out</SuperButton>
          </div>
        </div>
      </div>
    </div>
  )
}
