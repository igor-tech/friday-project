import React from 'react'

import { DeleteOutlined, DriveFileRenameOutlineOutlined, SchoolOutlined } from '@mui/icons-material'
import { IconButton, Link, TableBody, TableCell, TableRow } from '@mui/material'
import { NavLink } from 'react-router-dom'

import { btnIconBlack } from '../../../Cards/Table-cards/Table-cards-body/tableCardsBody.muiSx'
import { useTablePacksBody } from '../hooks/useTablePacksBody'
import { actionsIconSx, btnIconBlackSx, userLinkSx } from '../TablePacks.muiSx'

import { MODAL_TYPE, PATH, redactorDataTime } from 'common'

export const TableBodyPacks = () => {
  const { cardsPack, deleteCurrentPack, myProfileId, statusLoad, updateCurrentPackHandler } =
    useTablePacksBody()

  const cardsPackLayout = cardsPack?.map((cardsPack, index) => {
    const labelId = `enhanced-table-checkbox-${index}`
    const isMyPack = myProfileId === cardsPack.user_id

    return (
      <TableRow hover key={cardsPack._id}>
        <TableCell id={labelId} padding="normal">
          <Link
            component={NavLink}
            to={`${PATH.PACKS}${PATH.CARDS}?cardsPackId=${cardsPack._id}`}
            sx={userLinkSx}
          >
            {cardsPack.name}
          </Link>
        </TableCell>

        <TableCell align="left">{cardsPack.cardsCount}</TableCell>
        <TableCell align="left">{redactorDataTime(cardsPack.updated)}</TableCell>
        <TableCell align="left">{cardsPack.user_name}</TableCell>
        <TableCell align="left" sx={actionsIconSx}>
          <IconButton
            disabled={cardsPack.cardsCount === 0 || statusLoad === 'loading'}
            onClick={() => alert('learn')}
            sx={btnIconBlackSx}
          >
            <SchoolOutlined />
          </IconButton>

          {isMyPack && (
            <>
              <IconButton
                onClick={() =>
                  updateCurrentPackHandler(
                    cardsPack._id,
                    cardsPack.name,
                    cardsPack.private,
                    MODAL_TYPE.editCurrentPack
                  )
                }
                disabled={statusLoad === 'loading'}
                sx={btnIconBlack}
              >
                <DriveFileRenameOutlineOutlined />
              </IconButton>
              <IconButton
                onClick={() =>
                  deleteCurrentPack(cardsPack._id, cardsPack.name, MODAL_TYPE.deleteCurrentPack)
                }
                disabled={statusLoad === 'loading'}
                sx={btnIconBlack}
              >
                <DeleteOutlined />
              </IconButton>
            </>
          )}
        </TableCell>
      </TableRow>
    )
  })

  return <TableBody>{cardsPackLayout}</TableBody>
}
