import React from 'react'

import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import {
  btnSx,
  containerMyPackMenuSx,
  containerPackMenuSx,
  packNameSx,
  warningTitleSx,
} from './emptyPackMenu.muiSx'

import { BackToPackList, GeneralButton, MODAL_TYPE, PATH } from 'common'

export const EmptyPackMenu: React.FC<{
  packName: string
  isMyPack: boolean
  addNewCardHandler: (modalType: string) => void
}> = ({ packName, isMyPack, addNewCardHandler }) => {
  const navigate = useNavigate()

  return (
    <Box sx={containerPackMenuSx}>
      <BackToPackList />
      <Typography sx={packNameSx} component="h2">
        {packName}
      </Typography>
      <Box sx={containerMyPackMenuSx}>
        {isMyPack && (
          <>
            <Typography component="p" sx={warningTitleSx}>
              This pack is empty. Click add new card to fill this pack
            </Typography>
            <GeneralButton
              sx={btnSx}
              name="Add new card"
              onClick={() => addNewCardHandler(MODAL_TYPE.addNewCard)}
            />
          </>
        )}

        {!isMyPack && (
          <>
            <Typography component="p" sx={warningTitleSx}>
              This pack is empty
            </Typography>
            <GeneralButton
              sx={btnSx}
              name="Back to Pack List"
              onClick={() => navigate(PATH.PACKS)}
            />
          </>
        )}
      </Box>
    </Box>
  )
}
