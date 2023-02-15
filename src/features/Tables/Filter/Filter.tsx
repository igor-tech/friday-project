import React, { useEffect } from 'react'

import { Box } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../../common'
import { packsQueryParamsSelector } from '../../../common/selectors/filter-selectors'
import { getPacks } from '../table-slice'

import { BetweenFilter } from './Filter-components/BetweenFilter/BetweenFilter'
import { MyFilter } from './Filter-components/MyFilter/MyFilter'
import { SearchFilter } from './Filter-components/Search/Search'
import { RemoveFilter } from './Filter-components/СancellationFilter/RemoveFilter'
import { filterBlockSx } from './Filter.muiSx'

export const Filter = () => {
  const dispatch = useAppDispatch()

  const { packName, sortPacks, min, max, page, pageCount, user_id } =
    useAppSelector(packsQueryParamsSelector)

  // useEffect(() => {
  //   dispatch(getPacks())
  // }, [packName, sortPacks, min, max, page, pageCount, user_id])

  return (
    <Box>
      <Box sx={filterBlockSx}>
        <Box>
          <SearchFilter />
        </Box>
        <Box>
          <MyFilter />
        </Box>
        <Box>
          <BetweenFilter />
        </Box>
        <Box>
          <RemoveFilter />
        </Box>
      </Box>
    </Box>
  )
}
