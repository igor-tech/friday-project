import { RootState } from '../../App/store'

export const packsSelector = (state: RootState) => state.packs
export const packsQueryParamsSelector = (state: RootState) => state.packs.packsQueryParams
