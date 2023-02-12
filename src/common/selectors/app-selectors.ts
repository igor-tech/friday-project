import { RootState } from '../../App/store'

export const appStatusSelector = (state: RootState) => state.app.status
export const isInitializedSelector = (state: RootState) => state.app.isInitialized
export const appMessageSelector = (state: RootState) => state.app.message
