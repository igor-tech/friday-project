import { useState } from 'react'

import { setSortCards } from '../../cards-slice'

import { useAppDispatch } from 'common'

type TitlePacksType = {
  question: string
  answer: number
  updated: string
  grade: string
}
type OrderSortType = 'asc' | 'desc'
type HeadCell = {
  id: keyof TitlePacksType
  label: string
}

export const useTableCardsHead = () => {
  const dispatch = useAppDispatch()
  const [order, setOrder] = useState<OrderSortType>('desc')
  const [orderBy, setOrderBy] = useState<keyof TitlePacksType>('question')
  const headCells: HeadCell[] = [
    {
      id: 'question',
      label: 'Question',
    },
    {
      id: 'answer',
      label: 'Answer',
    },
    {
      id: 'updated',
      label: 'Last Updated',
    },
    {
      id: 'grade',
      label: 'Grade',
    },
  ]

  const setSortHandler = (property: keyof TitlePacksType) => {
    const isAsc = orderBy === property && order === 'asc'

    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const requestSortHandler = (id: string) => {
    dispatch(setSortCards((order === 'asc' && orderBy === id ? '0' : '1') + id))
  }

  return { order, orderBy, headCells, setSortHandler, requestSortHandler }
}
