import React from 'react'

import { Routes, Route } from 'react-router-dom'

import { PATH } from '../../common'
import { Login } from '../../features/Auth/login/Login'
import { CheckEmail } from '../../features/Auth/RecoveryPasswordForms/CheckEmail/CheckEmail'
import { NewPassword } from '../../features/Auth/RecoveryPasswordForms/NewPassword/NewPassword'
import { PasswordRecoveryForm } from '../../features/Auth/RecoveryPasswordForms/RecoveryPassword/PasswordRecoveryForm'
import { Register } from '../../features/Auth/Register/Register'
import { Profile } from '../../features/Profile/Profile'

export const Pages = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Profile />} />
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.REGISTRATION} element={<Register />} />
      <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecoveryForm />} />
      <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />
      <Route path={PATH.NEW_PASSWORD} element={<NewPassword />} />
      <Route path={PATH.ERROR} element={<h1>error</h1>} />
    </Routes>
  )
}
