import React from 'react'

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import { IconButton, Link } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { NavLink } from 'react-router-dom'

import { PATH, redactorDataTime } from '../../../../common'
import { useTablePacksBody } from '../hooks/useTablePacksBody'
import { actionsIcon, btnIconBlack, userLink } from '../TablePacks.muiSx'

export const TableBodyPacks = () => {
  const { cardsPack, updateCurrentPack, deleteCurrentPack, myProfileId } = useTablePacksBody()

  return (
    <TableBody>
      {cardsPack.map((row, index) => {
        const labelId = `enhanced-table-checkbox-${index}`
        const isMyPack = myProfileId === row.user_id

        return (
          <TableRow hover key={row._id}>
            <TableCell id={labelId} padding="normal">
              <Link
                component={NavLink}
                to={PATH.PACKS + PATH.CARDS + '?cardsPackId=' + row._id}
                sx={userLink}
              >
                {row.name}
              </Link>
            </TableCell>

            <TableCell align="left">{row.cardsCount}</TableCell>
            <TableCell align="left">{redactorDataTime(row.updated)}</TableCell>
            <TableCell align="left">{row.user_name}</TableCell>
            <TableCell align="left" sx={actionsIcon}>
              <IconButton
                disabled={row.cardsCount === 0}
                onClick={() => alert('learn')}
                sx={btnIconBlack}
              >
                <SchoolOutlinedIcon />
              </IconButton>

              {isMyPack && (
                <>
                  <IconButton
                    onClick={() => updateCurrentPack(row._id)}
                    disabled={false}
                    sx={btnIconBlack}
                  >
                    <DriveFileRenameOutlineOutlinedIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => deleteCurrentPack(row._id)}
                    disabled={false}
                    sx={btnIconBlack}
                  >
                    <DeleteOutlinedIcon />
                  </IconButton>
                </>
              )}
            </TableCell>
          </TableRow>
        )
      })}
    </TableBody>
  )
}
