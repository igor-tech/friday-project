import React, { useState } from 'react'

import { SchoolOutlined, EditOutlined, DeleteOutlined } from '@mui/icons-material'
import { Box, Typography, Tooltip, MenuItem, Menu, ListItemIcon, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import moreVert from '../../../../../assets/img/moreVert.svg'
import { deleteCardPack, updateCardPack } from '../../../cards-slice'

import {
  containerPackMenuSx,
  iconButtonSx,
  menuPaperPropsSx,
  moreVertSx,
} from './dropDownMenu.muiSx'

import { packIdSelector, PATH, useAppDispatch, useAppSelector } from 'common'

export const DropDownMenu = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const packId = useAppSelector(packIdSelector)
  const cardsPack_id = useAppSelector(packIdSelector)

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const learnPack = () => {
    navigate(`${PATH.LEARN}/${cardsPack_id}`)
    setAnchorEl(null)
  }

  const editCurrentPackCard = () => {
    const updateCurrentPack = {
      _id: packId,
      name: 'Pack Update',
    }

    dispatch(updateCardPack(updateCurrentPack))
    setAnchorEl(null)
  }
  const deleteCurrentPackCard = () => {
    dispatch(deleteCardPack(packId))
      .unwrap()
      .then(() => {
        navigate(PATH.PACKS)
      })
    setAnchorEl(null)
  }

  return (
    <>
      <Box sx={containerPackMenuSx}>
        <Tooltip title="pack settings" placement="top">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={iconButtonSx}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Typography component="img" src={moreVert} sx={moreVertSx} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={menuPaperPropsSx}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={editCurrentPackCard}>
          <ListItemIcon>
            <EditOutlined fontSize="small" />
          </ListItemIcon>
          <Typography component="p">Edit</Typography>
        </MenuItem>
        <MenuItem onClick={deleteCurrentPackCard}>
          <ListItemIcon>
            <DeleteOutlined fontSize="small" />
          </ListItemIcon>
          <Typography component="p">Delete</Typography>
        </MenuItem>
        <MenuItem onClick={learnPack}>
          <ListItemIcon>
            <SchoolOutlined fontSize="small" />
          </ListItemIcon>
          <Typography component="p">Learn</Typography>
        </MenuItem>
      </Menu>
    </>
  )
}
