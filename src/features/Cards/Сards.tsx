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

import { createNewCard, getCards, setCardQuestion, setPacksCardId } from './cards-slice'
import { cardsContainerSx } from './Cards.muiSx'
import { EmptyPackMenu, CardHeaderMenu, useCardsLogic, TableCards } from './Table-cards'

import {
  AppStatusLoader,
  BackToPackList,
  EmptySearchMessage,
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
    card,
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
  } = useCardsLogic()

  const [urlQueryParam] = useSearchParams()
  const { cardsPackId } = Object.fromEntries(urlQueryParam)

  const addNewCard = () => {
    dispatch(createNewCard({}))
  }

  useEffect(() => {
    dispatch(setPacksCardId(cardsPackId))

    return () => {
      dispatch(setCardQuestion(''))
    }
  }, [])

  useEffect(() => {
    dispatch(getCards())
  }, [sortCard, searchCardQuestion, page, pageCount])

  if (!isCardLoading) {
    return <AppStatusLoader />
  }

  if (card?.length === 0 && !searchCardQuestion) {
    return <EmptyPackMenu packName={packName} isMyPack={isMy} addNewCard={addNewCard} />
  }

  return (
    <Box sx={cardsContainerSx}>
      <BackToPackList />
      <CardHeaderMenu packName={packName} isMyPack={isMy} addNewCard={addNewCard} />
      <SearchFilterComponent
        searchValue={searchCardQuestion}
        setSearchCallback={setSearchCallback}
        style={SearchFilterComponentCardSx}
      />
      {card?.length === 0 && searchCardQuestion ? (
        <EmptySearchMessage searchParam={searchCardQuestion} />
      ) : (
        <TableCards />
      )}
      <PaginationComponent
        page={page}
        pageCount={pageCount}
        totalCount={cardsTotalCount}
        changePageCallback={changePageCallback}
      />
    </Box>
  )
}
