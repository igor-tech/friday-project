import React, { FC } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from '@mui/material'

import { useShowPassword } from '../../../hooks'

const error = {
  marginTop: '3px',
  fontWeight: '400',
  lineHeight: ' 1.66',
  color: '#d32f2f',
  fontSize: '0.75rem',
}

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
    <FormControl sx={formBasicStylesSx} variant="standard">
      <InputLabel htmlFor={id}>{nameLabel}</InputLabel>
      <Input
        id={id}
        type={showPassword ? 'text' : 'password'}
        fullWidth
        error={!!errors}
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
        {...getFieldProps(id)}
      />
      <Typography component="span" sx={error}>
        {touched && errors && errors}
      </Typography>
    </FormControl>
  )
}
