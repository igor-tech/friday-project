import React from 'react'

import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Link,
  Paper,
  Typography,
  TextField,
} from '@mui/material'
import { Navigate, NavLink } from 'react-router-dom'

import {
  cardContainerSx,
  contentContainerSx,
  linkContentSx,
  linkSx,
  titleSx,
} from '../RecoveryPasswordForms/RecoveryPasswordForms.muiSx'

import { useLoginForm } from './hooks/useLoginForm'
import { Left, rightLink, text } from './Login.muiSx'

import { GeneralButton, PATH, ShowPasswordInput } from 'common'

export const Login = () => {
  const { getFieldProps, errors, touched, isLoggedIn, values, handleSubmit, disabled } =
    useLoginForm()

  if (isLoggedIn) {
    return <Navigate to={PATH.PACKS} />
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={cardContainerSx}>
        <Paper elevation={3}>
          <Container sx={contentContainerSx}>
            <Typography sx={titleSx} component="h1" variant="h5">
              Sign In
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
              id={'password'}
              getFieldProps={getFieldProps}
              errors={errors.password}
              touched={touched.password}
              nameLabel={'Password'}
            />

            <FormGroup sx={Left}>
              <FormControlLabel
                control={<Checkbox checked={values.rememberMe} {...getFieldProps('rememberMe')} />}
                label="Remember me"
              />
            </FormGroup>

            <Typography component="div">
              <Link component={NavLink} to={PATH.PASSWORD_RECOVERY} sx={rightLink}>
                Forgot Password?
              </Link>
            </Typography>

            <GeneralButton
              name={'Sign In'}
              type={'submit'}
              variant={'contained'}
              fullWidth
              disabled={disabled}
            />

            <Typography sx={text} component="h1" variant="h5">
              {`Don't have an account yet?`}
            </Typography>

            <Typography component="div" sx={linkContentSx}>
              <Link component={NavLink} to={PATH.REGISTRATION} sx={linkSx}>
                Sign Up
              </Link>
            </Typography>
          </Container>
        </Paper>
      </Box>
    </form>
  )
}
