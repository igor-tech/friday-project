import React, { useEffect, useState } from 'react'

import { Box, Paper, Slider, Typography } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../../../../common'
import { packsSelector } from '../../../../../common/selectors/filter-selectors'
import { userIdSelector } from '../../../../../common/selectors/packs-selectors'
import { getBetweenFilterAC } from '../../filter-slice'

import { numberBlockSx, sliderBlockSx, sliderSx, textPaperBlockSx } from './BetweenFilter.muiSx'

export const BetweenFilter = () => {
  const dispatch = useAppDispatch()

  const packs = useAppSelector(packsSelector)
  const userId = useAppSelector(userIdSelector)
  const filterValue = useAppSelector(state => state.filter.filter)

  const [value, setValue] = useState<number[]>([packs.minCardsCount, packs.maxCardsCount])

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  const handleChangeCommitted = (event: object) => {
    if (filterValue === 'my') {
      dispatch(
        getBetweenFilterAC({
          min: value[0],
          max: value[1],
          user_id: userId,
        })
      )
    } else {
      dispatch(
        getBetweenFilterAC({
          min: value[0],
          max: value[1],
        })
      )
    }
  }

  return (
    <Box sx={{ width: 600 }}>
      <Typography component="p">Number of cards</Typography>

      <Box sx={sliderBlockSx}>
        <Paper sx={numberBlockSx}>
          <Typography sx={textPaperBlockSx} component="p">
            {packs.minCardsCount}
          </Typography>
        </Paper>
        <Slider
          sx={sliderSx}
          getAriaLabel={() => 'Temperature range'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          max={packs.maxCardsCount}
          min={packs.minCardsCount}
          onChangeCommitted={handleChangeCommitted}
        />
        <Paper sx={numberBlockSx}>
          <Typography sx={textPaperBlockSx} component="p">
            {packs.maxCardsCount}
          </Typography>
        </Paper>
      </Box>
    </Box>
  )
}
