import { useFormik } from 'formik'
import * as yup from 'yup'

import {
  appStatusSelector,
  isLoggedInSelector,
  useAppDispatch,
  useAppSelector,
} from '../../../../common'
import { loginAT } from '../../auth-slice'

export const useLoginForm = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const appStatus = useAppSelector(appStatusSelector)
  const dispatch = useAppDispatch()

  const { handleSubmit, errors, getFieldProps, touched, values } = useFormik({
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
    },
  })

  return {
    isLoggedIn,
    dispatch,
    touched,
    errors,
    getFieldProps,
    handleSubmit,
    values,
    appStatus,
  }
}
