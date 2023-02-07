import { AxiosError } from 'axios'

import { AppDispatch } from '../../App/store'
import { handleServerAppError, handleServerNetworkError } from '../../common/utils/error-utils'

import { authAPI, LoginType, RegisterType } from './auth-api'
import { setStatusLogged } from './auth-slice'

export const LoginTC = (data: LoginType) => (dispatch: AppDispatch) => {
  authAPI
    .login(data)
    .then(res => {
      if (res.data.error === '' || null) {
        // dispatch(setData({ UserData: res.data }))
        dispatch(setStatusLogged({ value: true }))
      } else {
        handleServerAppError(res.data.error, dispatch)
      }
    })
    .catch((err: AxiosError<{ error: string }>) => {
      const error = err.response ? err.response.data.error : err.message

      handleServerNetworkError({ message: error }, dispatch)
    })
}

export const RegisterTC = (data: RegisterType) => (dispatch: AppDispatch) => {
  authAPI
    .register(data)
    .then(res => {
      if (res.data.error === '') {
        dispatch(setStatusLogged({ value: true }))
      }
    })
    .catch((err: AxiosError<{ error: string }>) => {
      const error = err.response ? err.response.data.error : err.message

      handleServerNetworkError({ message: error }, dispatch)
    })
}

export const LogoutTC = () => (dispatch: AppDispatch) => {
  authAPI
    .logout()
    .then(res => {
      dispatch(setStatusLogged({ value: false }))
    })
    .catch((err: AxiosError<{ error: string }>) => {
      const error = err.response ? err.response.data.error : err.message

      handleServerNetworkError({ message: error }, dispatch)
    })
}

export const PingTC = (time: number) => (dispatch: AppDispatch) => {
  authAPI.ping(time).then(res => {
    console.log(res)
  })
}
