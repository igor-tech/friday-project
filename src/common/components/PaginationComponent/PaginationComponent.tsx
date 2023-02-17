import React, { ChangeEvent } from 'react'

import { Box, Pagination, Typography } from '@mui/material'

import { appStatusSelector, SuperSelect, useAppSelector } from '../../index'

import {
  paginatorBlockSx,
  paginatorContainerSx,
  paginatorTitleSx,
  selectorBlockSx,
} from './PaginatorComponent.muiSx'

type PaginationComponentType = {
  page: number
  pageCount: number
  totalCount: number
  changePageCallback: (page: number, pageCount: number) => void
}

export const PaginationComponent: React.FC<PaginationComponentType> = ({
  page,
  pageCount,
  totalCount,
  changePageCallback,
}) => {
  const statusLoad = useAppSelector(appStatusSelector)
  const count = Math.ceil(totalCount / pageCount)

  const changePageHandler = (e: ChangeEvent<unknown>, page: number) => {
    changePageCallback(page, pageCount)
  }

  const changePageCountHandler = (pageCount: number) => {
    changePageCallback(page, pageCount)
  }

  return (
    <Box sx={paginatorContainerSx}>
      <Box sx={paginatorBlockSx}>
        <Pagination
          count={count}
          shape="rounded"
          page={page}
          onChange={changePageHandler}
          disabled={statusLoad === 'loading'}
        />
        <Typography component="span" sx={paginatorTitleSx}>
          Show
        </Typography>
      </Box>
      <Box sx={selectorBlockSx}>
        <SuperSelect
          value={pageCount}
          onChangeOption={changePageCountHandler}
          disabled={statusLoad === 'loading'}
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
