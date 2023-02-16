import React, { ChangeEvent, useEffect } from 'react'

import { Box, Typography } from '@mui/material'

import { GeneralButton, useAppDispatch, useAppSelector } from '../../common'
import { PaginationComponent } from '../../common/components/PaginationComponent/PaginationComponent'

import { FilterPanel } from './FilterPanel/FilterPanel'
import { EmptySearchMessage } from './Table-packs/EmptySearchMessage/EmptySearchMessage'
import {
  addNewPackBtnSx,
  addPackContainerSx,
  packsContainerSx,
  packTitleSx,
} from './Table-packs/Packs.muiSx'
import { TablePacks } from './Table-packs/TablePacks'
import {
  createNewPack,
  getPacks,
  remove,
  setPaginationValue,
  setSearchValueFilter,
} from './table-slice'

const Packs = () => {
  const dispatch = useAppDispatch()
  const packsQueryParams = useAppSelector(state => state.packs.packsQueryParams)
  const packs = useAppSelector(state => state.packs.cardPacks)
  const { page, pageCount, cardPacksTotalCount, minCardsCount, maxCardsCount } = useAppSelector(
    state => state.packs
  )
  const addNewPack = () => {
    const dataParams = {
      name: `New Pack Name`,
      deckCover: '',
      private: false,
    }

    dispatch(createNewPack(dataParams))
  }

  const changePageCallback = (page: number, pageCount: number) => {
    dispatch(setPaginationValue({ page: page, pageCount: pageCount }))
  }

  useEffect(() => {
    return () => {
      dispatch(setSearchValueFilter({ packName: '' }))
    }
  }, [])

  useEffect(() => {
    dispatch(getPacks())
  }, [packsQueryParams])

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
      <PaginationComponent
        page={page}
        pageCount={pageCount}
        totalCount={cardPacksTotalCount}
        changePageCallback={changePageCallback}
      />
    </Box>
  )
}

export default Packs
