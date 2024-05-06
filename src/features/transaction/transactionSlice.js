import { createSlice } from '@reduxjs/toolkit'

const initialState = {
}

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
  }
})

export const actions = transactionSlice.actions
export default transactionSlice.reducer