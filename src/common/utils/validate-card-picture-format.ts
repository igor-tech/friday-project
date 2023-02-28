export type DataCardImageType = {
  questionImg: string
  answerImg: string
  errorQuestionImg: string
  errorAnswerImg: string
  isQuestionBroken: boolean
  isAnswerBroken: boolean
}

export const validateCardPictureFormat = (
  dataCardImage: DataCardImageType,
  setDataCardImage: (dataCardImage: DataCardImageType) => void
) => {
  const {
    questionImg,
    answerImg,
    errorQuestionImg,
    errorAnswerImg,
    isAnswerBroken,
    isQuestionBroken,
  } = dataCardImage

  if (answerImg === '' && questionImg === '') {
    setDataCardImage({
      ...dataCardImage,
      errorQuestionImg: 'can not be empty',
      errorAnswerImg: 'can not be empty',
    })

    return
  }

  if (questionImg === '') {
    setDataCardImage({
      ...dataCardImage,
      errorQuestionImg: 'can not be empty',
    })

    return
  }
  if (isQuestionBroken && questionImg) {
    setDataCardImage({
      ...dataCardImage,
      errorQuestionImg: 'the picture is broken please replace',
    })

    return
  }
  if (answerImg === '') {
    setDataCardImage({
      ...dataCardImage,
      errorAnswerImg: 'can not be empty',
    })

    return
  }
  if (isAnswerBroken && answerImg) {
    setDataCardImage({
      ...dataCardImage,
      errorAnswerImg: 'the picture is broken please replace',
    })

    return
  }
  if (answerImg !== '' && questionImg !== '' && !isAnswerBroken && !isQuestionBroken) {
    return true
  }
}
