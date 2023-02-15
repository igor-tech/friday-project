import React from 'react'

import { Box, Typography } from '@mui/material'

import { GeneralButton } from '../../../../common'

import { DropDownMenu } from './DropDownMenu'

const containerCardMenuSx = { marginTop: '27px', display: 'flex', justifyContent: 'space-between' }
const containerPackMenuSx = { display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }
const packNameSx = { fontWeight: '600', fontSize: '22px', lineHeight: '27px', color: '#000000' }
const btnCardMenuSx = { padding: '8px 36px' }

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
