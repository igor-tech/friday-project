import React from 'react'

import { DeleteOutlined, DriveFileRenameOutlineOutlined } from '@mui/icons-material'
import {
  Avatar,
  Box,
  IconButton,
  Rating,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
} from '@mui/material'

import { useTableCardsBody } from '../hooks/useTableCardsBody'

import { btnIcon, btnIconBlack } from './tableCardsBody.muiSx'

import { MODAL_TYPE, redactorDataTime } from 'common'

export const TableCardsBody = () => {
  const { updateCurrentCardHandler, deleteCurrentCardHandler, myProfileId, cards, statusLoad } =
    useTableCardsBody()

  const cardsLayout = cards.map((cards, index) => {
    const labelId = `enhanced-table-checkbox-${index}`
    const isMyPack = myProfileId === cards.user_id
    const question =
      cards.questionImg && cards.questionImg !== '' ? (
        <Avatar src={cards.questionImg} alt="question" variant="square" />
      ) : (
        cards.question
      )
    const answer =
      cards.answerImg && cards.answerImg !== '' ? (
        <Avatar src={cards.answerImg} alt="answer" variant="square" />
      ) : (
        cards.answer
      )

    return (
      <TableRow hover key={cards._id}>
        <TableCell id={labelId} sx={{ wordBreak: 'break-all' }}>
          {question}
        </TableCell>

        <TableCell align="left" sx={{ wordBreak: 'break-all' }}>
          {answer}
        </TableCell>
        <TableCell align="left">{redactorDataTime(cards.updated)}</TableCell>
        <TableCell align="left">
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
                      cards.answerImg,
                      cards.questionImg,
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
