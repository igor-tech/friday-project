import React, { ChangeEvent } from 'react'

import { Checkbox, FormControlLabel, TextField } from '@mui/material'

import { useAppSelector } from '../../../hooks'
import { appStatusSelector } from '../../../selectors'

import { editPackCardFormControlSx } from './packControlBlock.muiSx'

interface PropsType {
  error: string
  newName: string
  checked: boolean
  onChangeName: (newName: string) => void
  onChangePrivate: (e: boolean) => void
}

export const PackControlBlock: React.FC<PropsType> = ({
  onChangeName,
  onChangePrivate,
  error,
  checked,
  newName,
}) => {
  const statusLoad = useAppSelector(appStatusSelector)

  const onChangeNameHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChangeName?.(e.currentTarget.value)
  }

  return (
    <>
      <TextField
        fullWidth
        type="text"
        variant="standard"
        label="Name pack"
        value={newName}
        error={!!error}
        helperText={error}
        onChange={onChangeNameHandler}
        disabled={statusLoad === 'loading'}
      />
      <FormControlLabel
        sx={editPackCardFormControlSx}
        disabled={statusLoad === 'loading'}
        control={
          <Checkbox onChange={e => onChangePrivate(e.currentTarget.checked)} checked={checked} />
        }
        label="Private pack"
      />
    </>
  )
}
