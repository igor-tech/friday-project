import React, { DetailedHTMLProps, InputHTMLAttributes, useState } from 'react'

import { Icon, Tooltip, Typography } from '@mui/material'

import editIcon from '../../../assets/img/Edit.png'
import { describeNameSx, iconNameSx } from '../profile.muiSx'

import { InputWithButton } from './InputWithButton'

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type SuperEditableSpanType = Omit<DefaultInputPropsType, 'type'> & {
  onChangeName?: (newName: string) => void
  onEnter?: () => void
  onClick?: () => void
  value?: string
  buttonName: string
}

export const UpdateProfileName: React.FC<SuperEditableSpanType> = ({
  onChangeName,
  onEnter,
  value,
  onClick,
  buttonName,
}) => {
  const [editMode, setEditMode] = useState(false)

  const onEnterCallback = () => {
    setEditMode(false)
    onEnter?.()
  }

  const onClickCallBack = () => {
    setEditMode(false)
    onClick?.()
  }
  const EditMode = () => {
    setEditMode(true)
  }

  return (
    <>
      {editMode && (
        <InputWithButton
          onClick={onClickCallBack}
          onEnter={onEnterCallback}
          onChangeName={onChangeName}
          value={value}
          buttonName={buttonName}
        />
      )}

      {!editMode && (
        <Typography component="p" sx={describeNameSx} onClick={EditMode}>
          {value}
          <Tooltip title="change name" arrow placement="top">
            <Icon sx={iconNameSx}>
              <Typography component="img" src={editIcon} />
            </Icon>
          </Tooltip>
        </Typography>
      )}
    </>
  )
}
