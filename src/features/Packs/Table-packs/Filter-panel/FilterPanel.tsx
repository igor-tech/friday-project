import React from 'react'

import { Box } from '@mui/material'

import {
  iconBlockSx,
  inputSx,
  paperBlockSx,
  searchBlockSx,
  searchContainerSx,
} from '../../../../common/components/Search/Search.muiSx'
import { setSearchValueFilter } from '../../packs-slice'

import { filterBlockSx } from './FilterPanel.muiSx'
import { ResetFilters } from './ResetFilters/ResetFilters'
import { SliderFilter } from './SliderFilter/SliderFilter'
import { SwitchButtonFilter } from './SwitchButtonFilter/SwitchButtonFilter'

import { useAppDispatch, useAppSelector, SearchFilterComponent, packNameSelector } from 'common'

const searchFilterComponentSx = {
  iconBlockSx: iconBlockSx,
  inputSx: inputSx,
  paperBlockSx: paperBlockSx,
  searchBlockSx: searchBlockSx,
  searchContainerSx: searchContainerSx,
}

export const FilterPanel = () => {
  const searchValue = useAppSelector(packNameSelector)
  const dispatch = useAppDispatch()

  const setSearchCallback = (newPackName: string) => {
    dispatch(setSearchValueFilter({ packName: newPackName }))
  }

  return (
    <Box sx={filterBlockSx}>
      <SearchFilterComponent
        searchValue={searchValue}
        setSearchCallback={setSearchCallback}
        style={searchFilterComponentSx}
      />

      <SwitchButtonFilter />

      <SliderFilter />

      <ResetFilters />
    </Box>
  )
}
