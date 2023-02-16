import React, { useEffect } from 'react'

import { Box, Typography } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import {
  cardPacksSelector,
  cardPacksTotalCountSelector,
  GeneralButton,
  isPacksLoadingSelector,
  packsQueryParamsSelector,
  pageCountSelector,
  pageSelector,
  useAppDispatch,
  useAppSelector,
} from '../../common'
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
import { createNewPack, getPacks, setPaginationValue, setSearchValueFilter } from './table-slice'

const Packs = () => {
  const dispatch = useAppDispatch()
  const packsQueryParams = useAppSelector(packsQueryParamsSelector)
  const packs = useAppSelector(cardPacksSelector)
  const page = useAppSelector(pageSelector)
  const pageCount = useAppSelector(pageCountSelector)
  const cardPacksTotalCount = useAppSelector(cardPacksTotalCountSelector)

  const isPacksLoad = useAppSelector(isPacksLoadingSelector)

  const [, setPacksQueryParam] = useSearchParams()

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
    setPacksQueryParam({
      packs: packsQueryParams.user_id ? 'my' : 'all',
    })
  }, [packsQueryParams])

  if (!isPacksLoad) {
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
