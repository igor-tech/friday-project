import React from 'react'

import './App.css'
import { AppBar } from '../features/AppBar/AppBar'

import { Pages } from './route-pages/Pages'

function App() {
  return (
    <>
      <AppBar />
      <Pages />
    </>
  )
}

export default App
