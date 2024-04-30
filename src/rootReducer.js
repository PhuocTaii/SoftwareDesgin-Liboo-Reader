import { combineReducers } from 'redux'
import menuSlice from './slices/menu'
import authSlice from './features/auth/authSlice'
// import bookSlice from './features/book/bookSlice'
// import membershipSlice from './features/membership/membershipSlice'
// import transactionSlice from './features/transaction/transactionSlice'

const rootReducer = combineReducers({
  menu: menuSlice,
  auth: authSlice,
  // book: bookSlice,
  // membership: membershipSlice,
  // transaction: transactionSlice,
})

export default rootReducer
