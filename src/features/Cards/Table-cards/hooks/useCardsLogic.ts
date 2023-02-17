import { setBetweenQuestion, setCardQuestion } from '../../cards-slice'

import {
  cardQuestionSelector,
  cardsSelectors,
  cardsTotalCountSelector,
  isCardLoadingSelector,
  myPackUserIdSelector,
  packNameCardSelector,
  pageCardSelector,
  pageCountCardSelector,
  sortCardsSelector,
  useAppDispatch,
  useAppSelector,
  userIdSelector,
} from 'common'

export const useCardsLogic = () => {
  const dispatch = useAppDispatch()
  const card = useAppSelector(cardsSelectors)
  const myProfileId = useAppSelector(userIdSelector)
  const myPackUserId = useAppSelector(myPackUserIdSelector)
  const packName = useAppSelector(packNameCardSelector)
  const sortCard = useAppSelector(sortCardsSelector)
  const page = useAppSelector(pageCardSelector)
  const pageCount = useAppSelector(pageCountCardSelector)
  const searchCardQuestion = useAppSelector(cardQuestionSelector)
  const isCardLoading = useAppSelector(isCardLoadingSelector)
  const cardsTotalCount = useAppSelector(cardsTotalCountSelector)
  const isMy = myProfileId === myPackUserId

  const changePageCallback = (page: number, pageCount: number) => {
    dispatch(setBetweenQuestion({ page: page, pageCount: pageCount }))
  }

  const setSearchCallback = (newPackName: string) => {
    dispatch(setCardQuestion(newPackName))
  }

  return {
    dispatch,
    card,
    packName,
    isMy,
    sortCard,
    page,
    pageCount,
    searchCardQuestion,
    isCardLoading,
    cardsTotalCount,
    changePageCallback,
    setSearchCallback,
  }
}
