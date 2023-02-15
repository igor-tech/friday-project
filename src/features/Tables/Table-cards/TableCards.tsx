import React, { useEffect } from 'react'

import { Box, Typography } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import { GeneralButton, useAppDispatch, useAppSelector } from '../../../common'

import { getCards, setPacksCardId } from './cards-slice'
import { largeText, smallText, startPositionSx } from './Cards.muiSx'
import { useTableCards } from './hooks/useTableCards'
import { TableCardsBody } from './Table-cards-body/TableCardsBody'
import { HeadersCards } from './Table-cards-head/TableCardsHead'
import { EmptyPacks } from './Table-empty-packs/EmptyPacks'

export const TableCards = () => {
  const { dispatch, card, isMy, packName } = useTableCards()

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
    <Box sx={packsContainerSx}>
      <Box sx={startPositionSx}>
        <Typography component="img" src={arrow} alt="arrow back" />
        <Typography component="h1" variant="h5" sx={smallText}>
          Back to Packs List
        </Typography>
      </Box>
      <Typography sx={largeText} component="h2">
        {card?.length !== 0 && (isMy ? 'My Pack' : 'Friend’s Pack')}
      </Typography>
      {card?.length === 0 ? (
        <EmptyPacks packName={packName} isMyPack={isMy} />
      ) : (
        <Paper sx={paperPacksSx}>
          <TableContainer>
            <Table aria-labelledby="tableTitle">
              <HeadersCards />
              <TableCardsBody />
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  )
}
