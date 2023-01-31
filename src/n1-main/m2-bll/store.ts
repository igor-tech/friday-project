import {combineReducers, legacy_createStore} from 'redux';
import {profileReducer} from './profile-reducer';
import {authReducer} from './auth-reducer';

const rootReducer = combineReducers({
    profile: profileReducer,
    auth: authReducer
})


export const store = legacy_createStore(rootReducer)

export type RootStateType = ReturnType<typeof rootReducer>



//@ts-ignore
window.store = store