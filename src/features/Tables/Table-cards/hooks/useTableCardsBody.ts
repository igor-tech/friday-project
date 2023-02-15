import { useAppDispatch, useAppSelector, userIdSelector } from '../../../../common'
import { CardsSelector } from '../../../../common/selectors/packs-selectors'
import { deleteCard, updateCard } from '../cards-slice'

export const useTableCardsBody = () => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector(CardsSelector)
  const myProfileId = useAppSelector(userIdSelector)
  const deleteCurrentCard = (idCard: string) => {
    dispatch(deleteCard({ id: idCard }))
  }
  const updateCurrentCard = (idCard: string) => {
    const updateCurrentPack = {
      _id: idCard,
      question: 'question updated',
    }

    dispatch(updateCard({ _id: updateCurrentPack._id, question: updateCurrentPack.question }))
  }

  const redactorData = (data: string) => {
    return data
      .slice(0, -14)
      .replace(/(\d+).(\d+).(\d+)/, '$3-$2-$1')
      .replace(/-/g, '.')
  }

  return { redactorData, updateCurrentCard, deleteCurrentCard, myProfileId, cards }
}
