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

const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        <Route element={<HomeLayout/>}>
          <Route index element={<Home />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="catalog" element={<Catalog />} />
          <Route path="transaction" element={<Transaction />} />
          <Route path="my-account" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
