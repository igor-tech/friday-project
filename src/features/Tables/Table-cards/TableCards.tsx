import React, { useEffect } from 'react'

import { Box, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import { useSearchParams } from 'react-router-dom'

import arrow from '../../../assets/img/arrow.png'
import { useAppDispatch, useAppSelector } from '../../../common'
import { packsContainerSx } from '../Table-packs/Packs.muiSx'
import { paperPacksSx } from '../Table-packs/TablePacks.muiSx'

import { getCards, setPacksCardId } from './cards-slice'
import { largeText, smallText, startPositionSx } from './Cards.muiSx'
import { TableCardsBody } from './Table-cards-body/TableCardsBody'
import { HeadersCards } from './Table-cards-head/TableCardsHead'
import { EmptyPacks } from './Table-empty-packs/EmptyPacks'

export const TableCards = () => {
  const dispatch = useAppDispatch()
  const card = useAppSelector(state => state.cards.cards)
  const myProfileId = useAppSelector(state => state.profile.user._id)
  const myPackUserId = useAppSelector(state => state.cards.packUserId)
  const packName = useAppSelector(state => state.cards.packName)
  const isMy = myProfileId === myPackUserId

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
