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

import {
  appStatusSelector,
  GeneralButton,
  MODAL_TYPE,
  packIdSelector,
  PATH,
  useAppSelector,
} from 'common'

export const CardHeaderMenu: React.FC<{
  packName: string
  isMyPack: boolean
  addNewCardHandler: (modalType: string) => void
}> = ({ packName, isMyPack, addNewCardHandler }) => {
  const statusLoad = useAppSelector(appStatusSelector)
  const navigate = useNavigate()
  const cardsPack_id = useAppSelector(packIdSelector)

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
            onClick={() => addNewCardHandler(MODAL_TYPE.addNewCard)}
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
