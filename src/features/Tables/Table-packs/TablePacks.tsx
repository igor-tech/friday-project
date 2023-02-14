import React, { useState } from 'react'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import { Link, SvgIcon, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'
import { NavLink } from 'react-router-dom'

import { PATH, useAppDispatch, useAppSelector, userIdSelector } from '../../../common'
import { cardPacksSelector } from '../../../common/selectors/packs-selectors'
import { deletePack, updatePack } from '../table-slice'

import { actionsIcon, headCellSx, paperPacksSx, userLink } from './TablePacks.muiSx'

type Data = {
  name: string
  cardsCount: number
  updated: string
  created: string
}

type Order = 'asc' | 'desc'
type HeadCell = {
  id: keyof Data
  label: string
}
const headCells: HeadCell[] = [
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'cardsCount',
    label: 'Cards',
  },
  {
    id: 'updated',
    label: 'Last Updated',
  },
  {
    id: 'created',
    label: 'Created by',
  },
]

type EnhancedTableProps = {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void
  order: Order
  orderBy: string
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  const onChangeCallback = (id: string) => {
    // onChangeSort((order === 'asc' && orderBy === id ? '0' : '1') + id)
  }

  return (
    <TableHead sx={{ background: '#EFEFEF' }}>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            onClick={() => onChangeCallback(headCell.id)}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              IconComponent={ArrowDropDownIcon}
            >
              <Typography sx={headCellSx}>{headCell.label}</Typography>

              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell sx={headCellSx}>Actions</TableCell>
      </TableRow>
    </TableHead>
  )
}

export const TablePacks = () => {
  const dispatch = useAppDispatch()
  const cardsPack = useAppSelector(cardPacksSelector)
  const [order, setOrder] = useState<Order>('desc')
  const [orderBy, setOrderBy] = useState<keyof Data>('updated')
  const myProfileId = useAppSelector(userIdSelector)

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
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

  return (
    <Paper sx={paperPacksSx}>
      <TableContainer>
        <Table aria-labelledby="tableTitle">
          <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
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
                  <TableCell align="left">
                    {row.updated
                      .toString()
                      .slice(0, -14)
                      .replace(/(\d+).(\d+).(\d+)/, '$3-$2-$1')
                      .replace(/-/g, '.')}
                  </TableCell>
                  <TableCell align="left">{row.user_name}</TableCell>
                  <TableCell align="left" sx={actionsIcon}>
                    <SvgIcon onClick={() => alert('learn')}>
                      <SchoolOutlinedIcon />
                    </SvgIcon>

                    {isMyPack && (
                      <>
                        <SvgIcon onClick={() => updateCurrentPack(row._id)}>
                          <DriveFileRenameOutlineOutlinedIcon />
                        </SvgIcon>
                        <SvgIcon onClick={() => deleteCurrentPack(row._id)}>
                          <DeleteOutlinedIcon />
                        </SvgIcon>
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
