import React, { useState } from 'react'

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import { IconButton, Link } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import { NavLink } from 'react-router-dom'

import { PATH, useAppDispatch, useAppSelector, userIdSelector } from '../../../common'
import { cardPacksSelector } from '../../../common/selectors/packs-selectors'
import { deletePack, updatePack } from '../table-slice'

import { HeadersPack, OrderSortType, TitlePacksType } from './Table-head/EnhancedTableHead'
import { actionsIcon, btnIconBlack, paperPacksSx, userLink } from './TablePacks.muiSx'

export const TablePacks = () => {
  const dispatch = useAppDispatch()
  const cardsPack = useAppSelector(cardPacksSelector)
  const [order, setOrder] = useState<OrderSortType>('desc')
  const [orderBy, setOrderBy] = useState<keyof TitlePacksType>('updated')
  const myProfileId = useAppSelector(userIdSelector)

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof TitlePacksType) => {
    const isAsc = orderBy === property && order === 'asc'

    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const deleteCurrentPack = (idPack: string) => {
    dispatch(deletePack(idPack))
  }
  const updateCurrentPack = (idPack: string) => {
    const updateCurrentPack = {
      _id: idPack,
      name: 'Name Update',
    }

    dispatch(updatePack(updateCurrentPack))
  }
  const redactorData = (data: string) => {
    return data
      .slice(0, -14)
      .replace(/(\d+).(\d+).(\d+)/, '$3-$2-$1')
      .replace(/-/g, '.')
  }

  return (
    <Paper sx={paperPacksSx}>
      <TableContainer>
        <Table aria-labelledby="tableTitle">
          <HeadersPack order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
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
                  <TableCell align="left">{redactorData(row.updated)}</TableCell>
                  <TableCell align="left">{row.user_name}</TableCell>
                  <TableCell align="left" sx={actionsIcon}>
                    <IconButton disabled={false} onClick={() => alert('learn')} sx={btnIconBlack}>
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
        </Table>
      </TableContainer>
    </Paper>
  )
}
