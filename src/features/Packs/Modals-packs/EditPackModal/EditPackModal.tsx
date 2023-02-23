import React, { ChangeEvent, useState } from 'react'

import { Box, Checkbox, FormControlLabel, TextField } from '@mui/material'

import { setSettingEditPackModal, updatePack } from '../../packs-slice'

import {
  cancelBtnSx,
  editPackBtnContainer,
  editPackContainerSx,
  editPackFormControlSx,
  saveBtnSx,
} from './editPackModal.muiSx'

import {
  privateStatusSettingSelector,
  appStatusSelector,
  GeneralButton,
  packNameSettingSelector,
  useAppDispatch,
  useAppSelector,
  idPackSettingSelector,
} from 'common'

export const EditPackModal: React.FC<{
  closeModal: () => void
}> = ({ closeModal }) => {
  const dispatch = useAppDispatch()
  const currentNamePack = useAppSelector(packNameSettingSelector)
  const currentPrivateStatus = useAppSelector(privateStatusSettingSelector)
  const idPack = useAppSelector(idPackSettingSelector)

  const statusLoad = useAppSelector(appStatusSelector)

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
        name: newNamePack,
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
  const setNewNamePackHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.currentTarget.value

    setNewNamePack(name)
    setError('')
  }

  return (
    <Box sx={editPackContainerSx}>
      <TextField
        fullWidth
        type="text"
        variant="standard"
        label="Name pack"
        value={newNamePack}
        error={!!error}
        helperText={error}
        onChange={setNewNamePackHandler}
        disabled={statusLoad === 'loading'}
      />
      <FormControlLabel
        sx={editPackFormControlSx}
        disabled={statusLoad === 'loading'}
        control={
          <Checkbox
            onChange={e => setNewPrivateStatus(e.currentTarget.checked)}
            checked={newPrivateStatus}
          />
        }
        label="Private pack"
      />
      <Box sx={editPackBtnContainer}>
        <GeneralButton
          name="Cancel"
          sx={cancelBtnSx}
          onClick={closeModal}
          disabled={statusLoad === 'loading'}
        />
        <GeneralButton
          name="Save"
          sx={saveBtnSx}
          onClick={updateCurrentPackHandler}
          disabled={statusLoad === 'loading' || !!error}
        />
      </Box>
    </Box>
  )
}
