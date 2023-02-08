import React, { FC } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { FormControl, IconButton, InputAdornment, TextField } from '@mui/material'

import { useShowPassword } from '../../../hooks'

interface ShowPasswordInputType {
  id: string
  nameLabel: string
  getFieldProps: any
  errors: any
  touched: any
  sx?: any
}

export const ShowPasswordInput: FC<ShowPasswordInputType> = ({
  id,
  getFieldProps,
  errors,
  touched,
  sx,
  nameLabel,
}) => {
  const formBasicStylesSx = { m: 1, width: '100%', ...sx }

  const { showPassword, handleClickShowPassword, handleMouseDownPassword } = useShowPassword()

  return (
    <FormControl sx={formBasicStylesSx}>
      <TextField
        variant="standard"
        id={id}
        label={nameLabel}
        type={showPassword ? 'text' : 'password'}
        fullWidth
        error={touched && !!errors}
        helperText={touched && errors && errors}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...getFieldProps(id)}
      />
    </FormControl>
  )
}
