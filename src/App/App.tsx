import React, { useEffect } from 'react'

import './App.css'

import { useAppDispatch, useAppSelector } from '../common'
import { ErrorSnackbar } from '../common/components/ErrorSnackbar/ErrorSnackbar'
import { AppStatusLoader } from '../common/components/Preloader/AppStatusLoader/AppStatusLoader'
import { InitializedLoader } from '../common/components/Preloader/InitializedLoader/InitializedLoader'

import { getMeAuthTC } from './app-slice'
import { AppBar } from './AppBar/AppBar'
import { Pages } from './route-pages/Pages'

function App() {
  const isInitialized = useAppSelector(state => state.app.isLoggedIn)
  const status = useAppSelector(state => state.app.status)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getMeAuthTC())
  }, [])

  // я не понял смысл этой проверки давайте потом обсудим.
  /*  if (!isInitialized) {
    return <InitializedLoader />
  }*/

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
