import React from 'react'

import { Box, Container, Link, Paper, TextField, Typography } from '@mui/material'
import { Navigate, NavLink } from 'react-router-dom'

import { GeneralButton, PATH } from '../../../../common'
import {
  BtnSubmitSx,
  cardContainerSx,
  contentContainerSx,
  describeSx,
  formSx,
  linkContentSx,
  linkSx,
  rememberPassSx,
  titleSx,
} from '../RecoveryPasswordForms.muiSx'

import { useRecoveryForm } from './hooks/useRecoveryForm'
import { isRecoveryPassword } from './recovery-password-slice'

export const PasswordRecoveryForm = () => {
  const { isRecoveryPass, errors, touched, handleSubmit, getFieldProps, dispatch, appStatus } =
    useRecoveryForm()
  const disabled = appStatus === 'loading'

  if (isRecoveryPass) {
    dispatch(isRecoveryPassword(false))

    return <Navigate to={PATH.CHECK_EMAIL} />
  }

  return (
    <Box sx={cardContainerSx}>
      <Paper elevation={3}>
        <Container sx={contentContainerSx}>
          <Typography sx={titleSx} component="h1" variant="h5">
            Forgot your password?
          </Typography>

          <Box component="form" noValidate autoComplete="off" sx={formSx} onSubmit={handleSubmit}>
            <TextField
              fullWidth
              id="email"
              label="Email"
              type="email"
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email && errors.email}
              variant="standard"
              disabled={disabled}
              {...getFieldProps('email')}
            />
            <Typography component="p" sx={describeSx}>
              Enter your email address and we will send you further instructions
            </Typography>
            <GeneralButton
              name="Send Instructions"
              type="submit"
              fullWidth
              sx={BtnSubmitSx}
              disabled={disabled}
            />
          </Box>

          <Typography component="p" sx={rememberPassSx}>
            Did you remember your password?
          </Typography>

          <Typography component="div" sx={linkContentSx}>
            <Link component={NavLink} to={PATH.LOGIN} sx={linkSx}>
              Try logging in
            </Link>
          </Typography>
        </Container>
      </Paper>
    </Box>
  )
}
