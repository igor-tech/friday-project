import React from 'react'

import { useAppSelector } from '../../../hooks'
import { appStatusSelector } from '../../../selectors'
import { GeneralButton } from '../GeneralButton/GeneralButton'

import { cancelBtnSx, submitBtnSx } from './actionButtonsModal.muiSx'

interface PropsType {
  cancelName: string
  submitName: string
  error: string
  actionSubmit: () => void
  closeModal: () => void
  cancelStyleSx: React.CSSProperties
  submitStyleSx: React.CSSProperties
}

export const ActionButtonsModal: React.FC<Partial<PropsType>> = ({
  cancelStyleSx,
  submitStyleSx,
  error,
  cancelName = 'Cancel',
  submitName = 'Save',
  actionSubmit,
  closeModal,
}) => {
  const statusLoad = useAppSelector(appStatusSelector)
  const defCancelBtnSx = {
    ...cancelBtnSx,
    ...cancelStyleSx,
  }

  const defSubmitBtnSx = {
    ...submitBtnSx,
    ...submitStyleSx,
  }

  return (
    <>
      <GeneralButton
        name={cancelName}
        sx={defCancelBtnSx}
        onClick={closeModal}
        disabled={statusLoad === 'loading'}
      />
      <GeneralButton
        name={submitName}
        sx={defSubmitBtnSx}
        onClick={actionSubmit}
        disabled={statusLoad === 'loading' || !!error}
      />
    </>
  )
}
