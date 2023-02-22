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

  const addNewPackHandler = () => {
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
      setError('')
    } else {
      setError('Name must not be empty')
    }
  }
  const setNamePackHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.currentTarget.value

    if (name.length < 40) {
      setNewNamePack(name)
      setError('')
    } else {
      setError('cannot be more than 40')
    }
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
        onChange={setNamePackHandler}
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
          onClick={addNewPackHandler}
          disabled={statusLoad === 'loading' || !!error}
        />
      </Box>
    </Box>
  )
}
