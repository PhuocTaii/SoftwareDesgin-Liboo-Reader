// Home layout
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import MenuSidebar from '../components/MenuSidebar'
import React from 'react'
import { useSelector } from 'react-redux'
import backgroundImage from '../assets/home.png'


const HomeLayout = () => {
  const { toggle } = useSelector((state) => state.menu)

  return (
    <div className="w-full h-screen flex">
        <img src={backgroundImage} alt="background" className="absolute h-full right-0" style={{ zIndex: -1 }} />
        <MenuSidebar />
        <div
            className={`w-full ${toggle ? 'ml-[12.875rem] w-[calc(100%-12.875rem)]' : ''}`}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Header />
            <div>
                <Outlet />
            </div>
        </div>
    </div>
    
  )
}

export default HomeLayout
