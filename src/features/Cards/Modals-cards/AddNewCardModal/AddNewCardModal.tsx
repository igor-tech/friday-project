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
  QuestionAnswerPictureCardBlock,
  validateCardPictureFormat,
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

  const [dataCardImage, setDataCardImage] = useState({
    questionImg: '',
    answerImg: '',
    errorQuestionImg: '',
    errorAnswerImg: '',
    isQuestionBroken: false,
    isAnswerBroken: false,
  })

  const [questionFormat, setQuestionFormat] = useState('Text')

  const addNewCardHandler = () => {
    let isValidate = false

    if (questionFormat === 'Text') {
      isValidate = validateCardTextFormat(dataCard, setDataCard)!
    }
    if (questionFormat === 'Picture') {
      isValidate = validateCardPictureFormat(dataCardImage, setDataCardImage)!
    }

    if (isValidate) {
      const dataParam = {
        question: dataCard.question.trim(),
        answer: dataCard.answer.trim(),
        answerImg: dataCardImage.answerImg,
        questionImg: dataCardImage.questionImg,
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
      {questionFormat === 'Text' && (
        <QuestionAnswerCardBlock dataCard={dataCard} setDataCard={setDataCard} />
      )}
      {questionFormat === 'Picture' && (
        <QuestionAnswerPictureCardBlock
          dataCardImage={dataCardImage}
          setDataCardImage={setDataCardImage}
        />
      )}

      <Box sx={addNewCardBtnContainerSx}>
        <ActionButtonsModal actionSubmit={addNewCardHandler} closeModal={closeModal} />
      </Box>
    </Box>
  )
}
