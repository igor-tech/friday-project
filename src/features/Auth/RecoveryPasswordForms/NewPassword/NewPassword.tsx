import React from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Box,
  Button,
  Container,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  Typography,
  FormControl,
} from '@mui/material'

import { PATH, useShowPassword } from '../../../../common'
import {
  BtnSubmit2Sx,
  cardContainerSx,
  contentContainerSx,
  error,
  formSx,
  newPassDescribeSx,
  titleSx,
} from '../RecoveryPasswordForms.styled'

import { useNewPasswordForm } from './hooks/useNewPasswordForm'
import { isSetNewPassword } from './newPassword-slice'

export const NewPassword = () => {
  const { showPassword, handleClickShowPassword, handleMouseDownPassword } = useShowPassword()
  const { handleSubmit, isNewPassword, dispatch, navigate, errors, getFieldProps } =
    useNewPasswordForm()

  if (isNewPassword) {
    dispatch(isSetNewPassword(false))
    navigate(`${PATH.LOGIN}`)
  }

  return (
    <Box sx={cardContainerSx}>
      <Paper elevation={3}>
        <Container sx={contentContainerSx}>
          <Typography sx={titleSx} component="h1" variant="h5">
            Create new password
          </Typography>

          <Box component="form" noValidate autoComplete="off" sx={formSx} onSubmit={handleSubmit}>
            <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                error={!!errors.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                {...getFieldProps('password')}
              />
              <Typography component="span" sx={error}>
                {errors.password && errors.password}
              </Typography>
            </FormControl>

            <Typography component="p" sx={newPassDescribeSx}>
              Create new password and we will send you further instructions to email
            </Typography>
            <Button type="submit" variant="contained" sx={BtnSubmit2Sx} fullWidth>
              Create new password
            </Button>
          </Box>
        </Container>
      </Paper>
    </Box>
  )
}
