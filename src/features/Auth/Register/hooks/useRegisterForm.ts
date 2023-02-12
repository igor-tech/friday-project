import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import {
  appStatusSelector,
  isRegisteredSelector,
  useAppDispatch,
  useAppSelector,
} from '../../../../common'
import { RegisterAT } from '../../auth-slice'

export const useRegisterForm = () => {
  const navigate = useNavigate()
  const isRegistered = useAppSelector(isRegisteredSelector)
  const appStatus = useAppSelector(appStatusSelector)
  const dispatch = useAppDispatch()

  const { handleSubmit, errors, getFieldProps, touched, values } = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email('Введенное значение не является почтой')
        .required('Почта является обязательной'),
      password: yup
        .string()
        .min(8, 'Минимальная длина пароля 8 символов')
        .required('Пароль является обязательным'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Пароли не совпадают')
        .min(8, 'Минимальная длина пароля 8 символов')
        .required('Пароль является обязательным'),
    }),
    onSubmit: values => {
      dispatch(RegisterAT(values))
    },
  })

  return {
    navigate,
    isRegistered,
    dispatch,
    touched,
    errors,
    getFieldProps,
    handleSubmit,
    values,
    appStatus,
  }
}
