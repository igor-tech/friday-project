import React, { useEffect } from 'react'

import { Box } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import { AppStatusLoader, useAppDispatch, useAppSelector } from '../../../common'

import { BackToPackList } from './BackToPackList'
import { CardHeaderMenu } from './CardMenu/CardHeaderMenu'
import { createNewCard, getCards, setPacksCardId } from './cards-slice'
import { EmptyPackMenu } from './EmptyPackMenu'

export const TableCards = () => {
  const dispatch = useAppDispatch()
  const isCardLoading = useAppSelector(state => state.cards.isCardLoading)
  const card = useAppSelector(state => state.cards.cards)
  const myProfileId = useAppSelector(state => state.profile.user._id)
  const myPackUserId = useAppSelector(state => state.cards.packUserId)
  const packName = useAppSelector(state => state.cards.packName)
  const resultSearch = useAppSelector(state => state.cards.cardsQueryParams.cardQuestion)
  const isMy = myProfileId === myPackUserId
  const { sortCards, cardQuestion, page, pageCount } = useAppSelector(
    state => state.cards.cardsQueryParams
  )
  const [urlQueryParam] = useSearchParams()
  const { cardsPackId } = Object.fromEntries(urlQueryParam)

  const addNewCard = () => {
    dispatch(createNewCard({}))
  }

  useEffect(() => {
    dispatch(setPacksCardId(cardsPackId))
  }, [])

  useEffect(() => {
    dispatch(getCards())
  }, [sortCards, cardQuestion, page, pageCount])

  if (!isCardLoading) {
    return <AppStatusLoader />
  }

  if (card?.length === 0 && !resultSearch) {
    return <EmptyPackMenu packName={packName} isMyPack={isMy} addNewCard={addNewCard} />
  }

  return (
    <Box sx={{ margin: '24px 136px' }}>
      <BackToPackList />
      <CardHeaderMenu packName={packName} isMyPack={isMy} addNewCard={addNewCard} />
      {card.length === 0 && resultSearch ? <div>Not result</div> : <div>Table</div>}
    </Box>
  )
}
