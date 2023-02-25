import { setCloseModal, setOpenModal } from '../../App/app-slice'
import { MODAL_TYPE } from '../constants'
import { modalTitleSelector, modalTypeSelector } from '../selectors'

import { useAppDispatch, useAppSelector } from './index'

export const useModal = () => {
  const dispatch = useAppDispatch()
  const isOpenType = useAppSelector(modalTypeSelector)
  const modalTitle = useAppSelector(modalTitleSelector)
  const closeModal = () => {
    dispatch(setCloseModal(null))
  }
  const openModal = (typeModal: MODAL_TYPE, modalTitle: string) => {
    dispatch(setOpenModal({ type: typeModal, modalTitle }))
  }

  return { closeModal, openModal, isOpenType, modalTitle }
}
