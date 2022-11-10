import { createSlice } from '@reduxjs/toolkit'
import { User } from '@supabase/supabase-js'

export type UserWithRole = User & { role_id: number }

const initialState = { value: null as UserWithRole | null }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set: (state, action) => void (state.value = action.payload)
  }
})

export const userActions = userSlice.actions
export default userSlice.reducer
