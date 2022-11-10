import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: false }

const signSlice = createSlice({
  name: 'sign',
  initialState,
  reducers: {
    set: (state, action) => void (state.value = action.payload)
  }
})

export const signActions = signSlice.actions
export default signSlice.reducer
