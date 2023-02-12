import React, { useEffect } from 'react'

import './App.css'

import {
  useAppDispatch,
  useAppSelector,
  AppStatusLoader,
  InitializedLoader,
  ErrorSnackbar,
  isInitializedSelector,
  appStatusSelector,
} from '../common'

import { getMeAuthTC } from './app-slice'
import { AppBar } from './AppBar/AppBar'
import { Pages } from './route-pages/Pages'

function App() {
  const isInitialized = useAppSelector(isInitializedSelector)
  const status = useAppSelector(appStatusSelector)
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
