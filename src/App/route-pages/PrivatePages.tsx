import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import { PATH, useAppSelector } from '../../common'
export const PrivatePages = () => {
  let isAuth = useAppSelector(state => state.auth.isLoggedIn)

  return isAuth ? <Outlet /> : <Navigate to={PATH.LOGIN} />
}
