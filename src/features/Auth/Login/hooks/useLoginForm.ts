import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import { PATH, useAppDispatch, useAppSelector } from '../../../../common'
import { LoginTC } from '../../AuthThunk'

export const useLoginForm = () => {
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
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
      dispatch(LoginTC(values))
      resetForm()
      navigate(PATH.PROFILE) // добавил что бы был редирект сразу после отправки формы, нужно доработать, что бы данные в профайле сразу подгружались до загрузки страницы.
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
  }
}
