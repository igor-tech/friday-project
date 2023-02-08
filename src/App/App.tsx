import React, { useEffect } from 'react'

import './App.css'
import { CircularProgress } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../common'
import { ErrorSnackbar } from '../common/components/ErrorSnackbar/ErrorSnackbar'
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
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <>
      <AppBar />
      <Pages />
      {status === 'loading' && <div>Loading</div>}
      <ErrorSnackbar />
    </>
  )
}

export default App
