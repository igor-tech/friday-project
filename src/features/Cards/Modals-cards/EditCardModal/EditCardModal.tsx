import React, { useState } from 'react'

import { Box } from '@mui/material'

import { setSettingEditCardModal, updateCard } from '../../cards-slice'

import { editCardBtnContainerSx, editCardContainerSx } from './editCardModal.muiSx'

import {
  ActionButtonsModal,
  answerImgSettingSelector,
  answerSettingSelector,
  cardIdSettingSelector,
  QuestionAnswerCardBlock,
  QuestionAnswerPictureCardBlock,
  questionImgSettingSelector,
  questionSettingSelector,
  SelectControlCardBlock,
  useAppDispatch,
  useAppSelector,
  useModal,
  validateCardTextFormat,
  validateCardPictureFormat,
} from 'common'

export const EditCardModal = () => {
  const { closeModal } = useModal()
  const dispatch = useAppDispatch()
  const currentQuestion = useAppSelector(questionSettingSelector)
  const currentAnswer = useAppSelector(answerSettingSelector)
  const idCard = useAppSelector(cardIdSettingSelector)
  const currentAnswerImg = useAppSelector(answerImgSettingSelector)
  const currentQuestionImg = useAppSelector(questionImgSettingSelector)

  const format = currentAnswerImg !== '' && currentQuestionImg !== ''
  const [questionFormat, setQuestionFormat] = useState(format ? 'Picture' : 'Text')

  const [dataCard, setDataCard] = useState({
    question: currentQuestion,
    answer: currentAnswer,
    errorQuestion: '',
    errorAnswer: '',
  })
  const [dataCardImage, setDataCardImage] = useState({
    questionImg: currentQuestionImg,
    answerImg: currentAnswerImg,
    errorQuestionImg: '',
    errorAnswerImg: '',
    isQuestionBroken: false,
    isAnswerBroken: false,
  })

  const updateCurrentCardHandler = () => {
    let isValidate = false

    if (questionFormat === 'Text') {
      isValidate = validateCardTextFormat(dataCard, setDataCard)!
    }
    if (questionFormat === 'Picture') {
      isValidate = validateCardPictureFormat(dataCardImage, setDataCardImage)!
    }
    if (isValidate) {
      const updateCurrentCard = {
        _id: idCard,
        question: dataCard.question.trim(),
        answer: dataCard.answer.trim(),
        answerImg: dataCardImage.answerImg,
        questionImg: dataCardImage.questionImg,
      }

      dispatch(updateCard(updateCurrentCard))
        .unwrap()
        .then(() => {
          closeModal()
          dispatch(
            setSettingEditCardModal({
              cardId: '',
              answer: '',
              question: '',
              answerImg: '',
              questionImg: '',
            })
          )
        })
    }
  }

  return (
    <Box sx={editCardContainerSx}>
      <SelectControlCardBlock
        setQuestionFormat={setQuestionFormat}
        questionFormat={questionFormat}
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
      <Box sx={editCardBtnContainerSx}>
        <ActionButtonsModal actionSubmit={updateCurrentCardHandler} closeModal={closeModal} />
      </Box>
    </Box>
  )
}
