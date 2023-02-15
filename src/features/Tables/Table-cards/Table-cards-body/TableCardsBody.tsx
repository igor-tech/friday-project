import React from 'react'

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined'
import { Box, IconButton, Rating } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { btnIconBlack } from '../../Table-packs/TablePacks.muiSx'
import { btnIcon, grade } from '../Cards.muiSx'
import { useTableCardsBody } from '../hooks/useTableCardsBody'

export const TableCardsBody = () => {
  const { redactorData, updateCurrentCard, deleteCurrentCard, myProfileId, cards } =
    useTableCardsBody()

  return (
    <TableBody>
      {cards.map((row, index) => {
        const labelId = `enhanced-table-checkbox-${index}`
        const isMyPack = myProfileId === row.user_id

        return (
          <TableRow hover key={row._id}>
            <TableCell id={labelId} padding="normal">
              {row.question}
            </TableCell>

            <TableCell align="left">{row.answer}</TableCell>
            <TableCell align="left">{redactorData(row.updated)}</TableCell>
            <TableCell align="left" sx={grade}>
              <Rating name="read-only" value={row.grade} readOnly />
              {isMyPack && (
                <Box sx={btnIcon}>
                  <IconButton
                    onClick={() => updateCurrentCard(row._id)}
                    disabled={false}
                    sx={btnIconBlack}
                  >
                    <DriveFileRenameOutlineOutlinedIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => deleteCurrentCard(row._id)}
                    disabled={false}
                    sx={btnIconBlack}
                  >
                    <DeleteOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </TableCell>
          </TableRow>
        )
      })}
    </TableBody>
  )
}
