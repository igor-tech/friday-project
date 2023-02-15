import React from 'react'

import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { GeneralButton, PATH } from '../../../common'

import { BackToPackList } from './BackToPackList'

const containerPackMenuSx = { margin: '24px 136px' }
const containerMyPackMenuSx = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '86px',
}
const packNameSx = {
  fontWeight: '600',
  fontSize: '22px',
  lineHeight: '27px',
  color: '#000000',
  marginTop: '27px',
}
const warningTitleSx = {
  fontSize: '16px',
  lineHeight: '20px',
  fontWeight: '400',
  opacity: '0.5',
  color: '#000000',
}
const btnSx = { padding: '8px 28px', marginTop: '32px' }

export const EmptyPackMenu: React.FC<{
  packName: string
  isMyPack: boolean
  addNewCard: () => void
}> = ({ packName, isMyPack, addNewCard }) => {
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
            <GeneralButton sx={btnSx} name="Add new card" onClick={addNewCard} />
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
