import React, { useEffect } from 'react'

import { Box, Typography } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import { getPacks, setIsPacksLoading, setSearchValueFilter } from './packs-slice'
import { addNewPackBtnSx, addPackContainerSx, packsContainerSx, packTitleSx } from './Packs.muiSx'
import { FilterPanel, TablePacks } from './Table-packs'
import { usePacksLogic } from './Table-packs/hooks/usePacksLogic'

import { EmptySearchMessage, GeneralButton, InitializedLoader, PaginationComponent } from 'common'

export const Packs = () => {
  const {
    packs,
    packsQueryParams,
    searchPackNameParam,
    cardPacksTotalCount,
    pageCount,
    page,
    isPacksLoad,
    statusLoad,
    addNewPack,
    dispatch,
    changePageCallback,
  } = usePacksLogic()
  const [, setPacksQueryParam] = useSearchParams()

  useEffect(() => {
    return () => {
      dispatch(setSearchValueFilter({ packName: '' }))
      dispatch(setIsPacksLoading(false))
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
