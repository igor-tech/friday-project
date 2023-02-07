import React from 'react'

import './App.css'
import { AppBar } from '../features/AppBar/AppBar'
import { Profile } from '../features/Profile/Profile'

import { Pages } from './route-pages/Pages'

function App() {
  return (
    <>
      <AppBar />
      <Profile />
      <Pages />
    </>
  )
}

export default App
