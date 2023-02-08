import React, { useEffect } from 'react'

import './App.css'

import { useAppDispatch, useAppSelector } from '../common'
import { ErrorSnackbar } from '../common/components/ErrorSnackbar/ErrorSnackbar'
import { AppStatusLoader } from '../common/components/Preloader/AppStatusLoader/AppStatusLoader'
import { InitializedLoader } from '../common/components/Preloader/InitializedLoader/InitializedLoader'
import { AppBar } from '../features/AppBar/AppBar'
import { getMeAuthTC } from '../features/Profile/profile-slice'

import { Pages } from './route-pages/Pages'

function App() {
  const isInitialized = useAppSelector(state => state.profile.isInitialized)
  const status = useAppSelector(state => state.app.status)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getMeAuthTC())
  }, [])

  if (!isInitialized) {
    return <InitializedLoader />
  }

  return (
    <>
      <AppBar />
      {status === 'loading' && <AppStatusLoader />}
      <Pages />
      <ErrorSnackbar />
    </>
  )
}

export default App
