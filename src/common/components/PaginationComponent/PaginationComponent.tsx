import React, { ChangeEvent } from 'react'

import { Box, Pagination, Typography } from '@mui/material'

import { setPaginationValue } from '../../../features/Tables/table-slice'
import { SuperSelect, useAppDispatch } from '../../index'

import {
  paginatorBlockSx,
  paginatorContainerSx,
  paginatorTitleSx,
  selectorBlockSx,
} from './PaginatorComponent.muiSx'

type propsType = {
  page: number
  pageCount: number
  totalCount: number
  changePageCallback: (page: number, pageCount: number) => void
}

export const PaginationComponent = (props: propsType) => {
  const dispatch = useAppDispatch()

  const count = Math.ceil(props.totalCount / props.pageCount)

  const changePageHandler = (e: ChangeEvent<unknown>, page: number) => {
    props.changePageCallback(page, props.pageCount)
  }

  const changePageCountHandler = (pageCount: number) => {
    props.changePageCallback(props.page, pageCount)
  }

  return (
    <Box sx={paginatorContainerSx}>
      <Box sx={paginatorBlockSx}>
        <Pagination count={count} shape="rounded" page={props.page} onChange={changePageHandler} />
        <Typography component="span" sx={paginatorTitleSx}>
          Show
        </Typography>
      </Box>
      <Box sx={selectorBlockSx}>
        <SuperSelect
          value={props.pageCount}
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
