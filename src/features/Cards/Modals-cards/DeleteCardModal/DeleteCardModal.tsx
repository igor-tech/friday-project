import React from 'react'

import { Box, Typography } from '@mui/material'

import { deleteCard, setSettingDeleteCardModal } from '../../cards-slice'

import {
  cancelBtnSx,
  deleteBtnSx,
  deleteCardBtnContainerSx,
  deleteCardContainerSx,
  warningMessageSx,
} from './deleteCardModal.muiSx'

import {
  appStatusSelector,
  cardIdSettingSelector,
  GeneralButton,
  questionSettingSelector,
  useAppDispatch,
  useAppSelector,
} from 'common'

export const DeleteCardModal: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const dispatch = useAppDispatch()
  const idCard = useAppSelector(cardIdSettingSelector)
  const question = useAppSelector(questionSettingSelector)
  const statusLoad = useAppSelector(appStatusSelector)

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
        <GeneralButton
          name="Cancel"
          onClick={closeModal}
          disabled={statusLoad === 'loading'}
          sx={cancelBtnSx}
        />
        <GeneralButton
          sx={deleteBtnSx}
          name="Delete"
          onClick={deleteCurrentCardHandler}
          disabled={statusLoad === 'loading'}
        />
      </Box>
    </Box>
  )
}
