import React from 'react'

import { Box, Container, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import {
  BtnSubmitEmailSx,
  cardContainerSx,
  contentContainerSx,
  imgSx,
  instructionSx,
  titleSx,
} from '../RecoveryPasswordForms.muiSx'

import IEmail from 'assets/img/IEmail.svg'
import { emailSelector, GeneralButton, PATH, useAppSelector } from 'common'

export const CheckEmail = () => {
  const email = useAppSelector(emailSelector)
  const navigate = useNavigate()

  return (
    <Box sx={cardContainerSx}>
      <Paper elevation={3}>
        <Container sx={contentContainerSx}>
          <Typography sx={titleSx} component="h1" variant="h5">
            Check Email
          </Typography>
          <Typography src={IEmail} alt={email} component="img" sx={imgSx} />

          <Typography sx={instructionSx} component="p">
            We’ve sent an Email with instructions to {email}
          </Typography>

          <GeneralButton
            name="Back to login"
            sx={BtnSubmitEmailSx}
            onClick={() => navigate(PATH.LOGIN)}
            fullWidth
          />
        </Container>
      </Paper>
    </Box>
  )
}
