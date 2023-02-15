import { useAppDispatch, useAppSelector } from '../../../../common'

export const useTableCards = () => {
  const dispatch = useAppDispatch()
  const card = useAppSelector(state => state.cards.cards)
  const myProfileId = useAppSelector(state => state.profile.user._id)
  const myPackUserId = useAppSelector(state => state.cards.packUserId)
  const packName = useAppSelector(state => state.cards.packName)
  const isMy = myProfileId === myPackUserId

  return { dispatch, card, packName, isMy }
}
