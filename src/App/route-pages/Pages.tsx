import React from 'react'

import { Route, Routes } from 'react-router-dom'

import Packs from '../../features/Tables/Packs'
import { TableCards } from '../../features/Tables/Table-cards/TableCards'

import { PrivatePages } from './PrivatePages'

import { PATH } from 'common'
import { CheckEmail, Login, NewPassword, PasswordRecoveryForm, Profile, Register } from 'features'

export const Pages = () => {
  return (
    <Routes>
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.REGISTRATION} element={<Register />} />
      <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecoveryForm />} />
      <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />
      <Route path={PATH.NEW_PASSWORD} element={<NewPassword />} />
      <Route path={PATH.ERROR} element={<h1>error</h1>} />

      <Route element={<PrivatePages />}>
        <Route path={PATH.PACKS} element={<Packs />} />
        <Route path={PATH.PROFILE} element={<Profile />} />
        <Route path={PATH.PACKS + PATH.CARDS} element={<TableCards />} />
      </Route>
    </Routes>
  )
}
