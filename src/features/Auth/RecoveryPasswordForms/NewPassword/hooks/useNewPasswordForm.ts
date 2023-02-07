import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import { useAppDispatch, useAppSelector } from '../../../../../common'
import { setNewPassword } from '../newPassword-slice'

export const useNewPasswordForm = () => {
  const SetNewPassword = useAppSelector(state => state.setNewPassword.isSetNewPassword)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { token } = useParams()

  const { resetForm, handleSubmit, errors, getFieldProps } = useFormik({
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
          resetPasswordToken: token,
        })
      )
      resetForm()
    },
  })

  return {
    SetNewPassword,
    dispatch,
    navigate,
    handleSubmit,
    errors,
    getFieldProps,
  }
}
