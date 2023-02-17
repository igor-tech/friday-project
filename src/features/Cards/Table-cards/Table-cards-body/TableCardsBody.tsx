import React from 'react'

import { DriveFileRenameOutlineOutlined, DeleteOutlined } from '@mui/icons-material'
import { TableRow, TableCell, TableBody, Box, IconButton, Rating } from '@mui/material'

import { useTableCardsBody } from '../hooks/useTableCardsBody'

import { btnIcon, btnIconBlack, grade } from './tableCardsBody.muiSx'

import { redactorDataTime } from 'common'

export const TableCardsBody = () => {
  const { updateCurrentCard, deleteCurrentCard, myProfileId, cards } = useTableCardsBody()

  const cardsLayout = cards.map((cards, index) => {
    const labelId = `enhanced-table-checkbox-${index}`
    const isMyPack = myProfileId === cards.user_id

    return (
      <TableRow hover key={cards._id}>
        <TableCell id={labelId} padding="normal">
          {cards.question}
        </TableCell>

        <TableCell align="left">{cards.answer}</TableCell>
        <TableCell align="left">{redactorDataTime(cards.updated)}</TableCell>
        <TableCell align="left" sx={grade}>
          <Rating name="read-only" value={cards.grade} readOnly />
          {isMyPack && (
            <Box sx={btnIcon}>
              <IconButton
                onClick={() => updateCurrentCard(cards._id)}
                disabled={false}
                sx={btnIconBlack}
              >
                <DriveFileRenameOutlineOutlined />
              </IconButton>
              <IconButton
                onClick={() => deleteCurrentCard(cards._id)}
                disabled={false}
                sx={btnIconBlack}
              >
                <DeleteOutlined />
              </IconButton>
            </Box>
          )}
        </TableCell>
      </TableRow>
    )
  })

  return <TableBody>{cardsLayout}</TableBody>
}
