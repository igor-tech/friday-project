import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import { useAppDispatch, useAppSelector } from '../../../../../common'
import { setNewPassword } from '../newPassword-slice'

export const useNewPasswordForm = () => {
  const isNewPassword = useAppSelector(state => state.setNewPassword.isSetNewPassword)
  const appStatus = useAppSelector(state => state.app.status)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { token } = useParams()

  const { resetForm, handleSubmit, errors, getFieldProps, touched } = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: yup.object({
      password: yup.string().min(7).max(20).required(),
    }),
    onSubmit: (data: { password: string }): void => {
      dispatch(
        setNewPassword({
          password: data.password,
          resetPasswordToken: token!,
        })
      )
      resetForm()
    },
  })

  return {
    isNewPassword,
    dispatch,
    navigate,
    handleSubmit,
    errors,
    getFieldProps,
    touched,
    appStatus,
  }
}
