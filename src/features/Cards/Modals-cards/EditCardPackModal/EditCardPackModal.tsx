import React, { ChangeEvent, useState } from 'react'

import { Box, Checkbox, FormControlLabel, TextField } from '@mui/material'

import { updateCardPack } from '../../cards-slice'

import {
  cancelBtnSx,
  editPackCardBtnContainer,
  editPackCardContainerSx,
  editPackCardFormControlSx,
  saveBtnSx,
} from './editCardPackModal.muiSx'

import {
  appStatusSelector,
  GeneralButton,
  packIdSelector,
  packNameCardSelector,
  privateStatusSelector,
  useAppDispatch,
  useAppSelector,
} from 'common'

export const EditCardPackModal: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const dispatch = useAppDispatch()
  const packId = useAppSelector(packIdSelector)
  const cardPackName = useAppSelector(packNameCardSelector)
  const currentPrivateStatus = useAppSelector(privateStatusSelector)
  const statusLoad = useAppSelector(appStatusSelector)
  const [newPrivateStatus, setNewPrivateStatus] = useState(currentPrivateStatus)
  const [newNamePackCard, setNewNamePackCard] = useState(cardPackName)
  const [error, setError] = useState('')

  const updatePackCardHandler = () => {
    if (newNamePackCard.trim() === cardPackName.trim()) {
      setError("You didn't change your name")

      return
    }
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
  const setNewNamePackCardHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.currentTarget.value

    setNewNamePackCard(name)
    setError('')
  }

  return (
    <Box sx={editPackCardContainerSx}>
      <TextField
        fullWidth
        type="text"
        variant="standard"
        label="Name pack"
        value={newNamePackCard}
        error={!!error}
        helperText={error}
        onChange={setNewNamePackCardHandler}
        disabled={statusLoad === 'loading'}
      />
      <FormControlLabel
        sx={editPackCardFormControlSx}
        disabled={statusLoad === 'loading'}
        control={
          <Checkbox
            onChange={e => setNewPrivateStatus(e.currentTarget.checked)}
            checked={newPrivateStatus}
          />
        }
        label="Private pack"
      />
      <Box sx={editPackCardBtnContainer}>
        <GeneralButton
          name="Cancel"
          sx={cancelBtnSx}
          onClick={closeModal}
          disabled={statusLoad === 'loading'}
        />
        <GeneralButton
          name="Save"
          sx={saveBtnSx}
          onClick={updatePackCardHandler}
          disabled={statusLoad === 'loading' || !!error}
        />
      </Box>
    </Box>
  )
}
