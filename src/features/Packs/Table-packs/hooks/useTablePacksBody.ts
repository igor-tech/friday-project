import { useNavigate } from 'react-router-dom'

import { deletePack, updatePack } from '../../packs-slice'

import {
  appStatusSelector,
  cardPacksSelector,
  myPackUserIdSelector,
  packIdSelector,
  PATH,
  useAppDispatch,
  useAppSelector,
  userIdSelector,
} from 'common'

export const useTablePacksBody = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const myPackUserId = useAppSelector(myPackUserIdSelector)
  const cardsPack = useAppSelector(cardPacksSelector)
  const myProfileId = useAppSelector(userIdSelector)
  const statusLoad = useAppSelector(appStatusSelector)
  const deleteCurrentPack = (idPack: string) => {
    dispatch(deletePack(idPack))
  }
  const updateCurrentPack = (idPack: string) => {
    const updateCurrentPack = {
      _id: idPack,
      name: 'Name Update',
    }

    dispatch(updatePack(updateCurrentPack))
  }
  const cardsPack_id = useAppSelector(packIdSelector)

  const learnPack = () => {
    navigate(`${PATH.LEARN}/${cardsPack_id}`)
  }

  return {
    learnPack,
    cardsPack_id,
    updateCurrentPack,
    deleteCurrentPack,
    myProfileId,
    cardsPack,
    statusLoad,
    navigate,
    myPackUserId,
  }
}
