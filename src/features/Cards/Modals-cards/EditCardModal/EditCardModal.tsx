import React, { useState } from 'react'

import { Box } from '@mui/material'

import { setSettingEditCardModal, updateCard } from '../../cards-slice'

import { editCardBtnContainerSx, editCardContainerSx } from './editCardModal.muiSx'

import {
  ActionButtonsModal,
  answerSettingSelector,
  cardIdSettingSelector,
  QuestionAnswerCardBlock,
  questionSettingSelector,
  SelectControlCardBlock,
  useAppDispatch,
  useAppSelector,
  useModal,
  validateCardTextFormat,
} from 'common'

export const EditCardModal = () => {
  const { closeModal } = useModal()
  const dispatch = useAppDispatch()
  const currentQuestion = useAppSelector(questionSettingSelector)
  const currentAnswer = useAppSelector(answerSettingSelector)
  const idCard = useAppSelector(cardIdSettingSelector)

  const [questionFormat, setQuestionFormat] = useState('Text')

  const [dataCard, setDataCard] = useState({
    question: currentQuestion,
    answer: currentAnswer,
    errorQuestion: '',
    errorAnswer: '',
  })

  const updateCurrentCardHandler = () => {
    const isValidate = validateCardTextFormat(dataCard, setDataCard)

    if (isValidate) {
      const updateCurrentCard = {
        _id: idCard,
        question: dataCard.question.trim(),
        answer: dataCard.answer.trim(),
      }

      dispatch(updateCard(updateCurrentCard))
        .unwrap()
        .then(() => {
          closeModal()
          dispatch(setSettingEditCardModal({ cardId: '', answer: '', question: '' }))
        })
    }
  }

  return (
    <Box sx={editCardContainerSx}>
      <SelectControlCardBlock
        setQuestionFormat={setQuestionFormat}
        questionFormat={questionFormat}
      />
      <QuestionAnswerCardBlock dataCard={dataCard} setDataCard={setDataCard} />
      <Box sx={editCardBtnContainerSx}>
        <ActionButtonsModal actionSubmit={updateCurrentCardHandler} closeModal={closeModal} />
      </Box>
    </Box>
  )
}
