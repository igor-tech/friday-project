import React from 'react'

import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { deleteCardPack } from '../../cards-slice'

import {
  cancelBtnSx,
  deleteBtnSx,
  deleteCardPackBtnContainerSx,
  deletePackCardContainerSx,
  warningMessageSx,
} from './DeleteCardPackModal.muiSx'

import {
  appStatusSelector,
  GeneralButton,
  packIdSelector,
  packNameCardSelector,
  PATH,
  useAppDispatch,
  useAppSelector,
} from 'common'

export const DeleteCardPackModal: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const packId = useAppSelector(packIdSelector)
  const cardPackName = useAppSelector(packNameCardSelector)
  const statusLoad = useAppSelector(appStatusSelector)

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
        <GeneralButton
          name="Cancel"
          onClick={closeModal}
          disabled={statusLoad === 'loading'}
          sx={cancelBtnSx}
        />
        <GeneralButton
          sx={deleteBtnSx}
          name="Delete"
          onClick={deleteCurrentPackCardHandler}
          disabled={statusLoad === 'loading'}
        />
      </Box>
    </Box>
  )
}
