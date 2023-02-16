import React, { ChangeEvent, useEffect, useState } from 'react'

import { IconButton, InputBase, Paper, Typography } from '@mui/material'
import Box from '@mui/material/Box/Box'

import Search from '../../../../assets/img/Search.png'
import { useAppDispatch } from '../../../../common'
import useDebounce from '../../../../common/hooks/useDebounce'
import { setCardQuestion } from '../cards-slice'

import {
  iconBlockSx,
  inputSx,
  paperBlockSx,
  searchBlockSx,
  searchContainerSx,
} from './SearchCard.muiSx'

type propsType = {
  searchValue: string
}

export const SearchCardComponent = (props: propsType) => {
  const [inputValue, setInputValue] = useState(props.searchValue)

  const dispatch = useAppDispatch()

  const debouncedValue = useDebounce(inputValue, 750)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.currentTarget.value)
  }

  useEffect(() => {
    dispatch(setCardQuestion(debouncedValue))
  }, [debouncedValue])

  return (
    <Box sx={searchContainerSx}>
      <Box>
        <Typography sx={{ fontWeight: '700' }} component="p">
          Search
        </Typography>
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
            value={inputValue}
          />
        </Paper>
      </Box>
    </Box>
  )
}
