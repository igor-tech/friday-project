import React from 'react'

import { Box, Container, Link, Paper, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import { Navigate, NavLink } from 'react-router-dom'

import { GeneralButton, PATH, ShowPasswordInput } from '../../../common'
import { setRegistered } from '../auth-slice'
import { maxWidth, text } from '../Login/Login.styled'
import {
  cardContainerSx,
  contentContainerSx,
  linkContentSx,
  linkSx,
  titleSx,
} from '../RecoveryPasswordForms/RecoveryPasswordForms.styled'

import { useRegisterForm } from './hooks/useRegisterForm'

export const Register = () => {
  const { isRegistered, handleSubmit, getFieldProps, errors, touched, dispatch } = useRegisterForm()

  if (isRegistered) {
    dispatch(setRegistered(false))

    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={cardContainerSx}>
        <Paper elevation={3}>
          <Container sx={contentContainerSx}>
            <Typography sx={titleSx} component="h1" variant="h5">
              Sign up
            </Typography>
            <TextField
              id="email"
              label="Email"
              variant="standard"
              fullWidth
              {...getFieldProps('email')}
              helperText={touched.email && errors.email}
              error={touched.email && !!errors.email}
            />

            <ShowPasswordInput
              touched={touched.password}
              nameLabel={'Password'}
              errors={errors.password}
              getFieldProps={getFieldProps}
              id={'password'}
            />

            <ShowPasswordInput
              touched={touched.confirmPassword}
              nameLabel={'Confirm password'}
              errors={errors.confirmPassword}
              getFieldProps={getFieldProps}
              id={'confirmPassword'}
            />

            <GeneralButton
              name={'Sign Up'}
              type={'submit'}
              variant={'contained'}
              fullWidth
              sx={maxWidth}
            />

            <Typography sx={text} component="h1" variant="h5">
              {`Already have an account?`}
            </Typography>

            <Typography component="div" sx={linkContentSx}>
              <Link component={NavLink} to={PATH.LOGIN} sx={linkSx}>
                Sign In
              </Link>
            </Typography>
          </Container>
        </Paper>
      </Box>
    </form>
  )
}
