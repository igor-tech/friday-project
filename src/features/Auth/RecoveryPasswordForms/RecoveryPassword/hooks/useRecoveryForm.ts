import { useFormik } from 'formik'
import * as yup from 'yup'

import {
  appStatusSelector,
  isRecoverySelector,
  useAppDispatch,
  useAppSelector,
} from '../../../../../common'
import { resetPassword } from '../recovery-password-slice'

export const useRecoveryForm = () => {
  const dispatch = useAppDispatch()
  const isRecoveryPass = useAppSelector(isRecoverySelector)
  const appStatus = useAppSelector(appStatusSelector)
  const { touched, handleSubmit, errors, getFieldProps } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: yup.object({
      email: yup.string().email('Invalid email address'),
    }),
    onSubmit: (data: { email: string }): void => {
      dispatch(resetPassword(data.email))
    },
  })

  return {
    dispatch,
    isRecoveryPass,
    handleSubmit,
    errors,
    getFieldProps,
    touched,
    appStatus,
  }
}
