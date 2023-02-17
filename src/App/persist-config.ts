import storage from 'redux-persist/lib/storage'

export const packsPersistConfig = {
  key: 'packs',
  storage: storage,
  whitelist: ['packsQueryParams'],
}
export const cardsPersistConfig = {
  key: 'cards',
  storage: storage,
  whitelist: ['cardsQueryParams'],
}
export const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['auth', 'recoveryPassword', 'setNewPassword', 'profile', 'app', 'packs', 'cards'],
}
