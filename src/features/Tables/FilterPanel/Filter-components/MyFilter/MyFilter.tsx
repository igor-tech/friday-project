import React from 'react'

import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import Box from '@mui/material/Box/Box'

import {
  packsUserIdSelector,
  useAppDispatch,
  useAppSelector,
  userIdSelector,
} from '../../../../../common'
import { setValueFilter } from '../../../table-slice'

import { buttonBlockSx, buttonSx, myFilterBlockSx, ToggleButtonGroupSx } from './MyFilter.muiSx'

export const MyFilter = () => {
  const dispatch = useAppDispatch()

  const userId = useAppSelector(userIdSelector)
  const packsQueryParamsUserId = useAppSelector(packsUserIdSelector)

  const setMyPacks = () => {
    dispatch(setValueFilter({ userId }))
  }

  const setAllPacks = () => {
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
          value={packsQueryParamsUserId ? 'my' : 'all'}
          exclusive
          aria-label="filter"
          color="primary"
        >
          <ToggleButton sx={buttonSx} value="my" aria-label="My filter" onClick={setMyPacks}>
            My
          </ToggleButton>
          <ToggleButton sx={buttonSx} value="all" aria-label="All filter" onClick={setAllPacks}>
            All
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
  )
}
