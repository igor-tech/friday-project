import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import { useAppDispatch, useAppSelector } from '../../../../common'
import { loginAT } from '../../auth-slice'

export const useLoginForm = () => {
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const appStatus = useAppSelector(state => state.app.status)
  const dispatch = useAppDispatch()

  const { handleSubmit, resetForm, errors, getFieldProps, touched, values } = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: yup.object({
      email: yup.string().email().required(),
      password: yup.string().min(8).required(),
    }),
    onSubmit: values => {
      dispatch(loginAT(values))
      resetForm()
    },
  })

  return {
    navigate,
    isLoggedIn,
    dispatch,
    touched,
    resetForm,
    errors,
    getFieldProps,
    handleSubmit,
    values,
    appStatus,
  }
}
