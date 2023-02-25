import React from 'react'

import { Box } from '@mui/material'

import { deletePack, setSettingDeletePackModal } from '../../packs-slice'

import {
  deleteBtnSx,
  deletePackBtnContainerSx,
  deletePackContainerSx,
} from './deletePackModal.muiSx'

import {
  ActionButtonsModal,
  idPackSettingSelector,
  packNameSettingSelector,
  useAppDispatch,
  useAppSelector,
  useModal,
  MessageToDelete,
} from 'common'

export const DeletePackModal = () => {
  const { closeModal } = useModal()
  const dispatch = useAppDispatch()
  const idPack = useAppSelector(idPackSettingSelector)
  const packName = useAppSelector(packNameSettingSelector)

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
      <MessageToDelete>
        Do you really want to remove <strong>{packName}</strong> <br />
        All cards will be deleted.
      </MessageToDelete>
      <Box sx={deletePackBtnContainerSx}>
        <ActionButtonsModal
          actionSubmit={deleteCurrentPackHandler}
          submitName="Delete"
          submitStyleSx={deleteBtnSx}
          closeModal={closeModal}
        />
      </Box>
    </Box>
  )
}
