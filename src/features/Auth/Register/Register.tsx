import React, { useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'
import * as yup from 'yup'

import { PATH, useAppDispatch, useAppSelector, useShowPassword } from '../../../common'
import { RegisterTC } from '../AuthThunk'

import style from './Register.module.css'

export const Register = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()

  const { showPassword, handleClickShowPassword } = useShowPassword()

  const formik = useFormik({
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
      dispatch(RegisterTC(values))
      formik.resetForm()
    },
  })

  if (isLoggedIn) {
    return <Navigate to={'/profile'} />
  }

  return (
    <div className={style.wrapper}>
      <form onSubmit={formik.handleSubmit} className={style.form}>
        <div className={style.title}>Sign up</div>

        <TextField
          id="email"
          label="Email"
          variant="standard"
          style={{ width: '347px' }}
          {...formik.getFieldProps('email')}
        />
        {formik.touched.email && formik.errors.email ? (
          <div style={{ width: '347px', color: 'red', marginTop: '3px' }}>
            {formik.errors.email}
          </div>
        ) : null}

        <FormControl sx={{ m: 1, width: '347px', marginTop: '24px' }} variant="standard">
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id={'password'}
            type={showPassword ? 'text' : 'password'}
            {...formik.getFieldProps('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        {formik.touched.password && formik.errors.password ? (
          <div style={{ width: '347px', color: 'red', marginTop: '3px' }}>
            {formik.errors.password}
          </div>
        ) : null}

        <FormControl sx={{ m: 1, width: '347px', marginTop: '24px' }} variant="standard">
          <InputLabel htmlFor="password">Confirm password</InputLabel>
          <Input
            id={'confirmPassword'}
            type={showPassword ? 'text' : 'password'}
            {...formik.getFieldProps('confirmPassword')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div style={{ width: '347px', color: 'red', marginTop: '3px' }}>
            {formik.errors.confirmPassword}
          </div>
        ) : null}

        <Button
          variant="contained"
          type="submit"
          className={style.btn}
          sx={{
            marginTop: '60px',
            width: '347px',
            borderRadius: 30,
            textTransform: 'none',
            background: '#366EFF',
            boxShadow:
              '0px 4px 18px rgba(54, 110, 255, 0.35), inset 0px 1px 0px rgba(255, 255, 255, 0.3)',
          }}
        >
          Sign Up
        </Button>

        <div className={style.text}>{`Already have an account?`}</div>

        <NavLink className={style.blueLink} to={PATH.LOGIN}>
          Sign In
        </NavLink>
      </form>
    </div>
  )
}
