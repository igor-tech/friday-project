import { setPaginationValue } from '../../packs-slice'

import {
  useModal,
  appStatusSelector,
  cardPacksSelector,
  cardPacksTotalCountSelector,
  isPacksLoadingSelector,
  packNameSelector,
  packsQueryParamsSelector,
  pageCountSelector,
  pageSelector,
  useAppDispatch,
  useAppSelector,
  MODAL_TYPE,
} from 'common'

export const usePacksLogic = () => {
  const dispatch = useAppDispatch()
  const packsQueryParams = useAppSelector(packsQueryParamsSelector)

  const packs = useAppSelector(cardPacksSelector)
  const page = useAppSelector(pageSelector)
  const pageCount = useAppSelector(pageCountSelector)
  const cardPacksTotalCount = useAppSelector(cardPacksTotalCountSelector)

  const searchPackNameParam = useAppSelector(packNameSelector)

  const isPacksLoad = useAppSelector(isPacksLoadingSelector)
  const statusLoad = useAppSelector(appStatusSelector)

  const changePageCallback = (page: number, pageCount: number) => {
    dispatch(setPaginationValue({ page, pageCount }))
  }

  const { openModal } = useModal()
  const addNewPackHandler = (typeModal: MODAL_TYPE) => {
    openModal(typeModal, 'Add new pack')
  }

  return {
    dispatch,
    packsQueryParams,
    packs,
    page,
    pageCount,
    cardPacksTotalCount,
    searchPackNameParam,
    isPacksLoad,
    statusLoad,
    changePageCallback,
    openModal,
    addNewPackHandler,
  }
}
