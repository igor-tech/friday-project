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

import {
  answerSettingSelector,
  appStatusSelector,
  GeneralButton,
  questionSettingSelector,
  useAppDispatch,
  useAppSelector,
  cardIdSettingSelector,
} from 'common'

export const EditCardModal: FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const dispatch = useAppDispatch()
  const currentQuestion = useAppSelector(questionSettingSelector)
  const currentAnswer = useAppSelector(answerSettingSelector)
  const idCard = useAppSelector(cardIdSettingSelector)
  const statusLoad = useAppSelector(appStatusSelector)
  const [questionFormat, setQuestionFormat] = useState('Text')
  const [questionCard, setQuestionCard] = useState(currentQuestion)
  const [errorQuestionCard, setErrorQuestionCard] = useState('')
  const [answerCard, setAnswerCard] = useState(currentAnswer)
  const [errorAnswerCard, setErrorAnswerCard] = useState('')

  const setQuestionFormatHandler = (event: SelectChangeEvent) => {
    setQuestionFormat(event.target.value as string)
  }

  const updateCurrentCardHandler = () => {
    if (questionCard.trim() === '' && answerCard.trim() === '') {
      setErrorQuestionCard('can not be empty')
      setErrorAnswerCard('can not be empty')
    }
    if (questionCard.trim() === '') {
      setErrorQuestionCard('can not be empty')
    }
    if (answerCard.trim() === '') {
      setErrorAnswerCard('can not be empty')
    }

    if (questionCard.trim() !== '' && answerCard.trim() !== '') {
      const updateCurrentCard = {
        _id: idCard,
        question: questionCard.trim(),
        answer: answerCard.trim(),
      }

      dispatch(updateCard(updateCurrentCard))
        .unwrap()
        .then(() => {
          closeModal()
          dispatch(setSettingEditCardModal({ cardId: '', answer: '', question: '' }))
        })
    }
  }

  const setNewQuestionCardHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const question = e.currentTarget.value

    setQuestionCard(question)
    setErrorQuestionCard('')
  }
  const setNewAnswerCardHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const answer = e.currentTarget.value

    setAnswerCard(answer)
    setErrorAnswerCard('')
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
          onChange={setQuestionFormatHandler}
          sx={editSelectSx}
        >
          <MenuItem value={'Text'}>Text</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        type="text"
        variant="standard"
        value={questionCard}
        label="Question"
        onChange={setNewQuestionCardHandler}
        error={!!errorQuestionCard}
        helperText={errorQuestionCard}
        sx={textFieldSx}
        disabled={disabled}
      />
      <TextField
        fullWidth
        type="text"
        variant="standard"
        value={answerCard}
        label="Answer"
        onChange={setNewAnswerCardHandler}
        error={!!errorAnswerCard}
        helperText={errorAnswerCard}
        sx={textFieldSx}
        disabled={disabled}
      />

      <Box sx={editCardBtnContainerSx}>
        <GeneralButton name="Cancel" onClick={closeModal} sx={cancelBtn} disabled={disabled} />
        <GeneralButton
          name="Save"
          onClick={updateCurrentCardHandler}
          sx={saveBtn}
          disabled={disabled}
        />
      </Box>
    </Box>
  )
}
