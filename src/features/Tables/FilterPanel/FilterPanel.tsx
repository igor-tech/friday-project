import React from 'react'

import { Box } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../../common'
import { setSearchValueFilter } from '../table-slice'

import { BetweenFilter } from './Filter-components/BetweenFilter/BetweenFilter'
import { MyFilter } from './Filter-components/MyFilter/MyFilter'
import { SearchFilterComponent } from './Filter-components/Search/Search'
import {
  iconBlockSx,
  inputSx,
  paperBlockSx,
  searchBlockSx,
  searchContainerSx,
} from './Filter-components/Search/Search.muiSx'
import { RemoveFilter } from './Filter-components/СancellationFilter/RemoveFilter'
import { filterBlockSx } from './Filter.muiSx'

export const FilterPanel = () => {
  const searchValue = useAppSelector(state => state.packs.packsQueryParams.packName)
  const dispatch = useAppDispatch()

  const setSearchCallback = (newPackName: string) => {
    dispatch(setSearchValueFilter({ packName: newPackName }))
  }

  const style = {
    iconBlockSx: iconBlockSx,
    inputSx: inputSx,
    paperBlockSx: paperBlockSx,
    searchBlockSx: searchBlockSx,
    searchContainerSx: searchContainerSx,
  }

  return (
    <Box sx={filterBlockSx}>
      <SearchFilterComponent
        searchValue={searchValue}
        setSearchCallback={setSearchCallback}
        style={style}
      />

      <MyFilter />

      <BetweenFilter />

      <RemoveFilter />
    </Box>
  )
}
