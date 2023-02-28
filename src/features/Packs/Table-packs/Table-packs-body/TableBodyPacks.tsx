import React from 'react'

import { DeleteOutlined, DriveFileRenameOutlineOutlined, SchoolOutlined } from '@mui/icons-material'
import { IconButton, TableBody, TableCell, TableRow, Tooltip } from '@mui/material'

import { MODAL_TYPE, redactorDataTime } from '../../../../common'
import { btnIconBlack } from '../../../Cards/Table-cards/Table-cards-body/tableCardsBody.muiSx'
import { useTablePacksBody } from '../hooks/useTablePacksBody'
import { actionsIconSx, btnIconBlackSx } from '../TablePacks.muiSx'

import { TableCellName } from './TableCellName'

export const TableBodyPacks = () => {
  const {
    cardsPack,
    updateCurrentPackHandler,
    deleteCurrentPack,
    myProfileId,
    statusLoad,
    learnPack,
  } = useTablePacksBody()

  const cardsPackLayout = cardsPack?.map((cardsPack, index) => {
    const labelId = `enhanced-table-checkbox-${index}`
    const isMyPack = myProfileId === cardsPack.user_id

    return (
      <TableRow hover key={cardsPack._id}>
        <TableCellName cardsPack={cardsPack} labelId={labelId} />
        <TableCell align="left">{cardsPack.cardsCount}</TableCell>
        <TableCell align="left">{redactorDataTime(cardsPack.updated)}</TableCell>
        <TableCell align="left">{cardsPack.user_name}</TableCell>
        <TableCell align="left" sx={actionsIconSx}>
          <Tooltip arrow placement="top" title="learn pack">
            <span>
              <IconButton
                disabled={cardsPack.cardsCount === 0 || statusLoad === 'loading'}
                onClick={() => learnPack(cardsPack._id)}
                sx={btnIconBlackSx}
              >
                <SchoolOutlined />
              </IconButton>
            </span>
          </Tooltip>

          {isMyPack && (
            <>
              <Tooltip arrow placement="top" title="edit pack">
                <span>
                  <IconButton
                    onClick={() =>
                      updateCurrentPackHandler(
                        cardsPack._id,
                        cardsPack.name,
                        cardsPack.private,
                        MODAL_TYPE.editCurrentPack,
                        cardsPack.deckCover
                      )
                    }
                    disabled={statusLoad === 'loading'}
                    sx={btnIconBlack}
                  >
                    <DriveFileRenameOutlineOutlined />
                  </IconButton>
                </span>
              </Tooltip>

              <Tooltip arrow placement="top" title="delete pack">
                <span>
                  <IconButton
                    onClick={() =>
                      deleteCurrentPack(cardsPack._id, cardsPack.name, MODAL_TYPE.deleteCurrentPack)
                    }
                    disabled={statusLoad === 'loading'}
                    sx={btnIconBlack}
                  >
                    <DeleteOutlined />
                  </IconButton>
                </span>
              </Tooltip>
            </>
          )}
        </TableCell>
      </TableRow>
    )
  })

  return <TableBody>{cardsPackLayout}</TableBody>
}
