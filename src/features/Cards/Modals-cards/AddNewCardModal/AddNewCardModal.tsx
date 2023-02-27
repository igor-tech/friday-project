import React, { useState } from 'react'

import { Box } from '@mui/material'

import { createNewCard } from '../../cards-slice'

import { addNewCardBtnContainerSx, addNewCardContainerSx } from './addNewCardModal.muiSx'

import {
  ActionButtonsModal,
  QuestionAnswerCardBlock,
  useAppDispatch,
  useModal,
  validateCardTextFormat,
  SelectControlCardBlock,
} from 'common'

export const AddNewCardModal = () => {
  const { closeModal } = useModal()
  const dispatch = useAppDispatch()

  const [dataCard, setDataCard] = useState({
    question: '',
    answer: '',
    errorQuestion: '',
    errorAnswer: '',
  })
  const [questionFormat, setQuestionFormat] = useState('Text')

  const addNewCardHandler = () => {
    const isValidate = validateCardTextFormat(dataCard, setDataCard)

    if (isValidate) {
      const dataParam = {
        question: dataCard.question.trim(),
        answer: dataCard.answer.trim(),
      }

      dispatch(createNewCard(dataParam))
        .unwrap()
        .then(() => {
          closeModal?.()
        })
    }
  }

  return (
    <Box sx={addNewCardContainerSx}>
      <SelectControlCardBlock
        questionFormat={questionFormat}
        setQuestionFormat={setQuestionFormat}
      />

      <QuestionAnswerCardBlock dataCard={dataCard} setDataCard={setDataCard} />

      <Box sx={addNewCardBtnContainerSx}>
        <ActionButtonsModal actionSubmit={addNewCardHandler} closeModal={closeModal} />
      </Box>
    </Box>
  )
}
