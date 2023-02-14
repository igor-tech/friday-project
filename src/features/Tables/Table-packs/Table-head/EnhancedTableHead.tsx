import React from 'react'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'

import { useAppDispatch } from '../../../../common'
import { setSortPacks } from '../../table-slice'
import { headCellSx } from '../TablePacks.muiSx'

export type TitlePacksType = {
  name: string
  cardsCount: number
  updated: string
  created: string
}
export type OrderSortType = 'asc' | 'desc'
type HeadCell = {
  id: keyof TitlePacksType
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
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof TitlePacksType) => void
  order: OrderSortType
  orderBy: string
}
export const HeadersPack = (props: EnhancedTableProps) => {
  const dispatch = useAppDispatch()
  const { order, orderBy, onRequestSort } = props
  const createSortHandler =
    (property: keyof TitlePacksType) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  const onChangeCallback = (id: string) => {
    dispatch(setSortPacks((order === 'asc' && orderBy === id ? '0' : '1') + id))
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
