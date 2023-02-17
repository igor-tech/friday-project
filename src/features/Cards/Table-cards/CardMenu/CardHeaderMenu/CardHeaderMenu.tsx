import React from 'react'

import { Box, Typography } from '@mui/material'

import { DropDownMenu } from '../DropDownMenu/DropDownMenu'

import {
  btnCardMenuSx,
  containerCardMenuSx,
  containerPackMenuSx,
  packNameSx,
} from './cardHeaderMenu.muiSx'

import { GeneralButton } from 'common'

export const CardHeaderMenu: React.FC<{
  packName: string
  isMyPack: boolean
  addNewCard: () => void
}> = ({ packName, isMyPack, addNewCard }) => {
  return (
    <Box sx={containerCardMenuSx}>
      {isMyPack && (
        <>
          <Box sx={containerPackMenuSx}>
            <Typography sx={packNameSx}>{packName}</Typography>
            <DropDownMenu />
          </Box>
          <GeneralButton name="Add new card" sx={btnCardMenuSx} onClick={addNewCard} />
        </>
      )}

      {!isMyPack && (
        <>
          <Typography sx={packNameSx}>{packName}</Typography>
          <GeneralButton name="Learn to pack" sx={btnCardMenuSx} />
        </>
      )}
    </Box>
  )
}
