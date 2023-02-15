import React, { useState } from 'react'

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import { Box, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import { useNavigate } from 'react-router-dom'

import moreVert from '../../../../assets/img/moreVert.svg'
import { PATH, useAppDispatch, useAppSelector } from '../../../../common'
import { deleteCardPack, updateCardPack } from '../cards-slice'
const containerPackMenuSx = { display: 'flex', alignItems: 'center', textAlign: 'center' }
const iconButtonSx = {
  ml: 2,
  '&.MuiIconButton-root': {
    padding: 0,
    marginLeft: '9px',
    marginTop: '2px',
  },
}
const moreVertSx = { width: 24, height: 24 }
const menuPaperPropsSx = {
  elevation: 0,
  sx: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 24,
      height: 24,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
}

export const DropDownMenu = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const packId = useAppSelector(state => state.cards.cardsQueryParams.cardsPack_id)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
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
            <EditOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <Typography component="p">Edit</Typography>
        </MenuItem>
        <MenuItem onClick={deleteCurrentPackCard}>
          <ListItemIcon>
            <DeleteOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <Typography component="p">Delete</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <SchoolOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <Typography component="p">Learn</Typography>
        </MenuItem>
      </Menu>
    </>
  )
}
