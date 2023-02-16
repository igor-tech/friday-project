import React from 'react'

import { IconButton, Paper, Typography } from '@mui/material'
import Box from '@mui/material/Box/Box'

import RemoveFilterIcon from '../../../../../assets/img/RemoveFilter.png'
import { useAppDispatch, useAppSelector } from '../../../../../common'
import { packsSelector } from '../../../../../common/selectors/filter-selectors'
import { remove, setRenderForFilter } from '../../../table-slice'

import { iconBlockSx, paperBlockSx, RemoveFilterContainerSx } from './RemoveFilter.miuSx'

export const RemoveFilter = () => {
  const dispatch = useAppDispatch()
  const packs = useAppSelector(packsSelector)

  const onClickHandler = () => {
    dispatch(
      remove({
        packName: '',
        sortPacks: '0updated',
        min: packs.minCardsCount,
        max: packs.maxCardsCount,
        page: 1,
        pageCount: 4,
        user_id: '',
      })
    )
    dispatch(setRenderForFilter(1))
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
