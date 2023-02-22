import React from 'react'

import { useModal } from '../../hooks'

import { ModalContent } from './ModalContent/ModalContent'
import { ModalWrapper } from './ModalWrapper/ModalWrapper'

export const Modal = () => {
  const { modalTitle, isOpenType, closeModal } = useModal()

  return (
    <ModalWrapper closeModal={closeModal} isOpen={!!isOpenType} title={modalTitle}>
      <ModalContent closeModal={closeModal} />
    </ModalWrapper>
  )
}
