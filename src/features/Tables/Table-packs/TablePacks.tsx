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

import { PATH, useAppSelector } from '../../../common'
import { cardPacksSelector } from '../../../common/selectors/packs-selectors'
import { CardsPack } from '../table-api'

import { actionsIcon, userLink } from './TablePacks.muiSx'

type Data = CardsPack & {
  columnName: string
  cards: number
  lastUpdate: string
  createBy: string
  actions: { learn: string; edit: string; delete: string }
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }

  return 0
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
//   const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
//
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0])
//
//     if (order !== 0) {
//       return order
//     }
//
//     return a[1] - b[1]
//   })
//
//   return stabilizedThis.map(el => el[0])
// }

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
  {
    id: 'actions',
    label: 'Actions',
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
  const cardsPack = useAppSelector(cardPacksSelector)

  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof Data>('lastUpdate')

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc'

    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  return (
    <Paper sx={{ width: 1008, margin: '0 auto' }}>
      <TableContainer>
        <Table aria-labelledby="tableTitle">
          <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
          <TableBody>
            {/*{stableSort(cardsPack, getComparator(order, orderBy))*/}
            {cardsPack.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`

              return (
                <TableRow hover key={row._id}>
                  <TableCell id={labelId} padding="normal">
                    <Link component={NavLink} to={PATH.PACKS} sx={userLink}>
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
                    <SvgIcon onClick={() => alert('edit')}>
                      <DriveFileRenameOutlineOutlinedIcon />
                    </SvgIcon>
                    <SvgIcon onClick={() => alert('delete')}>
                      <DeleteOutlinedIcon />
                    </SvgIcon>
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
