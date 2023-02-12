import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import { isLoggedInSelector, PATH, useAppSelector } from '../../common'
export const PrivatePages = () => {
  let isAuth = useAppSelector(isLoggedInSelector)

  return isAuth ? <Outlet /> : <Navigate to={PATH.LOGIN} />
}
