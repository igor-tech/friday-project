import React, { ChangeEvent, KeyboardEvent } from 'react'

import { Button, InputAdornment, TextField } from '@mui/material'

interface InputWithButtonType {
  onChangeName?: (newName: string) => void
  onEnter?: () => void
  onClick?: () => void
  value?: string
  buttonName: string
}

const btnSx = {
  fontWeight: '400',
  fontSize: '12px',
  lineHeight: '24px',
  color: '#FFFFFF',
  borderRadius: '2px',
  padding: '0 10px',
  '&.MuiButton-root': {
    margin: '10px',
  },
}

export const InputWithButton: React.FC<InputWithButtonType> = ({
  onChangeName,
  onEnter,
  value,
  onClick,
  buttonName,
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeName?.(e.currentTarget.value)
  }
  const onKeyPressCallback = (e: KeyboardEvent<HTMLDivElement>) => {
    onEnter && e.key === 'Enter' && onEnter()
  }

  const disabled = value === ''

  return (
    <TextField
      fullWidth
      variant="standard"
      label="Nickname"
      value={value}
      type="text"
      autoFocus
      error={!value}
      helperText={!value && 'Empty Nickname'}
      onChange={onChangeCallback}
      onKeyDown={onKeyPressCallback}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button sx={btnSx} variant="contained" disabled={disabled} onClick={onClick}>
              {buttonName}
            </Button>
          </InputAdornment>
        ),
      }}
      inputProps={{
        maxlength: 35,
      }}
    />
  )
}
