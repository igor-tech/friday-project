import React from 'react'

import { Box, Typography } from '@mui/material'

import { deleteCard, setSettingDeleteCardModal } from '../../cards-slice'

import {
  deleteBtnSx,
  deleteCardBtnContainerSx,
  deleteCardContainerSx,
  warningMessageSx,
} from './deleteCardModal.muiSx'

import {
  ActionButtonsModal,
  cardIdSettingSelector,
  questionSettingSelector,
  useAppDispatch,
  useAppSelector,
  useModal,
} from 'common'

export const DeleteCardModal: React.FC<{ closeModal: () => void }> = () => {
  const { closeModal } = useModal()
  const dispatch = useAppDispatch()
  const idCard = useAppSelector(cardIdSettingSelector)
  const question = useAppSelector(questionSettingSelector)

  const deleteCurrentCardHandler = () => {
    dispatch(deleteCard({ id: idCard }))
      .unwrap()
      .then(() => {
        closeModal()
        dispatch(setSettingDeleteCardModal({ cardId: '', question: '' }))
      })
  }

  return (
    <Box sx={deleteCardContainerSx}>
      <Typography component="p" sx={warningMessageSx}>
        Do you really want to remove <strong>{question}</strong> <br />
        Question will be deleted.
      </Typography>
      <Box sx={deleteCardBtnContainerSx}>
        <ActionButtonsModal
          actionSubmit={deleteCurrentCardHandler}
          closeModal={closeModal}
          submitStyleSx={deleteBtnSx}
          submitName="Delete"
        />
      </Box>
    </Box>
  )
}
