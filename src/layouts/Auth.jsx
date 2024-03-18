// Auth layout
import React from 'react'
import { Outlet } from 'react-router-dom'
import logo from '../assets/logo.png'
import bgAuth from '../assets/auth.png'
import BreadcrumbAuth from '../components/BreadcrumbAuth'

const AuthLayout = () => {
  return (
    <div className="bg-lightOrange w-full h-screen overflow-y-hidden grid grid-cols-2">
      <div className="h-full bg-white flex flex-col items-center justify-center py-10 px-5 gap-5 md:rounded-r-[30px]">
        {/*  TITLE */}
        <div className="flex items-center gap-5 mb-10">
          <div className="bg-red rounded-full w-fit h-fit p-2">
            <img src={logo} alt="logo" className="w-[50px] h-auto" />
          </div>
          <p className="font-semibold text-2xl">
            Welcome to <span className="text-red">LIBOO</span>
          </p>
        </div>
        {/*  Breadcrumbs */}
        <BreadcrumbAuth />

        {/*  FORM */}
        <Outlet />
      </div>

      <div className="relative w-full flex justify-end content-center shrink-0">
        <img src={bgAuth} alt="background" className="absolute h-full" />
      </div>
    </div>
  )
}

export default AuthLayout
