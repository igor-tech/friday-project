import React, { useEffect } from 'react'

import { Box } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import {
  iconBlockSx,
  inputSx,
  paperBlockSx,
  searchBlockSx,
  searchContainerSx,
} from '../../common/components/Search/SearchMax.muiSx'

import { getCards, setCardQuestion, setLoadingCard, setPacksCardId } from './cards-slice'
import { cardsContainerSx } from './Cards.muiSx'
import { CardHeaderMenu, EmptyPackMenu, TableCards, useCardsLogic } from './Table-cards'

import {
  BackToPackList,
  EmptySearchMessage,
  InitializedLoader,
  PaginationComponent,
  SearchFilterComponent,
} from 'common'

const SearchFilterComponentCardSx = {
  iconBlockSx: iconBlockSx,
  inputSx: inputSx,
  paperBlockSx: paperBlockSx,
  searchBlockSx: searchBlockSx,
  searchContainerSx: searchContainerSx,
}

export const Cards = () => {
  const {
    dispatch,
    isMy,
    packName,
    searchCardQuestion,
    isCardLoading,
    sortCard,
    cardsTotalCount,
    pageCount,
    page,
    setSearchCallback,
    changePageCallback,
    addNewCardHandler,
    emptyCard,
    emptySearchCard,
  } = useCardsLogic()

  const [urlQueryParam] = useSearchParams()
  const { cardsPackId } = Object.fromEntries(urlQueryParam)

  useEffect(() => {
    dispatch(setPacksCardId(cardsPackId))

    return () => {
      dispatch(setCardQuestion(''))
      dispatch(setLoadingCard(false))
    }
  }, [])

  useEffect(() => {
    dispatch(getCards())
  }, [sortCard, searchCardQuestion, page, pageCount])

  if (!isCardLoading) {
    return <InitializedLoader />
  }

  if (emptyCard) {
    return (
      <EmptyPackMenu packName={packName} isMyPack={isMy} addNewCardHandler={addNewCardHandler} />
    )
  }

  return (
    <Box sx={cardsContainerSx}>
      <BackToPackList />
      <CardHeaderMenu packName={packName} isMyPack={isMy} addNewCardHandler={addNewCardHandler} />
      <SearchFilterComponent
        searchValue={searchCardQuestion}
        setSearchCallback={setSearchCallback}
        style={SearchFilterComponentCardSx}
      />
      {emptySearchCard ? <EmptySearchMessage searchParam={searchCardQuestion} /> : <TableCards />}
      <PaginationComponent
        page={page}
        pageCount={pageCount}
        totalCount={cardsTotalCount}
        changePageCallback={changePageCallback}
      />
    </Box>
  )
}
