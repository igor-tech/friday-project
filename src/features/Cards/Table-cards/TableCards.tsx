import React from 'react'

import { Table } from '@mui/material'

import { TableCardsBody } from './Table-cards-body/TableCardsBody'
import { HeadersCards } from './Table-cards-head/TableCardsHead'

export const TableCards = () => {
  return (
    <>
      <Table aria-labelledby="tableTitle">
        <HeadersCards />
        <TableCardsBody />
      </Table>
    </>
  )
}
