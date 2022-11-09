/// <reference types="redux-persist" />
import { createSlice, configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit'
import { User } from '@/apis/user'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: null
  },
  reducers: {
    set: (state, action) => void (state.value = action.payload)
  }
})

const signSlice = createSlice({
  name: 'sign',
  initialState: {
    value: false
  },
  reducers: {
    set: (state, action) => void (state.value = action.payload)
  }
})

const reducer = persistReducer( {
    key: 'root',
    storage
  },
  combineReducers({
    user: userSlice.reducer,
    sign: signSlice.reducer
  })
)

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false
  })
})

export const persistor = persistStore(store)

const userStore = {
  set: (value: User) => store.dispatch(userSlice.actions.set(value)),
  get: (): User | null => store.getState().user.value,
  reset: () => store.dispatch(userSlice.actions.set(null)),
  trySign: (flag: boolean) => store.dispatch(signSlice.actions.set(flag)),
  isSignTried: (): boolean => {
    const state = store.getState().sign.value
    store.dispatch(signSlice.actions.set(false))
    return state
  }
}

export default userStore
