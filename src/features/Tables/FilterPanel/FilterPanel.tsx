import React from 'react'

import { Box } from '@mui/material'

import { BetweenFilter } from './Filter-components/BetweenFilter/BetweenFilter'
import { MyFilter } from './Filter-components/MyFilter/MyFilter'
import { SearchFilter } from './Filter-components/Search/Search'
import { RemoveFilter } from './Filter-components/СancellationFilter/RemoveFilter'
import { filterBlockSx } from './Filter.muiSx'

export const FilterPanel = () => {
  return (
    <Box sx={filterBlockSx}>
      <SearchFilter />

      <MyFilter />

      <BetweenFilter />

      <RemoveFilter />
    </Box>
  )
}
