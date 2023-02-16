import React, { ChangeEvent } from 'react'

import { Box, Pagination, Typography } from '@mui/material'

import { SuperSelect, useAppDispatch, useAppSelector } from '../../../common'
import { setPaginationValue } from '../table-slice'

import {
  paginatorBlockSx,
  paginatorContainerSx,
  paginatorTitleSx,
  selectorBlockSx,
  superSelectSx,
} from './Paginator.muiSx'

export const PaginationComponent = () => {
  const dispatch = useAppDispatch()

  const { page, pageCount, cardPacksTotalCount } = useAppSelector(state => state.packs)

  const count = Math.ceil(cardPacksTotalCount / pageCount)

  const changePageHandler = (e: ChangeEvent<unknown>, page: number) => {
    dispatch(setPaginationValue({ page: page, pageCount: pageCount }))
  }

  const changePageCountHandler = (pageCount: number) => {
    dispatch(setPaginationValue({ page: page, pageCount: pageCount }))
  }

  return (
    <Box sx={paginatorContainerSx}>
      <Box sx={paginatorBlockSx}>
        <Pagination count={count} shape="rounded" page={page} onChange={changePageHandler} />
        <Typography component="span" sx={paginatorTitleSx}>
          Show
        </Typography>
      </Box>
      <Box sx={selectorBlockSx}>
        <SuperSelect
          value={pageCount}
          onChangeOption={changePageCountHandler}
          options={[
            { id: 4, value: 4 },
            { id: 7, value: 7 },
            { id: 10, value: 10 },
          ]}
        />
        <Typography component="span" sx={paginatorTitleSx}>
          Cards per Page
        </Typography>
      </Box>
    </Box>
  )
}
