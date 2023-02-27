export interface dataCardType {
  question: string
  answer: string
  errorQuestion: string
  errorAnswer: string
}
export const validateCardTextFormat = (
  data: dataCardType,
  setData: (data: dataCardType) => void
) => {
  if (data.question.trim() === '' && data.answer.trim() === '') {
    setData({
      ...data,
      errorQuestion: 'can not be empty',
      errorAnswer: 'can not be empty',
    })

    return
  }
  if (data.question.trim() === '') {
    setData({
      ...data,
      errorQuestion: 'can not be empty',
    })

    return
  }
  if (data.answer.trim() === '') {
    setData({
      ...data,
      errorAnswer: 'can not be empty',
    })

    return
  }
  if (data.question.trim() !== '' && data.answer.trim() !== '') {
    return true
  }
}
