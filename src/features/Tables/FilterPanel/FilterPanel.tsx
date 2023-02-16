import React from 'react'

import { Box } from '@mui/material'

import { useAppSelector } from '../../../common'

import { BetweenFilter } from './Filter-components/BetweenFilter/BetweenFilter'
import { MyFilter } from './Filter-components/MyFilter/MyFilter'
import { SearchFilterComponent } from './Filter-components/Search/Search'
import { RemoveFilter } from './Filter-components/СancellationFilter/RemoveFilter'
import { filterBlockSx } from './Filter.muiSx'

export const FilterPanel = () => {
  const searchValue = useAppSelector(state => state.packs.packsQueryParams.packName)

  console.log('Packs packName' + searchValue)

  return (
    <Box sx={filterBlockSx}>
      <SearchFilterComponent searchValue={searchValue} />

      <MyFilter />

      <BetweenFilter />

      <RemoveFilter />
    </Box>
  )
}
