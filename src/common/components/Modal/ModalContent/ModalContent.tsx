import React from 'react'

import { MODALS } from '../../../constants'
import { useAppSelector } from '../../../hooks'
import { modalTypeSelector } from '../../../selectors'

export const ModalContent = () => {
  const typeModal = useAppSelector(modalTypeSelector)

  const Modal = MODALS[typeModal]

  return (
    <>
      <Modal />
    </>
  )
}
