import * as React from 'react'
import { ChangeEvent, useState } from 'react'

import { Box, Checkbox, FormControlLabel, TextField } from '@mui/material'

import { createNewPack } from '../../packs-slice'

import { addPackBtnContainerSx, addPackContainerSx, formControlSx } from './addNewPackModal.muiSx'

import {
  ActionButtonsModal,
  appStatusSelector,
  useAppDispatch,
  useAppSelector,
  useModal,
} from 'common'

export const AddNewPackModal: React.FC<{ closeModal: () => void }> = ({}) => {
  const { closeModal } = useModal()
  const dispatch = useAppDispatch()
  const [privateStatus, setPrivateStatus] = useState(false)
  const [namePack, setNamePack] = useState('')
  const [error, setError] = useState('')

  const statusLoad = useAppSelector(appStatusSelector)

  const addNewPackHandler = () => {
    if (namePack.trim() !== '' && !error) {
      const dataParams = {
        name: namePack.trim(),
        deckCover: '',
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

  const setNamePackHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.currentTarget.value

    setNamePack(name)
    setError('')
  }

  return (
    <Box sx={addPackContainerSx}>
      <TextField
        fullWidth
        type="text"
        variant="standard"
        label="Name pack"
        value={namePack}
        error={!!error}
        helperText={error}
        onChange={setNamePackHandler}
        disabled={statusLoad === 'loading'}
      />
      <FormControlLabel
        sx={formControlSx}
        disabled={statusLoad === 'loading'}
        control={
          <Checkbox
            onChange={e => setPrivateStatus(e.currentTarget.checked)}
            checked={privateStatus}
          />
        }
        label="Private pack"
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
