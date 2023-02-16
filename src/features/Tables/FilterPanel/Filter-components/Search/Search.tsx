import React, { ChangeEvent, useEffect, useState } from 'react'

import { IconButton, InputBase, Paper, Typography, Box } from '@mui/material'

import Search from '../../../../../assets/img/Search.png'

import { useDebounce } from 'common'

type SearchFilterComponentType = {
  searchValue: string
  setSearchCallback: (packName: string) => void
  style: any
}

export const SearchFilterComponent: React.FC<SearchFilterComponentType> = ({
  searchValue,
  setSearchCallback,
  style,
}) => {
  const [inputValue, setInputValue] = useState(searchValue)

  const debouncedValue = useDebounce(inputValue, 750)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.currentTarget.value)
  }

  useEffect(() => {
    setSearchCallback(debouncedValue)
  }, [debouncedValue])

  useEffect(() => {
    setInputValue(searchValue)
  }, [searchValue])

  return (
    <Box sx={style.searchContainerSx}>
      <Box>
        <Typography sx={{ fontWeight: '700' }} component="p">
          Search
        </Typography>
      </Box>
      <Box sx={style.searchBlockSx}>
        <Paper sx={style.paperBlockSx}>
          <IconButton sx={style.iconBlockSx} aria-label="icon search">
            <Typography component="img" src={Search} />
          </IconButton>
          <InputBase
            sx={style.inputSx}
            placeholder="Provide your text…"
            inputProps={{ 'aria-label': 'search' }}
            onChange={onChangeHandler}
            value={inputValue}
          />
        </Paper>
      </Box>
    </Box>
  )
}
