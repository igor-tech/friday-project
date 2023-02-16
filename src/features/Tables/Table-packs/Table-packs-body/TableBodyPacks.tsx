import React from 'react'

import { DeleteOutlined, DriveFileRenameOutlineOutlined, SchoolOutlined } from '@mui/icons-material'
import { IconButton, Link, TableBody, TableCell, TableRow } from '@mui/material'
import { NavLink } from 'react-router-dom'

import { useTablePacksBody } from '../hooks/useTablePacksBody'
import { actionsIcon, btnIconBlack, userLink } from '../TablePacks.muiSx'

import { PATH, redactorDataTime } from 'common'

export const TableBodyPacks = () => {
  const { cardsPack, updateCurrentPack, deleteCurrentPack, myProfileId } = useTablePacksBody()

  const cardsPackLayout = cardsPack?.map((cardsPack, index) => {
    const labelId = `enhanced-table-checkbox-${index}`
    const isMyPack = myProfileId === cardsPack.user_id

    return (
      <TableRow hover key={cardsPack._id}>
        <TableCell id={labelId} padding="normal">
          <Link
            component={NavLink}
            to={`${PATH.PACKS}${PATH.CARDS}?cardsPackId=${cardsPack._id}`}
            sx={userLink}
          >
            {cardsPack.name}
          </Link>
        </TableCell>

        <TableCell align="left">{cardsPack.cardsCount}</TableCell>
        <TableCell align="left">{redactorDataTime(cardsPack.updated)}</TableCell>
        <TableCell align="left">{cardsPack.user_name}</TableCell>
        <TableCell align="left" sx={actionsIcon}>
          <IconButton
            disabled={cardsPack.cardsCount === 0}
            onClick={() => alert('learn')}
            sx={btnIconBlack}
          >
            <DeleteOutlined />
          </IconButton>

          {isMyPack && (
            <>
              <IconButton
                onClick={() => updateCurrentPack(cardsPack._id)}
                disabled={false}
                sx={btnIconBlack}
              >
                <DriveFileRenameOutlineOutlined />
              </IconButton>
              <IconButton
                onClick={() => deleteCurrentPack(cardsPack._id)}
                disabled={false}
                sx={btnIconBlack}
              >
                <SchoolOutlined />
              </IconButton>
            </>
          )}
        </TableCell>
      </TableRow>
    )
  })

  return <TableBody>{cardsPackLayout}</TableBody>
}
