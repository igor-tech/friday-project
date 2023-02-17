import React from 'react'

import { ThemeProvider } from '@mui/material'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import App from './App/App'
import { persistor, store } from './App/store'
import { theme } from './common/constants/font-theme'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <Provider store={store}>
    <HashRouter>
      <ThemeProvider theme={theme}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </ThemeProvider>
    </HashRouter>
  </Provider>
)
