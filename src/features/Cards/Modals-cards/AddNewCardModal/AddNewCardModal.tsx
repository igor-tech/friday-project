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

import { appStatusSelector, GeneralButton, useAppDispatch, useAppSelector } from 'common'

export const AddNewCardModal: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const dispatch = useAppDispatch()
  const statusLoad = useAppSelector(appStatusSelector)
  const [questionFormat, setQuestionFormat] = useState('Text')
  const [question, setQuestion] = useState('')
  const [errorQuestion, setErrorQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [errorAnswer, setErrorAnswer] = useState('')

  const setQuestionFormatHandler = (event: SelectChangeEvent) => {
    setQuestionFormat(event.target.value as string)
  }

  const addNewCardHandler = () => {
    if (question.trim() === '' && answer.trim() === '') {
      setErrorQuestion('can not be empty')
      setErrorAnswer('can not be empty')
    }
    if (question.trim() === '') {
      setErrorQuestion('can not be empty')
    }
    if (answer.trim() === '') {
      setErrorAnswer('can not be empty')
    }

    if (question.trim() !== '' && answer.trim() !== '') {
      const dataParam = {
        question: question.trim(),
        answer: answer.trim(),
      }

      dispatch(createNewCard(dataParam))
        .unwrap()
        .then(() => {
          closeModal?.()
        })
    }
  }

  const setQuestionHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const question = e.currentTarget.value

    setQuestion(question)
    setErrorQuestion('')
  }
  const setAnswerHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const answer = e.currentTarget.value

    setAnswer(answer)
    setErrorAnswer('')
  }
  const disabled = statusLoad === 'loading'

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
          onChange={setQuestionFormatHandler}
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
        onChange={setQuestionHandler}
        error={!!errorQuestion}
        helperText={errorQuestion}
        sx={textFieldSx}
        disabled={disabled}
      />
      <TextField
        fullWidth
        type="text"
        variant="standard"
        value={answer}
        label="Answer"
        onChange={setAnswerHandler}
        error={!!errorAnswer}
        helperText={errorAnswer}
        sx={textFieldSx}
        disabled={disabled}
      />

      <Box sx={addNewCardBtnContainerSx}>
        <GeneralButton name="Cancel" onClick={closeModal} sx={cancelBtn} disabled={disabled} />
        <GeneralButton name="Save" onClick={addNewCardHandler} sx={saveBtn} disabled={disabled} />
      </Box>
    </Box>
  )
}
