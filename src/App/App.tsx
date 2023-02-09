import React, { useEffect } from 'react'

import './App.css'

import { useAppDispatch, useAppSelector, AppStatusLoader, InitializedLoader } from '../common'
import { ErrorSnackbar } from '../common/components/ErrorSnackbar/ErrorSnackbar'

import { getMeAuthTC } from './app-slice'
import { AppBar } from './AppBar/AppBar'
import { Pages } from './route-pages/Pages'

function App() {
  const isInitialized = useAppSelector(state => state.app.isInitialized)
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
