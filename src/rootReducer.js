import { combineReducers } from 'redux'
import menuSlice from './slices/menu'

const rootReducer = combineReducers({
  menu: menuSlice,
})

export default rootReducer
