import { setSettingDeletePackModal, setSettingEditPackModal } from '../../packs-slice'

import {
  appStatusSelector,
  cardPacksSelector,
  useAppDispatch,
  useAppSelector,
  useModal,
  userIdSelector,
} from 'common'

export const useTablePacksBody = () => {
  const dispatch = useAppDispatch()
  const cardsPack = useAppSelector(cardPacksSelector)
  const myProfileId = useAppSelector(userIdSelector)
  const statusLoad = useAppSelector(appStatusSelector)

  const { openModal } = useModal()

  const updateCurrentPackHandler = (
    idPack: string,
    currentNamePack: string,
    currentPrivateStatus: boolean,
    modalType: string
  ) => {
    openModal(modalType, 'Edit pack')
    dispatch(
      setSettingEditPackModal({
        packId: idPack,
        packName: currentNamePack,
        privateStatus: currentPrivateStatus,
      })
    )
  }

  const deleteCurrentPack = (idPack: string, currentNamePack: string, modalType: string) => {
    openModal(modalType, 'Delete Pack')
    dispatch(setSettingDeletePackModal({ packId: idPack, packName: currentNamePack }))
  }

  return {
    deleteCurrentPack,
    myProfileId,
    cardsPack,
    statusLoad,
    updateCurrentPackHandler,
  }
}
