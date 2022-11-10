import { createSlice } from '@reduxjs/toolkit'
import { Menu } from '@/apis/menu'

const initialState = { value: [] as Menu[] }

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    set: (state, action) => void (state.value = action.payload)
  }
})

export const menuActions = menuSlice.actions
export default menuSlice.reducer
