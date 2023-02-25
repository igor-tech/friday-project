import React from 'react'

import { Typography } from '@mui/material'

import { warningMessageSx } from './messageToDelete.muiSx'

export const MessageToDelete: React.FC<
  Partial<{
    children: React.ReactNode
    messageStyleSx: React.CSSProperties
  }>
> = ({ children, messageStyleSx }) => {
  const defWarningMessageSx = {
    ...warningMessageSx,
    ...messageStyleSx,
  }

  return (
    <Typography component="p" sx={defWarningMessageSx}>
      {children}
    </Typography>
  )
}
