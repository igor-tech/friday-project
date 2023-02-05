import React, { useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@mui/material'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'
import * as Yup from 'yup'

import { PATH, useAppSelector } from '../../../common'

import style from './Login.module.css'

export const Login = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(show => !show)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(8, 'Must be 8 characters or more').required('Required'),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  if (isLoggedIn) {
    return <Navigate to={'/profile'} />
  }

  return (
    <div className={style.wrapper}>
      <form onSubmit={formik.handleSubmit} className={style.form}>
        <div className={style.title}>Sign in</div>

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
            id="password"
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

        <FormGroup style={{ width: '347px' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.rememberMe}
                {...formik.getFieldProps('rememberMe')}
              />
            }
            label="Remember me"
          />
        </FormGroup>

        <div style={{ width: '347px' }}>
          <NavLink to={PATH.PASSWORD_RECOVERY} className={style.blackLink}>
            Forgot Password?
          </NavLink>
        </div>

        <Button
          variant="contained"
          type="submit"
          className={style.btn}
          style={{
            width: '347px',
            borderRadius: '30px',
            background: '#366EFF',
            boxShadow:
              '0px 4px 18px rgba(54, 110, 255, 0.35), inset 0px 1px 0px rgba(255, 255, 255, 0.3)',
          }}
        >
          Sign In
        </Button>

        <div className={style.text}>{`Don't have an account yet?`}</div>

        <NavLink className={style.blueLink} to={PATH.REGISTRATION}>
          Sign Up
        </NavLink>
      </form>
    </div>
  )
}
