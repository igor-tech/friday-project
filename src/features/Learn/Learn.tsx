import React, { useEffect } from 'react'

import { Box, Container, Paper, Skeleton, Typography } from '@mui/material'

import { BackToPackList, GeneralButton } from '../../common'
import { getCards } from '../Cards/cards-slice'
import { packNameSx } from '../Cards/Table-cards/CardMenu/CardHeaderMenu/cardHeaderMenu.muiSx'

import { useLearn } from './hooks/useLearn'
import {
  centerTextSx,
  countAttemptSx,
  generalBtn,
  learnContainerSx,
  paperLearnSx,
} from './Learn.muiSx'
import { QuestionAnswer } from './QuestionAnswer'
import { RateLearn } from './RateLearn'

export function Learn() {
  const {
    dispatch,
    id,
    isChecked,
    setIsChecked,
    card,
    setCard,
    getNumberCard,
    grades,
    onNext,
    packName,
    value,
    setFirst,
    first,
    cards,
    onChangeRadio,
    isLoading,
  } = useLearn()

  useEffect(() => {
    if (first) {
      dispatch(getCards())
      setFirst(false)
    }

    if (cards.length > 0) setCard(getNumberCard(cards))
  }, [dispatch, id, cards, first])

  return (
    <Box sx={{ margin: '24px 136px' }}>
      <BackToPackList />

      <Box sx={centerTextSx}>
        {isLoading ? (
          <Skeleton variant="text" animation={'wave'} width={433} height={40} />
        ) : (
          <Typography sx={packNameSx}>{`Learn "${packName}"`}</Typography>
        )}
      </Box>

      <Box sx={paperLearnSx} key={card._id}>
        {isLoading ? (
          <Skeleton variant="rectangular" animation={'wave'} width={433} height={400} />
        ) : (
          <Paper>
            <Container sx={learnContainerSx}>
              <QuestionAnswer name={'Question:'} cardGist={card.question} cardId={card._id} />

              <Typography sx={countAttemptSx}>
                {`Количество попыток ответов на вопрос: ${card.shots}`}
              </Typography>

              {!isChecked ? (
                <GeneralButton
                  name="Show answer"
                  sx={generalBtn}
                  onClick={() => setIsChecked(true)}
                />
              ) : (
                <>
                  <QuestionAnswer name={'Answer:'} cardGist={card.answer} cardId={card._id} />

                  <RateLearn value={value} onChangeRadio={onChangeRadio} grades={grades} />

                  <GeneralButton name="Next" sx={generalBtn} onClick={onNext} />
                </>
              )}
            </Container>
          </Paper>
        )}
      </Box>
    </Box>
  )
}
