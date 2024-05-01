import React from 'react'
import MainLayout from './layouts/Main'
import { Route, Routes } from 'react-router-dom'
import Home from './features/home/Home'
import Catalog from './features/book/Catalog'
import Transaction from './features/transaction/Transaction'
import Profile from './features/profile/Profile'
import AuthLayout from './layouts/Auth'
import HomeLayout from './layouts/Home'
import Login from './features/auth/Login'
import SignUp from './features/auth/SignUp'
import BookDetail from './features/book/Detail'
import History from './features/transaction/History'
import Membership from './features/membership/Membership'
import Rule from './features/rule/Rule'
import PrivateRoute from './routes/PrivateRoute';


const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        <Route element={<PrivateRoute />} >
          <Route element={<HomeLayout/>}>
            <Route index element={<Home />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route path="catalog" element={<Catalog />} />
            <Route path="transaction/:id" element={<Transaction />} />
            <Route path="transaction" element={<Transaction />} />
            <Route path="history" element={<History />} />
            <Route path="myaccount" element={<Profile />} />
            <Route path="membership" element={<Membership />} />
            <Route path="catalog/:id" element={<BookDetail />} />
            <Route path="rules" element={<Rule />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
