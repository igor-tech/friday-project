import { Dispatch } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import { setAppMessage, setAppStatus } from '../../App/app-slice'

export const handleServerNetworkError = (e: any, dispatch: Dispatch) => {
  const err = e as Error | AxiosError<{ error: string }>

  if (axios.isAxiosError(err)) {
    const error = err.response?.data.error || err.message

    dispatch(setAppMessage(error))
  } else {
    dispatch(setAppMessage(err.message))
  }
  dispatch(setAppStatus('failed'))
}
