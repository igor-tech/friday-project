import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { ThunkDispatch } from 'redux-thunk'

import { authReducer } from '../features/Auth/auth-slice'
import { setNewPasswordReducer } from '../features/Auth/RecoveryPasswordForms/NewPassword/newPassword-slice'
import { recoveryPasswordReducer } from '../features/Auth/RecoveryPasswordForms/RecoveryPassword/recovery-password-slice'
import { CardsReducer } from '../features/Cards/cards-slice'
import { packsReducer } from '../features/Packs/packs-slice'
import { profileReducer } from '../features/Profile/profile-slice'

import { appReducer } from './app-slice'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  auth: authReducer,
  recoveryPassword: recoveryPasswordReducer,
  setNewPassword: setNewPasswordReducer,
  profile: profileReducer,
  app: appReducer,
  packs: packsReducer,
  cards: CardsReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === 'development',
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>
