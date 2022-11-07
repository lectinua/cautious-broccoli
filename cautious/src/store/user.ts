import { createSlice, configureStore } from '@reduxjs/toolkit'

export interface User {
  email: string
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: null
  },
  reducers: {
    set: (state, action) => void(state.value = action.payload)
  }
})

const store = configureStore({
  reducer: userSlice.reducer
})

const userStore = {
  set: (value: User) => store.dispatch(userSlice.actions.set(value)),
  reset: () => store.dispatch(userSlice.actions.set(null)),
  connect: (listener: (user: User | null) => void) => store.subscribe(() => listener(store.getState().value))
}

export default userStore
