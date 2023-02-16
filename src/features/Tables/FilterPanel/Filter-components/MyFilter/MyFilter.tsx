import React, { useState } from 'react'

import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import Box from '@mui/material/Box/Box'

import { useAppDispatch, useAppSelector } from '../../../../../common'
import { userIdSelector } from '../../../../../common/selectors/packs-selectors'
import { setValueFilter } from '../../../table-slice'

import { buttonBlockSx, buttonSx, myFilterBlockSx, ToggleButtonGroupSx } from './MyFilter.muiSx'

export const MyFilter = () => {
  const dispatch = useAppDispatch()

  const userId = useAppSelector(userIdSelector)

  const [filterValue, setFilterValue] = useState<string | null>('all')

  const changeFilterHandler = (e: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    setFilterValue(newAlignment)
  }

  const onClickSetMyFilter = () => {
    dispatch(setValueFilter({ userId }))
  }

  const onClickSetAllFilter = () => {
    dispatch(setValueFilter({ userId: '' }))
  }

  return (
    <Box sx={myFilterBlockSx}>
      <Box>
        <Typography sx={{ fontWeight: '700' }} component="h2">
          Show packs cards
        </Typography>
      </Box>
      <Box sx={buttonBlockSx}>
        <ToggleButtonGroup
          sx={ToggleButtonGroupSx}
          onChange={changeFilterHandler}
          value={filterValue}
          exclusive
          aria-label="filter"
          color="primary"
        >
          <ToggleButton
            sx={buttonSx}
            value="my"
            aria-label="My filter"
            onClick={onClickSetMyFilter}
            disabled={filterValue === 'my'}
          >
            My
          </ToggleButton>
          <ToggleButton
            sx={buttonSx}
            value="all"
            aria-label="All filter"
            onClick={onClickSetAllFilter}
            disabled={filterValue === 'all'}
          >
            All
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
  )
}
