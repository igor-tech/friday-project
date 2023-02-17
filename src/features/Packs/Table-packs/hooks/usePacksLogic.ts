import {
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
} from '../../../../common'
import { createNewPack, setPaginationValue } from '../../packs-slice'

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

  const addNewPack = () => {
    const dataParams = {
      name: `New Pack Name`,
      deckCover: '',
      private: false,
    }

    dispatch(createNewPack(dataParams))
  }

  const changePageCallback = (page: number, pageCount: number) => {
    dispatch(setPaginationValue({ page, pageCount }))
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
    addNewPack,
    changePageCallback,
  }
}
