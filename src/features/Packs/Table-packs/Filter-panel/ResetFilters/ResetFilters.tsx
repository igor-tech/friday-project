import React from 'react'

import { Box, IconButton, Paper, Typography } from '@mui/material'

import RemoveFilterIcon from '../../../../../assets/img/RemoveFilter.png'
import { remove } from '../../../packs-slice'

import { iconBlockSx, paperBlockSx, RemoveFilterContainerSx } from './ResetFilters.miuSx'

import { appStatusSelector, useAppDispatch, useAppSelector } from 'common'

export const ResetFilters = () => {
  const dispatch = useAppDispatch()
  const statusLoad = useAppSelector(appStatusSelector)
  const onClickHandler = () => {
    dispatch(
      remove({
        packName: '',
        sortPacks: '0updated',
        min: 0,
        max: 0,
        page: 1,
        pageCount: 4,
        user_id: '',
      })
    )
  }

  return (
    <Box sx={RemoveFilterContainerSx}>
      <Paper sx={paperBlockSx}>
        <IconButton
          sx={iconBlockSx}
          aria-label="icon Remove-Filter"
          onClick={onClickHandler}
          disabled={statusLoad === 'loading'}
        >
          <Typography component="img" src={RemoveFilterIcon} />
        </IconButton>
      </Paper>
    </Box>
  )
}
