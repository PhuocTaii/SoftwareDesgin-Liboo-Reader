// Main layout
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import MenuSidebar from '../components/MenuSidebar'
import React from 'react'
import { useSelector } from 'react-redux'

const MainLayout = () => {
  const { toggle } = useSelector((state) => state.menu)

  return (
    <div className="w-full h-screen flex">
      <MenuSidebar />
      <div
        className={`w-full ${toggle ? 'ml-[12.875rem] w-[calc(100%-12.875rem)]' : ''}`}>
        <Header />
        <div className="mt-14 px-9 pt-2 pb-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default MainLayout
