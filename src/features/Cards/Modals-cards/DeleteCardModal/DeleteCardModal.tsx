import React from 'react'

import { Box } from '@mui/material'

import { deleteCard, setSettingDeleteCardModal } from '../../cards-slice'

import {
  deleteBtnSx,
  deleteCardBtnContainerSx,
  deleteCardContainerSx,
} from './deleteCardModal.muiSx'

import {
  ActionButtonsModal,
  cardIdSettingSelector,
  MessageToDelete,
  questionSettingSelector,
  useAppDispatch,
  useAppSelector,
  useModal,
} from 'common'

export const DeleteCardModal = () => {
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
      <MessageToDelete>
        Do you really want to remove <strong>{question}</strong> <br />
        Question will be deleted.
      </MessageToDelete>
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
