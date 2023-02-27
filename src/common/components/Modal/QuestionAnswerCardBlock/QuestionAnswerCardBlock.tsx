import React, { ChangeEvent } from 'react'

import { TextField } from '@mui/material'

import { useAppSelector } from '../../../hooks'
import { appStatusSelector } from '../../../selectors'
import { dataCardType } from '../../../utils'

import { textFieldSx } from './questionAnswerCardBlock.muiSx'

type PropsType = {
  setDataCard: (dataCard: dataCardType) => void
  dataCard: dataCardType
}

export const QuestionAnswerCardBlock: React.FC<PropsType> = ({ setDataCard, dataCard }) => {
  const statusLoad = useAppSelector(appStatusSelector)

  const { errorAnswer, errorQuestion, question, answer } = dataCard

  const disabled = statusLoad === 'loading'

  const setQuestionHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const question = e.currentTarget.value

    setDataCard({
      ...dataCard,
      question,
      errorQuestion: '',
    })
  }

  const setAnswerHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const answer = e.currentTarget.value

    setDataCard({
      ...dataCard,
      answer,
      errorAnswer: '',
    })
  }

  return (
    <>
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
    </>
  )
}
