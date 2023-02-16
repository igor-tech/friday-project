import React from 'react'

import { Table } from '@mui/material'

import { TableBodyPacks } from './Table-packs-body/TableBodyPacks'
import { HeadersPack } from './Table-packs-head/EnhancedTableHead'

export const TablePacks = () => {
  return (
    <Table aria-labelledby="tableTitle">
      <HeadersPack />
      <TableBodyPacks />
    </Table>
  )
}
