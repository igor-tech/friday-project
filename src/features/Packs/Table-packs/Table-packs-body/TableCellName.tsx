import React, { FC, useState } from 'react'

import { Box, Link, TableCell } from '@mui/material'
import { NavLink } from 'react-router-dom'

import defaultCover from '../../../../assets/img/defaultCover.jpg'
import { PATH } from '../../../../common'
import { CardsPack } from '../../table-api'
import {
  firstColumnSx,
  TableTdContainerSx,
  tableTdNameWrapSx,
  userLinkSx,
} from '../TablePacks.muiSx'

type PropsType = {
  labelId: string
  cardsPack: CardsPack
}
export const TableCellName: FC<PropsType> = ({ labelId, cardsPack }) => {
  const [isCoverBroken, setIsCoverBroken] = useState(false)

  const errorHandler = () => setIsCoverBroken(true)

  const deckCover = cardsPack.deckCover ? cardsPack.deckCover : defaultCover

  return (
    <TableCell id={labelId} sx={TableTdContainerSx}>
      <Box sx={firstColumnSx}>
        <img
          style={{ height: '36px', borderRadius: '2px', mixBlendMode: 'normal' }}
          src={isCoverBroken ? defaultCover : deckCover}
          onError={errorHandler}
          alt={'deck cover'}
        />
        <Link
          component={NavLink}
          to={`${PATH.PACKS}${PATH.CARDS}?cardsPackId=${cardsPack._id}`}
          sx={userLinkSx}
        >
          <Box sx={tableTdNameWrapSx}>{cardsPack.name}</Box>
        </Link>
      </Box>
    </TableCell>
  )
}
