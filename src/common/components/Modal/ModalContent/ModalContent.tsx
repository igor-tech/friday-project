import React from 'react'

import { MODAL_TYPE } from '../../../constants'
import { useAppSelector } from '../../../hooks'
import { modalTypeSelector } from '../../../selectors'

import {
  AddNewPackModal,
  DeletePackModal,
  EditPackModal,
  AddNewCardModal,
  EditCardModal,
  DeleteCardModal,
  DeleteCardPackModal,
  EditCardPackModal,
} from 'features'

export const ModalContent = () => {
  const typeModal = useAppSelector(modalTypeSelector)

  return (
    <>
      {typeModal === MODAL_TYPE.addNewPack && <AddNewPackModal />}
      {typeModal === MODAL_TYPE.editCurrentPack && <EditPackModal />}
      {typeModal === MODAL_TYPE.deleteCurrentPack && <DeletePackModal />}
      {typeModal === MODAL_TYPE.addNewCard && <AddNewCardModal />}
      {typeModal === MODAL_TYPE.editCurrentCard && <EditCardModal />}
      {typeModal === MODAL_TYPE.editCurrentPackCard && <EditCardPackModal />}
      {typeModal === MODAL_TYPE.deleteCurrentCard && <DeleteCardModal />}
      {typeModal === MODAL_TYPE.deleteCurrentPackCard && <DeleteCardPackModal />}
    </>
  )
}
