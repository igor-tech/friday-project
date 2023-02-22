import * as React from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { Box, Container, Divider, Modal, Typography } from '@mui/material'

import {
  closeExitIconSx,
  containerChildSx,
  dividerSx,
  titleModalContainerSx,
  titleModalSx,
} from './modalWrapper.muiSx'

interface ModalProps {
  children: React.ReactNode
  title: string
  isOpen: boolean
  closeModal: () => void
}

export const ModalWrapper: React.FC<ModalProps> = ({ children, title, isOpen, closeModal }) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={closeModal}
      >
        <Container sx={containerChildSx}>
          <Box sx={titleModalContainerSx}>
            <Typography component="h2" sx={titleModalSx}>
              {title}
            </Typography>
            <CloseIcon onClick={closeModal} sx={closeExitIconSx} />
          </Box>
          <Divider variant="middle" sx={dividerSx} />
          {children}
        </Container>
      </Modal>
    </div>
  )
}
