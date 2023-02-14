import React, { useEffect } from 'react'

import { Box, Typography } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import { GeneralButton, useAppDispatch, useAppSelector } from '../../../common'

import arrow from './../../../assets/img/arrow.png'
import { createNewCard, getCards, setPacksCardId } from './cards-slice'

export const TableCards = () => {
  const dispatch = useAppDispatch()
  const card = useAppSelector(state => state.cards.cards)
  const myProfileId = useAppSelector(state => state.profile.user._id)
  const myPackUserId = useAppSelector(state => state.cards.packUserId)
  const packName = useAppSelector(state => state.cards.packName)
  const isMy = myProfileId === myPackUserId

  console.log(card)
  const { sortCards, cardQuestion, page, pageCount } = useAppSelector(
    state => state.cards.cardsQueryParams
  )
  const [urlQueryParam] = useSearchParams()
  const { cardsPackId } = Object.fromEntries(urlQueryParam)

  useEffect(() => {
    dispatch(setPacksCardId(cardsPackId))
  }, [])

  useEffect(() => {
    dispatch(getCards())
  }, [sortCards, cardQuestion, page, pageCount])

  return (
    <Box sx={{ margin: '24px 136px' }}>
      <Box
        sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '12px' }}
      >
        <Typography component="img" src={arrow} alt="arrow back" />
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontWeight: '400', fontSize: '14px', lineHeight: '24px', color: '#000000' }}
        >
          Back to Packs List
        </Typography>
      </Box>
      {card?.length === 0 && <EmptyPacks packName={packName} isMyPack={isMy} />}
      <div>Cards</div>
    </Box>
  )
}

const EmptyPacks: React.FC<{ packName: string; isMyPack: boolean }> = ({ packName, isMyPack }) => {
  const dispatch = useAppDispatch()
  const addNewCard = () => {
    dispatch(createNewCard({}))
  }

  return (
    <Box sx={{ marginTop: '27px' }}>
      <Typography
        sx={{ fontWeight: '600', fontSize: '22px', lineHeight: '27px', color: '#000000' }}
        component="h2"
      >
        {packName}
      </Typography>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '86px' }}
      >
        {isMyPack && (
          <>
            <Typography
              component="p"
              sx={{
                fontSize: '16px',
                lineHeight: '20px',
                fontWeight: '400',
                opacity: '0.5',
                color: '#000000',
              }}
            >
              This pack is empty. Click add new card to fill this pack
            </Typography>
            <GeneralButton
              sx={{ padding: '8px 28px', marginTop: '32px' }}
              name="Add new card"
              onClick={addNewCard}
            />
          </>
        )}

        {!isMyPack && (
          <>
            <Typography
              component="p"
              sx={{
                fontSize: '16px',
                lineHeight: '20px',
                fontWeight: '400',
                opacity: '0.5',
                color: '#000000',
              }}
            >
              This pack is empty
            </Typography>
          </>
        )}
      </Box>
    </Box>
  )
}
