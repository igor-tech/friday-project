import React, { useState } from 'react'

import { Box } from '@mui/material'

import { updateCardPack } from '../../cards-slice'

import { editPackCardBtnContainer, editPackCardContainerSx } from './editCardPackModal.muiSx'

import {
  ActionButtonsModal,
  PackControlBlock,
  packIdSelector,
  packNameCardSelector,
  privateStatusSelector,
  useAppDispatch,
  useAppSelector,
  useModal,
} from 'common'

export const EditCardPackModal = () => {
  const { closeModal } = useModal()
  const dispatch = useAppDispatch()
  const packId = useAppSelector(packIdSelector)
  const cardPackName = useAppSelector(packNameCardSelector)
  const currentPrivateStatus = useAppSelector(privateStatusSelector)
  const [newPrivateStatus, setNewPrivateStatus] = useState(currentPrivateStatus)
  const [newNamePackCard, setNewNamePackCard] = useState(cardPackName)
  const [error, setError] = useState('')

  const updatePackCardHandler = () => {
    if (newNamePackCard.trim() !== '' && !error) {
      const updateCurrentCardPack = {
        _id: packId,
        name: newNamePackCard.trim(),
        private: newPrivateStatus,
      }

      dispatch(updateCardPack(updateCurrentCardPack))
        .unwrap()
        .then(() => {
          closeModal()
        })
    } else {
      setError('Name must not be empty')
    }
  }
  const setNewNamePackCardHandler = (newName: string) => {
    setNewNamePackCard(newName)
    setError('')
  }

  return (
    <Box sx={editPackCardContainerSx}>
      <PackControlBlock
        error={error}
        newName={newNamePackCard}
        checked={newPrivateStatus}
        onChangeName={setNewNamePackCardHandler}
        onChangePrivate={setNewPrivateStatus}
      />
      <Box sx={editPackCardBtnContainer}>
        <ActionButtonsModal closeModal={closeModal} actionSubmit={updatePackCardHandler} />
      </Box>
    </Box>
  )
}
