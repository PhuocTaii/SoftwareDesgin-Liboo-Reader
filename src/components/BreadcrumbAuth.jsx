import { Breadcrumbs } from '@material-tailwind/react'
import { useLocation } from 'react-router-dom'

const BreadcrumbAuth = () => {
  const location = useLocation()

  return (
    <Breadcrumbs
      separator={<div className="w-3"></div>}
      className="bg-transparent">
      <div
        className="hover:text-red">
        <a
          href="/login"
          className={`text-base opacity-60 ${location.pathname === '/login' && 'text-red'}`}>
          Log In
        </a>
        {location.pathname === '/login' && <hr className="h-[3px] bg-red" />}
      </div>
      <div
        className="hover:text-red">
        <a
          href="/signup"
          className={`text-base opacity-60 ${location.pathname === '/signup' && 'text-red'}`}>
          Sign Up
        </a>
        {location.pathname === '/signup' && <hr className="h-[3px] bg-red" />}
      </div>
    </Breadcrumbs>
  )
}

export default BreadcrumbAuth
