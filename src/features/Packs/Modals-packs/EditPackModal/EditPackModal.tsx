import React, { useState } from 'react'

import { Box } from '@mui/material'

import { setSettingEditPackModal, updatePack } from '../../packs-slice'

import { editPackBtnContainer, editPackContainerSx } from './editPackModal.muiSx'

import {
  ActionButtonsModal,
  idPackSettingSelector,
  PackControlBlock,
  packNameSettingSelector,
  privateStatusSettingSelector,
  useAppDispatch,
  useAppSelector,
  useModal,
} from 'common'

export const EditPackModal = () => {
  const { closeModal } = useModal()
  const dispatch = useAppDispatch()
  const currentNamePack = useAppSelector(packNameSettingSelector)
  const currentPrivateStatus = useAppSelector(privateStatusSettingSelector)
  const idPack = useAppSelector(idPackSettingSelector)

  const [newPrivateStatus, setNewPrivateStatus] = useState(currentPrivateStatus)
  const [newNamePack, setNewNamePack] = useState(currentNamePack)
  const [error, setError] = useState('')

  const updateCurrentPackHandler = () => {
    if (newNamePack.trim() === currentNamePack.trim()) {
      setError("You didn't change your name")

      return
    }
    if (newNamePack.trim() !== '' && !error) {
      const updateCurrentPack = {
        _id: idPack,
        name: newNamePack.trim(),
        private: newPrivateStatus,
      }

      dispatch(updatePack(updateCurrentPack))
        .unwrap()
        .then(() => {
          closeModal()
          dispatch(
            setSettingEditPackModal({
              packId: '',
              packName: '',
              privateStatus: false,
            })
          )
        })
    } else {
      setError('Name must not be empty')
    }
  }
  const setNewNamePackHandler = (newName: string) => {
    setNewNamePack(newName)
    setError('')
  }

  return (
    <Box sx={editPackContainerSx}>
      <PackControlBlock
        newName={newNamePack}
        error={error}
        onChangeName={setNewNamePackHandler}
        checked={newPrivateStatus}
        onChangePrivate={setNewPrivateStatus}
      />
      <Box sx={editPackBtnContainer}>
        <ActionButtonsModal
          actionSubmit={updateCurrentPackHandler}
          closeModal={closeModal}
          error={error}
        />
      </Box>
    </Box>
  )
}
