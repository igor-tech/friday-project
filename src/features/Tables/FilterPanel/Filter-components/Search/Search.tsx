import React, { ChangeEvent, useEffect, useState } from 'react'

import { IconButton, InputBase, Paper, Typography } from '@mui/material'
import Box from '@mui/material/Box/Box'

import Search from '../../../../../assets/img/Search.png'
import useDebounce from '../../../../../common/hooks/useDebounce'

import {
  iconBlockSx,
  inputSx,
  paperBlockSx,
  searchBlockSx,
  searchContainerSx,
} from './SearchMax.muiSx'

type propsType = {
  searchValue: string
  setSearchCallback: (packName: string) => void
  style: {
    iconBlockSx: {}
    inputSx: {}
    paperBlockSx: {}
    searchBlockSx: {}
    searchContainerSx: {}
  }
}

export const SearchFilterComponent = (props: propsType) => {
  const [inputValue, setInputValue] = useState(props.searchValue)

  const debouncedValue = useDebounce(inputValue, 750)

  const { iconBlockSx, inputSx, paperBlockSx, searchBlockSx, searchContainerSx } = props.style

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.currentTarget.value)
  }

  useEffect(() => {
    props.setSearchCallback(debouncedValue)
  }, [debouncedValue])

  useEffect(() => {
    setInputValue(props.searchValue)
  }, [props.searchValue])

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
