import React, { ChangeEvent, useEffect, useState } from 'react'

import { IconButton, InputBase, Paper, Typography } from '@mui/material'
import Box from '@mui/material/Box/Box'

import Search from '../../../../../assets/img/Search.png'
import { useAppDispatch, useAppSelector } from '../../../../../common'
import useDebounce from '../../../../../common/hooks/useDebounce'
import { packsSelector } from '../../../../../common/selectors/filter-selectors'
import { userIdSelector } from '../../../../../common/selectors/packs-selectors'
import { getNameFilterAC } from '../../filter-slice'

import {
  iconBlockSx,
  inputSx,
  paperBlockSx,
  searchBlockSx,
  searchContainerSx,
} from './Search.muiSx'

export const SearchFilter = () => {
  const dispatch = useAppDispatch()

  const packs = useAppSelector(packsSelector)
  const userId = useAppSelector(userIdSelector)

  const [inputValue, setInputValue] = useState('')
  const debouncedValue = useDebounce(inputValue, 750)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.currentTarget.value)
  }

  useEffect(() => {
    dispatch(getNameFilterAC({ packName: debouncedValue }))
  }, [debouncedValue])

  console.log(debouncedValue)

  return (
    <Box sx={searchContainerSx}>
      <Box>
        <Typography component="p">Show packs cards</Typography>
      </Box>
      <Box sx={searchBlockSx}>
        <Paper sx={paperBlockSx}>
          <IconButton sx={iconBlockSx} aria-label="icon search">
            <Typography component="img" src={Search} />
          </IconButton>
          <InputBase
            sx={inputSx}
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            onChange={onChangeHandler}
          />
        </Paper>
      </Box>
    </Box>
  )
}
