import React from 'react'

import { DriveFileRenameOutlineOutlined, DeleteOutlined } from '@mui/icons-material'
import { TableRow, TableCell, TableBody, Box, IconButton, Rating, Tooltip } from '@mui/material'

import { useTableCardsBody } from '../hooks/useTableCardsBody'

import { btnIcon, btnIconBlack, grade } from './tableCardsBody.muiSx'

import { MODAL_TYPE, redactorDataTime } from 'common'

export const TableCardsBody = () => {
  const { updateCurrentCardHandler, deleteCurrentCardHandler, myProfileId, cards, statusLoad } =
    useTableCardsBody()

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
              <Tooltip title="edit card" placement="top" arrow>
                <IconButton
                  onClick={() =>
                    updateCurrentCardHandler(
                      cards._id,
                      cards.question,
                      cards.answer,
                      MODAL_TYPE.editCurrentCard
                    )
                  }
                  disabled={statusLoad === 'loading'}
                  sx={btnIconBlack}
                >
                  <DriveFileRenameOutlineOutlined />
                </IconButton>
              </Tooltip>

              <Tooltip title="edit card" placement="top" arrow>
                <IconButton
                  onClick={() =>
                    deleteCurrentCardHandler(
                      cards._id,
                      cards.question,
                      MODAL_TYPE.deleteCurrentCard
                    )
                  }
                  disabled={statusLoad === 'loading'}
                  sx={btnIconBlack}
                >
                  <DeleteOutlined />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </TableCell>
      </TableRow>
    )
  })

  return <TableBody>{cardsLayout}</TableBody>
}
