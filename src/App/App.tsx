import React, { useEffect } from 'react'

import './App.css'

import { getMeAuthTC } from './app-slice'
import { AppBar } from './AppBar/AppBar'
import { Pages } from './route-pages/Pages'

import {
  AppStatusLoader,
  appStatusSelector,
  ErrorSnackbar,
  InitializedLoader,
  isInitializedSelector,
  Modal,
  useAppDispatch,
  useAppSelector,
} from 'common'

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
      <Modal />
    </>
  )
}

export default App
