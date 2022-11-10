import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import userReducer from '@/store/user'
import signReducer from '@/store/sign'
import menuReducer from '@/store/menu'

const rootReducer = combineReducers({
  user: userReducer,
  sign: signReducer,
  menu: menuReducer
})

const reducer = persistReducer({
    key: 'root',
    storage
  },
  rootReducer
)

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false
  })
})

export type RootState = ReturnType<typeof rootReducer>
export const persistor = persistStore(store)
