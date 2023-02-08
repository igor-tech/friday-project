import { setAppError } from '../../App/root-reducer'
import { AppDispatch } from '../../App/store'

export const handleServerAppError = (error: any, dispatch: AppDispatch) => {
  if (error) {
    dispatch(setAppError(error.response.data.error))
  } else {
    dispatch(setAppError('some error occurred'))
  }
}

export const handleServerNetworkError = (error: any, dispatch: AppDispatch) => {
  dispatch(setAppError(error ? error.response.data.error : 'Some error occurred'))
}
