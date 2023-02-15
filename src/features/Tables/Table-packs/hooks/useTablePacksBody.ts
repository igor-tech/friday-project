import { useAppDispatch, useAppSelector, userIdSelector } from '../../../../common'
import { cardPacksSelector } from '../../../../common/selectors/packs-selectors'
import { deletePack, updatePack } from '../../table-slice'

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

  const redactorData = (data: string) => {
    return data
      .slice(0, -14)
      .replace(/(\d+).(\d+).(\d+)/, '$3-$2-$1')
      .replace(/-/g, '.')
  }

  return { redactorData, updateCurrentPack, deleteCurrentPack, myProfileId, cardsPack }
}
