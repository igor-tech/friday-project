import React from 'react'

import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { deleteCardPack } from '../../cards-slice'

import {
  deleteBtnSx,
  deleteCardPackBtnContainerSx,
  deletePackCardContainerSx,
  warningMessageSx,
} from './DeleteCardPackModal.muiSx'

import {
  ActionButtonsModal,
  packIdSelector,
  packNameCardSelector,
  PATH,
  useAppDispatch,
  useAppSelector,
  useModal,
} from 'common'

export const DeleteCardPackModal = () => {
  const { closeModal } = useModal()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const packId = useAppSelector(packIdSelector)
  const cardPackName = useAppSelector(packNameCardSelector)

  const deleteCurrentPackCardHandler = () => {
    dispatch(deleteCardPack(packId))
      .unwrap()
      .then(() => {
        closeModal()
        navigate(PATH.PACKS)
      })
  }

  return (
    <Box sx={deletePackCardContainerSx}>
      <Typography component="p" sx={warningMessageSx}>
        Do you really want to remove <strong>{cardPackName}</strong> <br />
        All cards will be deleted.
      </Typography>
      <Box sx={deleteCardPackBtnContainerSx}>
        <ActionButtonsModal
          actionSubmit={deleteCurrentPackCardHandler}
          closeModal={closeModal}
          submitStyleSx={deleteBtnSx}
          submitName="Delete"
        />
      </Box>
    </Box>
  )
}
