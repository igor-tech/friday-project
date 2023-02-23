import React, { ChangeEvent, FC, useState } from 'react'

import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material'

import { setSettingEditCardModal, updateCard } from '../../cards-slice'

import {
  cancelBtn,
  chooseQuestionTextSx,
  editCardBtnContainerSx,
  editCardContainerSx,
  editSelectSx,
  saveBtn,
  textFieldSx,
} from './editCardModal.muiSx'

import { appStatusSelector, GeneralButton, useAppDispatch, useAppSelector } from 'common'

export const EditCardModal: FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const dispatch = useAppDispatch()
  const currentQuestion = useAppSelector(state => state.cards.cardsSettingModal.question)
  const currentAnswer = useAppSelector(state => state.cards.cardsSettingModal.answer)
  const idCard = useAppSelector(state => state.cards.cardsSettingModal.cardId)
  const statusLoad = useAppSelector(appStatusSelector)
  const [questionFormat, setQuestionFormat] = useState('Text')
  const [question, setQuestion] = useState(currentQuestion)
  const [errorQuestion, setErrorQuestion] = useState('')
  const [answer, setAnswer] = useState(currentAnswer)
  const [errorAnswer, setErrorAnswer] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setQuestionFormat(event.target.value as string)
  }

  const editCardHandler = () => {
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
      const updateCurrentPack = {
        _id: idCard,
        question,
        answer,
      }

      dispatch(updateCard(updateCurrentPack))
        .unwrap()
        .then(() => {
          closeModal()
          dispatch(setSettingEditCardModal({ cardId: '', answer: '', question: '' }))
        })
    }
  }

  const onChangeQuestion = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const question = e.currentTarget.value

    setQuestion(question)
    setErrorQuestion('')
  }
  const onChangeAnswer = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const answer = e.currentTarget.value

    setAnswer(answer)
    setErrorAnswer('')
  }
  const disabled = statusLoad === 'loading'

  return (
    <Box sx={editCardContainerSx}>
      <FormControl fullWidth>
        <Typography component="p" sx={chooseQuestionTextSx}>
          Choose a question format
        </Typography>
        <Select
          size="small"
          id="simple-select"
          value={questionFormat}
          onChange={handleChange}
          sx={editSelectSx}
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
        disabled={disabled}
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
        disabled={disabled}
      />

      <Box sx={editCardBtnContainerSx}>
        <GeneralButton name="Cancel" onClick={closeModal} sx={cancelBtn} disabled={disabled} />
        <GeneralButton name="Save" onClick={editCardHandler} sx={saveBtn} disabled={disabled} />
      </Box>
    </Box>
  )
}
