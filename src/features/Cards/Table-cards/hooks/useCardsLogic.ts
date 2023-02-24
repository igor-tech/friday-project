import { setBetweenQuestion, setCardQuestion } from '../../cards-slice'

import {
  cardQuestionSelector,
  cardsTotalCountSelector,
  emptyCardSelector,
  emptySearchCardSelector,
  isCardLoadingSelector,
  MODAL_TYPE,
  myPackUserIdSelector,
  packNameCardSelector,
  pageCardSelector,
  pageCountCardSelector,
  sortCardsSelector,
  useAppDispatch,
  useAppSelector,
  useModal,
  userIdSelector,
} from 'common'

export const useCardsLogic = () => {
  const dispatch = useAppDispatch()
  const myProfileId = useAppSelector(userIdSelector)
  const myPackUserId = useAppSelector(myPackUserIdSelector)
  const packName = useAppSelector(packNameCardSelector)
  const sortCard = useAppSelector(sortCardsSelector)
  const page = useAppSelector(pageCardSelector)
  const pageCount = useAppSelector(pageCountCardSelector)
  const searchCardQuestion = useAppSelector(cardQuestionSelector)
  const isCardLoading = useAppSelector(isCardLoadingSelector)
  const cardsTotalCount = useAppSelector(cardsTotalCountSelector)
  const emptyCard = useAppSelector(emptyCardSelector)
  const emptySearchCard = useAppSelector(emptySearchCardSelector)
  const isMy = myProfileId === myPackUserId

  const changePageCallback = (page: number, pageCount: number) => {
    dispatch(setBetweenQuestion({ page: page, pageCount: pageCount }))
  }

  const setSearchCallback = (newPackName: string) => {
    dispatch(setCardQuestion(newPackName))
  }

  const { openModal } = useModal()

  const addNewCardHandler = (modalType: MODAL_TYPE) => {
    openModal(modalType, 'Add new card')
  }

  return {
    dispatch,

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
    addNewCardHandler,
    emptyCard,
    emptySearchCard,
  }
}
