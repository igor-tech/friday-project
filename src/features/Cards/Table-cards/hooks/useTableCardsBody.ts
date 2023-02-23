import { setSettingDeleteCardModal, setSettingEditCardModal } from '../../cards-slice'

import {
  appStatusSelector,
  CardsSelector,
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
    modalType: string
  ) => {
    openModal(modalType, 'Edit card')
    dispatch(setSettingEditCardModal({ cardId: idCard, answer, question }))
  }
  const deleteCurrentCardHandler = (idCard: string, question: string, modalType: string) => {
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
