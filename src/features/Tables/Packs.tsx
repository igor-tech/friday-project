import React, { useEffect } from 'react'

import { Box, Typography } from '@mui/material'

import { GeneralButton, useAppDispatch, useAppSelector } from '../../common'

import { FilterPanel } from './FilterPanel/FilterPanel'
import { PaginationComponent } from './Pagination/Pagination'
import { EmptySearchMessage } from './Table-packs/EmptySearchMessage/EmptySearchMessage'
import {
  addNewPackBtnSx,
  addPackContainerSx,
  packsContainerSx,
  packTitleSx,
} from './Table-packs/Packs.muiSx'
import { TablePacks } from './Table-packs/TablePacks'
import { createNewPack, getPacks } from './table-slice'

const Packs = () => {
  const dispatch = useAppDispatch()
  const packsQueryParams = useAppSelector(state => state.packs.packsQueryParams)
  const packs = useAppSelector(state => state.packs.cardPacks)
  const isPacksLoad = useAppSelector(state => state.packs.isPacksLoading)
  const addNewPack = () => {
    const dataParams = {
      name: `New Pack Name`,
      deckCover: '',
      private: false,
    }

    dispatch(createNewPack(dataParams))
  }

  useEffect(() => {
    dispatch(getPacks())
  }, [packsQueryParams])

  if (!isPacksLoad) {
    console.log('loader')

    return <div>Loading</div>
  }

  return (
    <Box sx={packsContainerSx}>
      <Box sx={addPackContainerSx}>
        <Typography component="h1" sx={packTitleSx}>
          Pack List
        </Typography>
        <GeneralButton name="Add new pack" sx={addNewPackBtnSx} onClick={addNewPack} />
      </Box>

      <FilterPanel />
      {packs.length === 0 ? <EmptySearchMessage /> : <TablePacks />}
      <PaginationComponent />
    </Box>
  )
}

export default Packs
