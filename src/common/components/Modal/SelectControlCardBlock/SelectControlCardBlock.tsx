import React from 'react'

import { FormControl, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'

import { chooseQuestionTextSx, selectSx } from './selectControlCardBlock.muiSx'

interface PropsType {
  questionFormat: string
  setQuestionFormat: (questionFormat: string) => void
}
export const SelectControlCardBlock: React.FC<PropsType> = ({
  questionFormat,
  setQuestionFormat,
}) => {
  const setQuestionFormatHandler = (e: SelectChangeEvent) => {
    setQuestionFormat?.(e.target.value as string)
  }

  return (
    <FormControl fullWidth>
      <Typography component="p" sx={chooseQuestionTextSx}>
        Choose a question format
      </Typography>
      <Select
        size="small"
        id="simple-select"
        value={questionFormat}
        onChange={setQuestionFormatHandler}
        sx={selectSx}
      >
        <MenuItem value={'Text'}>Text</MenuItem>
        <MenuItem value={'Picture'}>Picture</MenuItem>
      </Select>
    </FormControl>
  )
}
