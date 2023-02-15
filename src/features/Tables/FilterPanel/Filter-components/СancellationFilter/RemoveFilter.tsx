import React from 'react'

import { IconButton, Paper, Typography } from '@mui/material'
import Box from '@mui/material/Box/Box'

import RemoveFilterIcon from '../../../../../assets/img/RemoveFilter.png'
import { useAppDispatch } from '../../../../../common'
import { getDefaultPacks } from '../../../table-slice'

import { iconBlockSx, paperBlockSx, RemoveFilterContainerSx } from './RemoveFilter.miuSx'

export const RemoveFilter = () => {
  const dispatch = useAppDispatch()

  const onClickHandler = () => {
    dispatch(getDefaultPacks())
  }

  return (
    <Box sx={RemoveFilterContainerSx}>
      <Paper sx={paperBlockSx}>
        <IconButton sx={iconBlockSx} aria-label="icon Remove-Filter" onClick={onClickHandler}>
          <Typography component="img" src={RemoveFilterIcon} />
        </IconButton>
      </Paper>
    </Box>
  )
}
