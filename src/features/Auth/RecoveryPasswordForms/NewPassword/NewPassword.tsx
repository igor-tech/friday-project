import React from 'react'

import { Box, Container, Paper, Typography } from '@mui/material'

import { GeneralButton, PATH, ShowPasswordInput } from '../../../../common'
import {
  BtnSubmitNpSx,
  cardContainerSx,
  contentContainerSx,
  formSx,
  newPassDescribeSx,
  titleSx,
} from '../RecoveryPasswordForms.styled'

import { useNewPasswordForm } from './hooks/useNewPasswordForm'
import { isSetNewPassword } from './newPassword-slice'

export const NewPassword = () => {
  const {
    handleSubmit,
    isNewPassword,
    dispatch,
    navigate,
    errors,
    getFieldProps,
    touched,
    appStatus,
  } = useNewPasswordForm()
  const disabled = appStatus === 'loading'

  if (isNewPassword) {
    dispatch(isSetNewPassword(false))
    navigate(PATH.LOGIN)
  }

  return (
    <Box sx={cardContainerSx}>
      <Paper elevation={3}>
        <Container sx={contentContainerSx}>
          <Typography sx={titleSx} component="h1" variant="h5">
            Create new password
          </Typography>

          <Box component="form" noValidate autoComplete="off" sx={formSx} onSubmit={handleSubmit}>
            <ShowPasswordInput
              errors={errors.password}
              touched={touched.password}
              id="password"
              getFieldProps={getFieldProps}
              nameLabel={'Password'}
            />
            <Typography component="p" sx={newPassDescribeSx}>
              Create new password and we will send you further instructions to email
            </Typography>

            <GeneralButton
              type="submit"
              name="Create new password"
              fullWidth
              sx={BtnSubmitNpSx}
              disabled={disabled}
            />
          </Box>
        </Container>
      </Paper>
    </Box>
  )
}
