import { deletePack, updatePack } from '../../table-slice'

import { useAppDispatch, useAppSelector, userIdSelector, cardPacksSelector } from 'common'

export const useTablePacksBody = () => {
  const dispatch = useAppDispatch()
  const cardsPack = useAppSelector(cardPacksSelector)
  const myProfileId = useAppSelector(userIdSelector)
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

  return { updateCurrentPack, deleteCurrentPack, myProfileId, cardsPack }
}
