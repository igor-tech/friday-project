import React from 'react'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { Typography, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'

import { useTablePacksHead } from '../hooks/useTablePacksHead'
import { headCellSx, tableHeadSx } from '../TablePacks.muiSx'

export const HeadersPack = () => {
  const { orderBy, order, requestSortHandler, setSortHandler, headCells } = useTablePacksHead()

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
      <TableRow>
        {headCellsLayout}
        <TableCell sx={headCellSx}>Actions</TableCell>
      </TableRow>
    </TableHead>
  )
}
