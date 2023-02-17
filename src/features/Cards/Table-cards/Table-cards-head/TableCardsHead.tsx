import React from 'react'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { TableSortLabel, TableRow, TableHead, TableCell, Typography } from '@mui/material'

import { useTableCardsHead } from '../hooks/useTableCardsHead'

import { headCellSx, tableHeadSx } from './tableCardsHead.muiSx'

export const HeadersCards = () => {
  const { orderBy, order, requestSortHandler, setSortHandler, headCells } = useTableCardsHead()

  const headCellsLayout = headCells.map(headCell => (
    <TableCell
      key={headCell.id}
      sortDirection={orderBy === headCell.id ? order : false}
      onClick={() => requestSortHandler(headCell.id)}
    >
      <TableSortLabel
        active={orderBy === headCell.id}
        direction={orderBy === headCell.id ? order : 'asc'}
        onClick={() => setSortHandler(headCell.id)}
        IconComponent={ArrowDropDownIcon}
      >
        <Typography sx={headCellSx}>{headCell.label}</Typography>
      </TableSortLabel>
    </TableCell>
  ))

  return (
    <TableHead sx={tableHeadSx}>
      <TableRow>{headCellsLayout}</TableRow>
    </TableHead>
  )
}
