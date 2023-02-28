import { useNavigate } from 'react-router-dom'

import { setSettingDeletePackModal, setSettingEditPackModal } from '../../packs-slice'

import {
  appStatusSelector,
  cardPacksSelector,
  MODAL_TYPE,
  myPackUserIdSelector,
  packIdSelector,
  PATH,
  useAppDispatch,
  useAppSelector,
  useModal,
  userIdSelector,
} from 'common'

export const useTablePacksBody = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const myPackUserId = useAppSelector(myPackUserIdSelector)
  const cardsPack = useAppSelector(cardPacksSelector)
  const myProfileId = useAppSelector(userIdSelector)
  const statusLoad = useAppSelector(appStatusSelector)

  const { openModal } = useModal()

  const updateCurrentPackHandler = (
    idPack: string,
    currentNamePack: string,
    currentPrivateStatus: boolean,
    modalType: MODAL_TYPE,
    deckCover: string
  ) => {
    openModal(modalType, 'Edit pack')
    dispatch(
      setSettingEditPackModal({
        packId: idPack,
        packName: currentNamePack,
        privateStatus: currentPrivateStatus,
        deckCover: deckCover,
      })
    )
  }

  const deleteCurrentPack = (idPack: string, currentNamePack: string, modalType: MODAL_TYPE) => {
    openModal(modalType, 'Delete Pack')
    dispatch(setSettingDeletePackModal({ packId: idPack, packName: currentNamePack }))
  }
  const cardsPack_id = useAppSelector(packIdSelector)

  const learnPack = (pathId: string) => {
    navigate(`${PATH.LEARN}/${pathId}`)
  }

  return {
    learnPack,
    cardsPack_id,
    myProfileId,
    cardsPack,
    statusLoad,
    myPackUserId,
    deleteCurrentPack,
    updateCurrentPackHandler,
  }
}
