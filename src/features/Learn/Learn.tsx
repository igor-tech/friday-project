import React, { useEffect } from 'react'

import { Box, Container, Paper, Skeleton, Typography } from '@mui/material'

import { getCards, setPacksCardId } from '../Cards/cards-slice'
import { packNameSx } from '../Cards/Table-cards/CardMenu/CardHeaderMenu/cardHeaderMenu.muiSx'

import { CustomQuestion } from './CustomQuestion'
import { useLearn } from './hooks/useLearn'
import {
  centerTextSx,
  countAttemptSx,
  generalBtn,
  learnBlockSx,
  learnContainerSx,
  paperLearnSx,
} from './Learn.muiSx'
import { RateLearn } from './RateLearn'

import { BackToPackList, GeneralButton } from 'common'

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
      dispatch(setPacksCardId(id))
      dispatch(getCards())
      setFirst(false)
    }

    if (cards.length > 0) setCard(getNumberCard(cards))
  }, [dispatch, id, cards, first])

  return (
    <Box sx={learnBlockSx}>
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
              <CustomQuestion
                name={'Question:'}
                cardGist={card.question}
                cardId={card._id}
                img={card.questionImg}
              />

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
                  <CustomQuestion
                    name={'Answer:'}
                    cardGist={card.answer}
                    cardId={card._id}
                    img={card.answerImg}
                  />

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
