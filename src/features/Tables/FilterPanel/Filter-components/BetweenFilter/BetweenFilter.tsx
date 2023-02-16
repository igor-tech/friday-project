import React, { useEffect, useState } from 'react'

import { Box, Paper, Slider, Typography } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../../../../common'
import { packsSelector } from '../../../../../common/selectors/filter-selectors'
import { setBetweenValueFilter } from '../../../table-slice'

import {
  numberBlockSx,
  sliderBlockSx,
  sliderSx,
  textPaperBlockSx,
  titleSx,
} from './BetweenFilter.muiSx'

export const BetweenFilter = () => {
  const dispatch = useAppDispatch()

  const packs = useAppSelector(packsSelector)

  const [value, setValue] = useState<number[]>([packs.minCardsCount, packs.maxCardsCount])

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  const handleChangeCommitted = () => {
    dispatch(setBetweenValueFilter({ min: value[0], max: value[1] }))
  }

  useEffect(() => {
    setValue([packs.minCardsCount, packs.maxCardsCount])
  }, [packs.minCardsCount, packs.maxCardsCount])

  return (
    <Box>
      <Typography sx={titleSx} component="h2">
        Number of cards
      </Typography>

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
