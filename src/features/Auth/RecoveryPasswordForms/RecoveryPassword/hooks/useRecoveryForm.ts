import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import { useAppDispatch, useAppSelector } from '../../../../../common'
import { resetPassword } from '../recovery-password-slice'

export const useRecoveryForm = () => {
  const dispatch = useAppDispatch()
  const isRecoveryPass = useAppSelector(state => state.recoveryPassword.isRecovery)
  const appStatus = useAppSelector(state => state.app.status)
  const navigate = useNavigate()
  const { touched, resetForm, handleSubmit, errors, getFieldProps } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: yup.object({
      email: yup.string().email('Invalid email address'),
    }),
    onSubmit: (data: { email: string }): void => {
      dispatch(resetPassword(data.email))
      resetForm()
    },
  })

  return {
    dispatch,
    isRecoveryPass,
    navigate,
    handleSubmit,
    errors,
    getFieldProps,
    touched,
    appStatus,
  }
}
