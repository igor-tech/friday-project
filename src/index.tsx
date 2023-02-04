import React from 'react'

import { createRoot } from 'react-dom/client'
import './index.css'
import { HashRouter } from 'react-router-dom'

import App from './App/App'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <HashRouter>
    <App />
  </HashRouter>
)
