import { setSettingDeleteCardModal, setSettingEditCardModal } from '../../cards-slice'

import {
  appStatusSelector,
  CardsSelector,
  MODAL_TYPE,
  useAppDispatch,
  useAppSelector,
  useModal,
  userIdSelector,
} from 'common'

export const useTableCardsBody = () => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector(CardsSelector)
  const myProfileId = useAppSelector(userIdSelector)
  const statusLoad = useAppSelector(appStatusSelector)

  const { openModal } = useModal()
  const updateCurrentCardHandler = (
    idCard: string,
    question: string,
    answer: string,
    answerImg: string,
    questionImg: string,
    modalType: MODAL_TYPE
  ) => {
    openModal(modalType, 'Edit card')
    dispatch(setSettingEditCardModal({ cardId: idCard, answer, question, answerImg, questionImg }))
  }
  const deleteCurrentCardHandler = (idCard: string, question: string, modalType: MODAL_TYPE) => {
    openModal(modalType, 'Delete card')
    dispatch(setSettingDeleteCardModal({ cardId: idCard, question }))
  }

  return {
    updateCurrentCardHandler,
    deleteCurrentCardHandler,
    myProfileId,
    cards,
    statusLoad,
  }
}
