import React, { ChangeEvent, useState } from 'react'

import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material'

import { createNewCard } from '../../cards-slice'

import {
  addNewCardBtnContainerSx,
  addNewCardContainerSx,
  cancelBtn,
  chooseQuestionTextSx,
  saveBtn,
  selectSx,
  textFieldSx,
} from './addNewCardModal.muiSx'

import { GeneralButton, useAppDispatch } from 'common'

export const AddNewCardModal: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const dispatch = useAppDispatch()
  const [questionFormat, setQuestionFormat] = useState('Text')
  const [question, setQuestion] = useState('')
  const [errorQuestion, setErrorQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [errorAnswer, setErrorAnswer] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setQuestionFormat(event.target.value as string)
  }

  const addNewCardHandler = () => {
    if (question === '' && answer === '') {
      setErrorQuestion('can not be empty')
      setErrorAnswer('can not be empty')
    }
    if (question === '') {
      setErrorQuestion('can not be empty')
    }
    if (answer === '') {
      setErrorAnswer('can not be empty')
    }

    if (question !== '' && answer !== '') {
      const dataParam = {
        question,
        answer,
      }

      dispatch(createNewCard(dataParam))
        .unwrap()
        .then(() => {
          closeModal?.()
        })
    }
  }

  const onChangeQuestion = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const question = e.currentTarget.value

    if (question.length < 40) {
      setQuestion(question)
      setErrorQuestion('')
    } else {
      setErrorQuestion('max 40 symbols')
    }
  }
  const onChangeAnswer = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const answer = e.currentTarget.value

    if (answer.length < 40) {
      setAnswer(answer)
      setErrorAnswer('')
    } else {
      setErrorAnswer('max 40 symbols')
    }
  }

  return (
    <Box sx={addNewCardContainerSx}>
      <FormControl fullWidth>
        <Typography component="p" sx={chooseQuestionTextSx}>
          Choose a question format
        </Typography>
        <Select
          size="small"
          id="simple-select"
          value={questionFormat}
          onChange={handleChange}
          sx={selectSx}
        >
          <MenuItem value={'Text'}>Text</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        type="text"
        variant="standard"
        value={question}
        label="Question"
        onChange={onChangeQuestion}
        error={!!errorQuestion}
        helperText={errorQuestion}
        sx={textFieldSx}
      />
      <TextField
        fullWidth
        type="text"
        variant="standard"
        value={answer}
        label="Answer"
        onChange={onChangeAnswer}
        error={!!errorAnswer}
        helperText={errorAnswer}
        sx={textFieldSx}
      />

      <Box sx={addNewCardBtnContainerSx}>
        <GeneralButton name="Cancel" onClick={closeModal} sx={cancelBtn} />
        <GeneralButton name="Save" onClick={addNewCardHandler} sx={saveBtn} />
      </Box>
    </Box>
  )
}
