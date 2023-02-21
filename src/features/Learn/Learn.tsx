import React, { useEffect, useState } from 'react'

import { Box, Container, Paper, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

import {
  BackToPackList,
  GeneralButton,
  InitializedLoader,
  SuperRadio,
  useAppDispatch,
  useAppSelector,
} from '../../common'
import { getCards, updateGrade } from '../Cards/cards-slice'
import { packNameSx } from '../Cards/Table-cards/CardMenu/CardHeaderMenu/cardHeaderMenu.muiSx'
import { Cards } from '../Packs/table-api'

import {
  answerSx,
  centerTextSx,
  countAttemptSx,
  learnContainerSx,
  paperLearnSx,
  questionSx,
  rateYouSelfSx,
} from './Learn.muiSx'

const grades = [
  { id: 1, value: 'Did not know' },
  { id: 2, value: 'Forgot' },
  { id: 3, value: 'A lot of thought' },
  { id: 4, value: 'Сonfused' },
  { id: 5, value: 'Knew the answer' },
]

const getNumberCard = (cards: Cards[]) => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
  const rand = Math.random() * sum
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)

      return { sum: newSum, id: newSum < rand ? i : acc.id }
    },
    { sum: 0, id: -1 }
  )

  return cards[res.id + 1]
}

export function Learn() {
  const dispatch = useAppDispatch()
  const status = useAppSelector(state => state.app.status)
  const cards = useAppSelector(state => state.cards.cards)
  const packName = useAppSelector(state => state.cards.packName)
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [first, setFirst] = useState<boolean>(true)
  const [value, setValue] = useState(5)
  const { id } = useParams()
  const [card, setCard] = useState<Cards>({
    _id: 'fake',
    cardsPack_id: '',

    answer: 'answer fake',
    question: 'question fake',
    grade: 0,
    shots: 0,

    type: '',
    rating: 0,
    more_id: '',

    created: '',
    updated: '',
    __v: 0,
    answerImg: '',
    answerVideo: '',
    comments: '',
    questionImg: '',
    questionVideo: '',
    user_id: '',
  })

  useEffect(() => {
    if (first) {
      dispatch(getCards())
      setFirst(false)
    }

    if (cards.length > 0) setCard(getNumberCard(cards))
  }, [dispatch, id, cards, first])

  const onNext = () => {
    dispatch(updateGrade({ grade: value, card_id: card._id }))
    setIsChecked(false)
    setValue(5)
    if (cards.length > 0) {
      setCard(getNumberCard(cards))
    }
    console.log(card._id + ' - ' + value)
  }

  const onChangeRadio = (e: number) => {
    setValue(e)
  }

  if (status === 'loading') {
    return <InitializedLoader />
  }

  return (
    <Box sx={{ margin: '24px 136px' }}>
      <BackToPackList />

      <Box sx={centerTextSx}>
        <Typography sx={packNameSx}>{`Learn "${packName}"`}</Typography>
      </Box>

      <Box sx={paperLearnSx} key={card._id}>
        <Paper>
          <Container sx={learnContainerSx}>
            <Box sx={questionSx}>
              <Typography sx={{ fontWeight: '600' }}>{`Question:`}</Typography>
              <Typography key={card._id}>{card.question}</Typography>
            </Box>

            <Typography
              sx={countAttemptSx}
            >{`Количество попыток ответов на вопрос: ${card.shots}`}</Typography>
            {!isChecked ? (
              <GeneralButton
                name="Show answer"
                sx={{ padding: '8px 36px', marginTop: '30px', marginBottom: '48px' }}
                onClick={() => setIsChecked(true)}
              />
            ) : (
              <>
                <Box sx={answerSx}>
                  <Typography sx={{ fontWeight: '600' }}>{`Answer:`}</Typography>
                  <Typography key={card._id}>{card.answer}</Typography>
                </Box>
                <Box>
                  <Typography sx={rateYouSelfSx}>{`Rate yourself:`}</Typography>
                  <SuperRadio options={grades} onChangeOption={onChangeRadio} value={value} />
                </Box>
                <GeneralButton
                  name="Next"
                  sx={{ padding: '8px 36px', marginTop: '50px', marginBottom: '30px' }}
                  onClick={onNext}
                />
              </>
            )}
          </Container>
        </Paper>
      </Box>
    </Box>
  )
}
