import React from 'react'

import { Box, Typography } from '@mui/material'

import { GeneralButton, useAppDispatch } from '../../../../common'
import { createNewCard } from '../cards-slice'
import { indentBtn, largeText, lightText, locationText, marginBox } from '../Cards.muiSx'

export const EmptyPacks: React.FC<{ packName: string; isMyPack: boolean }> = ({
  packName,
  isMyPack,
}) => {
  const dispatch = useAppDispatch()
  const addNewCard = () => {
    dispatch(createNewCard({}))
  }

  return (
    <Box sx={marginBox}>
      <Typography sx={largeText} component="h2">
        {packName}
      </Typography>
      <Box sx={locationText}>
        {isMyPack && (
          <>
            <Typography component="p" sx={lightText}>
              This pack is empty. Click add new card to fill this pack
            </Typography>
            <GeneralButton sx={indentBtn} name="Add new card" onClick={addNewCard} />
          </>
        )}

        {!isMyPack && (
          <>
            <Typography component="p" sx={lightText}>
              This pack is empty
            </Typography>
          </>
        )}
      </Box>
    </Box>
  )
}
