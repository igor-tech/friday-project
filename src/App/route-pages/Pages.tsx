import React from 'react'

import { Route, Routes } from 'react-router-dom'

import { PrivatePages } from './PrivatePages'

import { PATH } from 'common'
import { PasswordRecoveryForm, Login, CheckEmail, NewPassword, Register, Profile } from 'features'

export const Pages = () => {
  return (
    <Routes>
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.PROFILE} element={<Profile />} />
      <Route path={PATH.REGISTRATION} element={<Register />} />
      <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecoveryForm />} />
      <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />
      <Route path={PATH.NEW_PASSWORD} element={<NewPassword />} />
      <Route path={PATH.ERROR} element={<h1>error</h1>} />

      <Route element={<PrivatePages />}>
        <Route path="/" element={<Profile />} />
      </Route>
    </Routes>
  )
}
