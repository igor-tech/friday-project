import * as React from 'react'
import { useState } from 'react'

import { Box } from '@mui/material'

import { CoverBlock } from '../../../../common/components/Modal/CoverBlock/CoverBlock'
import { createNewPack } from '../../packs-slice'

import { addPackBtnContainerSx, addPackContainerSx } from './addNewPackModal.muiSx'

import { ActionButtonsModal, PackControlBlock, useAppDispatch, useModal } from 'common'

export const AddNewPackModal = () => {
  const { closeModal } = useModal()
  const dispatch = useAppDispatch()
  const [privateStatus, setPrivateStatus] = useState(false)
  const [namePack, setNamePack] = useState('')
  const [error, setError] = useState('')
  const [cover, setCover] = useState('')

  const addNewPackHandler = () => {
    if (namePack.trim() !== '' && !error) {
      const dataParams = {
        name: namePack.trim(),
        deckCover: cover,
        private: privateStatus,
      }

      dispatch(createNewPack(dataParams))
        .unwrap()
        .then(() => {
          closeModal()
        })
    } else {
      setError('Name must not be empty')
    }
  }

  const setNamePackHandler = (newName: string) => {
    setNamePack(newName)
    setError('')
  }

  return (
    <Box sx={addPackContainerSx}>
      <CoverBlock name={'Cover'} cover={cover} onChangeCover={setCover} />
      <PackControlBlock
        error={error}
        checked={privateStatus}
        onChangePrivate={setPrivateStatus}
        newName={namePack}
        onChangeName={setNamePackHandler}
      />
      <Box sx={addPackBtnContainerSx}>
        <ActionButtonsModal
          actionSubmit={addNewPackHandler}
          error={error}
          closeModal={closeModal}
        />
      </Box>
    </Box>
  )
}
