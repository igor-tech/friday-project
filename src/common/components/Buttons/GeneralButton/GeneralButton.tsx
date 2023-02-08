import React, { FC } from 'react'

import { Button, ButtonProps } from '@mui/material'

export const GeneralButton: FC<ButtonProps> = ({
  name = 'button ',
  sx,
  variant = 'contained',
  type = 'button',
  ...restProps
}) => {
  const basicStylesSx = {
    background: ' #366EFF',
    padding: '8px 0',
    boxShadow: '0px 4px 18px rgba(54, 110, 255, 0.35), inset 0px 1px 0px rgba(255, 255, 255, 0.3)',
    borderRadius: '30px',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: ' 20px',
    textAlign: 'center',
    letterSpacing: '0.01em',
    color: '#FFFFFF',
    ...(sx as any),
  }

  return (
    <Button type={type} variant={variant} sx={basicStylesSx} {...restProps}>
      {name}
    </Button>
  )
}
