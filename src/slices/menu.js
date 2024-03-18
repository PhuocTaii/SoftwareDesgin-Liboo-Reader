import { createSlice } from '@reduxjs/toolkit'

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    toggle: false,
    selectedItem: -1,
    selectedActionAuth: 0,
  },
  reducers: {
    setToggle(state, action) {
      state.toggle = !state.toggle
    },
    setSelectedItem(state, action) {
      state.selectedItem = action.payload
    },
    setSelectedActionAuth(state, action) {
      state.selectedActionAuth = action.payload
    },
  },
})

const { actions, reducer } = menuSlice
export const { setToggle, setSelectedItem, setSelectedActionAuth } = actions
export default reducer
