import React, { ChangeEvent } from 'react'

import UploadFileIcon from '@mui/icons-material/UploadFile'
import { Box, IconButton, Typography } from '@mui/material'

import { convertFileToBase64, DataCardImageType } from '../../../utils'

import {
  errorSx,
  questionAnswerImgSx,
  questionAnswerPictureContainerSx,
  titleSx,
} from './questionAnswerPictureCardBlock.muiSx'

type PropsType = {
  dataCardImage: DataCardImageType
  setDataCardImage: (data: DataCardImageType) => void
}

export const QuestionAnswerPictureCardBlock: React.FC<PropsType> = ({
  dataCardImage,
  setDataCardImage,
}) => {
  const {
    answerImg,
    errorAnswerImg,
    isAnswerBroken,
    isQuestionBroken,
    questionImg,
    errorQuestionImg,
  } = dataCardImage

  const uploadQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          setDataCardImage({
            ...dataCardImage,
            questionImg: file64,
            errorQuestionImg: '',
            isQuestionBroken: false,
          })
        })
      } else {
        setDataCardImage({
          ...dataCardImage,
          errorQuestionImg: 'Файл слишком большого размера',
        })
      }
    }
  }
  const uploadAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          setDataCardImage({
            ...dataCardImage,
            answerImg: file64,
            errorAnswerImg: '',
            isAnswerBroken: false,
          })
        })
      } else {
        setDataCardImage({
          ...dataCardImage,
          errorAnswerImg: 'Файл слишком большого размера',
        })
      }
    }
  }

  const errorAnswerHandler = () => {
    setDataCardImage({
      ...dataCardImage,
      isAnswerBroken: true,
      errorAnswerImg: 'the picture is broken please replace',
    })
  }
  const errorQuestionHandler = () => {
    setDataCardImage({
      ...dataCardImage,
      isQuestionBroken: true,
      errorQuestionImg: 'the picture is broken please replace',
    })
  }

  return (
    <>
      <Box sx={questionAnswerPictureContainerSx}>
        <Typography component="p" sx={titleSx}>
          Question:
        </Typography>
        <IconButton color="primary" aria-label="upload question" component="label">
          <input hidden accept="image/*" type="file" onChange={uploadQuestionHandler} />
          <UploadFileIcon />
        </IconButton>
      </Box>
      {questionImg && !isQuestionBroken && (
        <Typography
          component="img"
          alt="question"
          src={questionImg}
          onError={errorQuestionHandler}
          sx={questionAnswerImgSx}
        />
      )}
      {errorQuestionImg && !isQuestionBroken && (
        <Typography component="p" sx={errorSx}>
          {errorQuestionImg}{' '}
        </Typography>
      )}
      {errorQuestionImg && isQuestionBroken && (
        <Typography component="p" sx={errorSx}>
          {errorQuestionImg}{' '}
        </Typography>
      )}
      <Box sx={questionAnswerPictureContainerSx}>
        <Typography component="p" sx={titleSx}>
          Answer:
        </Typography>
        <IconButton color="primary" aria-label="upload answer" component="label">
          <input hidden accept="image/*" type="file" onChange={uploadAnswerHandler} />
          <UploadFileIcon />
        </IconButton>
      </Box>

      {answerImg && !isAnswerBroken && (
        <Typography
          src={answerImg}
          onError={errorAnswerHandler}
          component="img"
          alt="answer"
          sx={questionAnswerImgSx}
        />
      )}
      {errorAnswerImg && !isAnswerBroken && (
        <Typography component="p" sx={errorSx}>
          {errorAnswerImg}
        </Typography>
      )}
      {errorAnswerImg && isAnswerBroken && (
        <Typography component="p" sx={errorSx}>
          {errorQuestionImg}
        </Typography>
      )}
    </>
  )
}
