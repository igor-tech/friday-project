import React from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'

import { TableBodyPacks } from './Table-body/TableBodyPacks'
import { HeadersPack } from './Table-head/EnhancedTableHead'
import { paperPacksSx } from './TablePacks.muiSx'

export const TablePacks = () => {
  return (
    <Paper sx={paperPacksSx}>
      <TableContainer>
        <Table aria-labelledby="tableTitle">
          <HeadersPack />
          <TableBodyPacks />
        </Table>
      </TableContainer>
    </Paper>
  )
}
