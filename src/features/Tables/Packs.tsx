import React, { useEffect } from 'react'

import { Box, Typography } from '@mui/material'

import { GeneralButton, useAppDispatch, useAppSelector } from '../../common'

import { Filter } from './Filter/Filter'
import { addNewPackBtnSx, addPackContainerSx, packsContainerSx, packTitleSx } from './Packs.muiSx'
import { TablePacks } from './Table-packs/TablePacks'
import { createNewPack, getPacks } from './table-slice'

const Packs = () => {
  const dispatch = useAppDispatch()
  const packsQueryParams = useAppSelector(state => state.packs.packsQueryParams)

  const addNewPack = () => {
    const dataParams = {
      name: `New Pack Name`,
      deckCover: '',
      private: false,
    }

    dispatch(createNewPack(dataParams))
  }

  useEffect(() => {
    dispatch(getPacks())
  }, [packsQueryParams])

  return (
    <Box sx={packsContainerSx}>
      <Box sx={addPackContainerSx}>
        <Typography component="h1" sx={packTitleSx}>
          Pack List
        </Typography>
        <GeneralButton name="Add new pack" sx={addNewPackBtnSx} onClick={addNewPack} />
      </Box>
      <Box>
        <Filter />
      </Box>

      <TablePacks />

      {/*<TableCards />*/}
    </Box>
  )
}

export default Packs
