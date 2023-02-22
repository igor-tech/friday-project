import React from 'react'

import { Box, Typography } from '@mui/material'

import { deletePack, setSettingDeletePackModal } from '../../packs-slice'

import {
  cancelBtnSx,
  deleteBtnSx,
  deletePackBtnContainerSx,
  deletePackContainerSx,
  warningMessageSx,
} from './deletePackModal.muiSx'

import {
  appStatusSelector,
  GeneralButton,
  idPackSettingSelector,
  packNameSettingSelector,
  useAppDispatch,
  useAppSelector,
} from 'common'

export const DeletePackModal: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const dispatch = useAppDispatch()
  const idPack = useAppSelector(idPackSettingSelector)
  const packName = useAppSelector(packNameSettingSelector)
  const statusLoad = useAppSelector(appStatusSelector)

  const deleteCurrentPackHandler = () => {
    dispatch(deletePack(idPack))
      .unwrap()
      .then(() => {
        closeModal()
        dispatch(setSettingDeletePackModal({ packId: '', packName: '' }))
      })
  }

  return (
    <Box sx={deletePackContainerSx}>
      <Typography component="p" sx={warningMessageSx}>
        Do you really want to remove <strong>{packName}</strong> <br />
        All cards will be deleted.
      </Typography>
      <Box sx={deletePackBtnContainerSx}>
        <GeneralButton
          name="Cancel"
          sx={cancelBtnSx}
          onClick={closeModal}
          disabled={statusLoad === 'loading'}
        />
        <GeneralButton
          name="Delete"
          sx={deleteBtnSx}
          onClick={deleteCurrentPackHandler}
          disabled={statusLoad === 'loading'}
        />
      </Box>
    </Box>
  )
}
