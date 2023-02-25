import { ComponentType } from 'react'

import {
  AddNewCardModal,
  AddNewPackModal,
  DeleteCardModal,
  DeleteCardPackModal,
  DeletePackModal,
  EditCardModal,
  EditCardPackModal,
  EditPackModal,
} from '../../features'

import { MODAL_TYPE } from './modal-type'

type ModalType = {
  [ModalKey in MODAL_TYPE]: ComponentType
}
export const MODALS: ModalType = {
  [MODAL_TYPE.addNewPack]: AddNewPackModal,
  [MODAL_TYPE.editCurrentPack]: EditPackModal,
  [MODAL_TYPE.deleteCurrentPack]: DeletePackModal,
  [MODAL_TYPE.addNewCard]: AddNewCardModal,
  [MODAL_TYPE.editCurrentCard]: EditCardModal,
  [MODAL_TYPE.editCurrentPackCard]: EditCardPackModal,
  [MODAL_TYPE.deleteCurrentCard]: DeleteCardModal,
  [MODAL_TYPE.deleteCurrentPackCard]: DeleteCardPackModal,
}
