import React from 'react'

import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { DropDownMenu } from '../DropDownMenu/DropDownMenu'

import {
  btnCardMenuSx,
  containerCardMenuSx,
  containerPackMenuSx,
  packNameSx,
} from './cardHeaderMenu.muiSx'

import { appStatusSelector, GeneralButton, PATH, useAppSelector } from 'common'

export const CardHeaderMenu: React.FC<{
  packName: string
  isMyPack: boolean
  addNewCard: () => void
}> = ({ packName, isMyPack, addNewCard }) => {
  const statusLoad = useAppSelector(appStatusSelector)
  const navigate = useNavigate()
  const cardsPack_id = useAppSelector(state => state.cards.cardsQueryParams.cardsPack_id)

  const learnPack = () => {
    navigate(`${PATH.LEARN}/${cardsPack_id}`)
  }

  return (
    <Box sx={containerCardMenuSx}>
      {isMyPack && (
        <>
          <Box sx={containerPackMenuSx}>
            <Typography sx={packNameSx}>{packName}</Typography>
            <DropDownMenu />
          </Box>
          <GeneralButton
            name="Add new card"
            sx={btnCardMenuSx}
            onClick={addNewCard}
            disabled={statusLoad === 'loading'}
          />
        </>
      )}

      {!isMyPack && (
        <>
          <Typography sx={packNameSx}>{packName}</Typography>
          <GeneralButton
            name="Learn to pack"
            sx={btnCardMenuSx}
            disabled={statusLoad === 'loading'}
            onClick={learnPack}
          />
        </>
      )}
    </Box>
  )
}
