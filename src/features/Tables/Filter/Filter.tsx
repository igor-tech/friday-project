import React from 'react'

import { Box } from '@mui/material'

import { BetweenFilter } from './Filter-components/BetweenFilter/BetweenFilter'
import { MyFilter } from './Filter-components/MyFilter/MyFilter'
import { SearchFilter } from './Filter-components/Search/Search'
import { filterBlockSx } from './Filter.muiSx'

export const Filter = () => {
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
      </Box>
    </Box>
  )
}
