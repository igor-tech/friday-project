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

import {
  createNewCard,
  getCards,
  setCardQuestion,
  setLoadingCard,
  setPacksCardId,
} from './cards-slice'
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
      dispatch(setLoadingCard(false))
    }
  }, [])

  useEffect(() => {
    dispatch(getCards())
  }, [sortCard, searchCardQuestion, page, pageCount])

  if (!isCardLoading) {
    return <InitializedLoader />
  }

  if (card?.length === 0 && searchCardQuestion === null) {
    return <EmptyPackMenu packName={packName} isMyPack={isMy} addNewCard={addNewCard} />
  }

  return (
    <Box sx={cardsContainerSx}>
      <BackToPackList />
      <CardHeaderMenu packName={packName} isMyPack={isMy} addNewCard={addNewCard} />
      <SearchFilterComponent
        searchValue={searchCardQuestion!}
        setSearchCallback={setSearchCallback}
        style={SearchFilterComponentCardSx}
      />
      {card?.length === 0 && searchCardQuestion !== null ? (
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
