import React, { useEffect } from 'react'

import { Box, Typography } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import { createNewPack, getPacks, setPaginationValue, setSearchValueFilter } from './packs-slice'
import { addNewPackBtnSx, addPackContainerSx, packsContainerSx, packTitleSx } from './Packs.muiSx'
import { FilterPanel, TablePacks } from './Table-packs'

import {
  appStatusSelector,
  cardPacksSelector,
  cardPacksTotalCountSelector,
  EmptySearchMessage,
  GeneralButton,
  InitializedLoader,
  isPacksLoadingSelector,
  packNameSelector,
  packsQueryParamsSelector,
  pageCountSelector,
  pageSelector,
  PaginationComponent,
  useAppDispatch,
  useAppSelector,
} from 'common'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const packsQueryParams = useAppSelector(packsQueryParamsSelector)

  const packs = useAppSelector(cardPacksSelector)
  const page = useAppSelector(pageSelector)
  const pageCount = useAppSelector(pageCountSelector)
  const cardPacksTotalCount = useAppSelector(cardPacksTotalCountSelector)

  const searchPackNameParam = useAppSelector(packNameSelector)

  const isPacksLoad = useAppSelector(isPacksLoadingSelector)
  const statusLoad = useAppSelector(appStatusSelector)

  const [queryParams, setPacksQueryParam] = useSearchParams()

  const addNewPack = () => {
    const dataParams = {
      name: `New Pack Name`,
      deckCover: '',
      private: false,
    }

    dispatch(createNewPack(dataParams))
  }

  const changePageCallback = (page: number, pageCount: number) => {
    dispatch(setPaginationValue({ page, pageCount }))
  }

  useEffect(() => {
    return () => {
      dispatch(setSearchValueFilter({ packName: '' }))
    }
  }, [])

  useEffect(() => {
    setPacksQueryParam({
      user_id: packsQueryParams.user_id,
      minCardsCount: String(packsQueryParams.min),
      maxCardsCount: String(packsQueryParams.max),
      page: String(packsQueryParams.page),
      pageCount: String(packsQueryParams.pageCount),
    })
    dispatch(getPacks())
  }, [packsQueryParams])

  // идет 2 запроса - доработать
  // useEffect(() => {
  // dispatch(
  //       setQueryParam({
  //         user_id: params.user_id || '',
  //         minCardsCount: params.minCardsCount || 0,
  //         maxCardsCount: params.maxCardsCount || 0,
  //         page: params.page || 1,
  //         pageCount: params.pageCount || 4,
  //       })
  //     )
  //

  // }, [])

  if (!isPacksLoad) {
    return <InitializedLoader />
  }

  return (
    <Box sx={packsContainerSx}>
      <Box sx={addPackContainerSx}>
        <Typography component="h1" sx={packTitleSx}>
          Pack List
        </Typography>
        <GeneralButton
          name="Add new pack"
          sx={addNewPackBtnSx}
          onClick={addNewPack}
          disabled={statusLoad === 'loading'}
        />
      </Box>

      <FilterPanel />
      {packs.length === 0 ? (
        <EmptySearchMessage searchParam={searchPackNameParam} />
      ) : (
        <TablePacks />
      )}
      <PaginationComponent
        page={page}
        pageCount={pageCount}
        totalCount={cardPacksTotalCount}
        changePageCallback={changePageCallback}
      />
    </Box>
  )
}
