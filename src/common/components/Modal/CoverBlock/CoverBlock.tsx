import React, { ChangeEvent, useState } from 'react'

import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import { Box, IconButton, Typography } from '@mui/material'

import { setAppMessage, setAppStatus } from '../../../../App/app-slice'
import defaultCover from '../../../../assets/img/defaultCover.jpg'
import { useAppDispatch } from '../../../hooks'
import { convertFileToBase64 } from '../../../utils/convertFileToBase64'

import { containerCoverSx, imgCoverSx, textCoverBlockSx } from './coverBlock.muiSx'

interface PropsType {
  name: string
  cover: string
  onChangeCover: (cover: string) => void
}

export const CoverBlock: React.FC<PropsType> = ({ cover, onChangeCover, name }) => {
  const [isCoverBroken, setIsCoverBroken] = useState(false)
  const dispatch = useAppDispatch()

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          onChangeCover(file64)
        })
      } else {
        dispatch(setAppStatus('failed'))
        dispatch(setAppMessage('Файл слишком большой'))
      }
    }
  }
  const errorHandler = () => {
    setIsCoverBroken(true)
  }
  const deckCover = cover ? cover : defaultCover

  return (
    <>
      <Box sx={containerCoverSx}>
        <Typography sx={textCoverBlockSx}>{name}</Typography>
        <IconButton component="label">
          <CloudUploadOutlinedIcon color={'primary'} />
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={uploadHandler}
            style={{ display: 'none' }}
          />
        </IconButton>
      </Box>
      <img
        style={imgCoverSx}
        onError={errorHandler}
        src={isCoverBroken ? defaultCover : deckCover}
        alt={'cover image'}
      />
    </>
  )
}
