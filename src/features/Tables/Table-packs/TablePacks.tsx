import React, { useState } from 'react'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import { Link, SvgIcon } from '@mui/material'
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
import { CardsPack } from '../table-api'
import { deletePack, updatePack } from '../table-slice'

import { actionsIcon, userLink } from './TablePacks.muiSx'

type Data = CardsPack & {
  columnName: string
  cards: number
  lastUpdate: string
  createBy: string
  actions: { learn: string; edit: string; delete: string }
}

type Order = 'asc' | 'desc'
type HeadCell = {
  id: keyof Data
  label: string
}
const headCells: HeadCell[] = [
  {
    id: 'columnName',
    label: 'Name',
  },
  {
    id: 'cards',
    label: 'Cards',
  },
  {
    id: 'lastUpdate',
    label: 'Last Updated',
  },
  {
    id: 'createBy',
    label: 'Created by',
  },
]

type EnhancedTableProps = {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void
  order: Order //asc decs
  orderBy: string // id headCells
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead sx={{ background: '#EFEFEF' }}>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              IconComponent={ArrowDropDownIcon}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export const TablePacks = () => {
  const dispatch = useAppDispatch()
  const cardsPack = useAppSelector(cardPacksSelector)
  const myProfileId = useAppSelector(userIdSelector)
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof Data>('lastUpdate')

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    console.log(property)
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
    <Paper sx={{ width: '100%' }}>
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
                    {new Intl.DateTimeFormat().format(new Date('2023-02-09T17:34:05.493Z'))}
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
