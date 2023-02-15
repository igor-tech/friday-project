import React from 'react'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { Typography } from '@mui/material'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'

import { headCellSx, tableHeadSx } from '../../Table-packs/TablePacks.muiSx'
import { useTableCardsHead } from '../hooks/useTableCardsHead'

export const HeadersCards = () => {
  const { orderBy, order, requestSortHandler, setSortHandler, headCells } = useTableCardsHead()

  return (
    <TableHead sx={tableHeadSx}>
      <TableRow>
        {headCells.map(headCell => (
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
        ))}
      </TableRow>
    </TableHead>
  )
}
