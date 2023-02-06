import { AppDispatch } from '../../App/store'

export const handleServerAppError = (error: string | undefined, dispatch: AppDispatch) => {
  if (error) {
    // dispatch(setAppError(error))
  } else {
    // dispatch(setAppError('some error occurred'))
  }
}

export const handleServerNetworkError = (error: { message: string }, dispatch: AppDispatch) => {
  // dispatch(setAppError(error.message ? error.message : 'Some error occurred'))
}
