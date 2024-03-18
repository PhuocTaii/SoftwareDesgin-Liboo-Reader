import { Breadcrumbs } from '@material-tailwind/react'
import { setSelectedActionAuth } from '../slices/menu'
import { useDispatch, useSelector } from 'react-redux'

const BreadcrumbAuth = () => {
  const { selectedActionAuth } = useSelector((state) => state.menu)
  const dispatch = useDispatch()

  return (
    <Breadcrumbs
      separator={<div className="w-3"></div>}
      className="bg-transparent">
      <div
        className="hover:text-red"
        onClick={() => dispatch(setSelectedActionAuth(0))}>
        <a
          href="/login"
          className={`text-base opacity-60 ${selectedActionAuth === 0 && 'text-red'}`}>
          Log In
        </a>
        {selectedActionAuth === 0 && <hr className="h-[3px] bg-red" />}
      </div>
      <div
        className="hover:text-red"
        onClick={() => dispatch(setSelectedActionAuth(1))}>
        <a
          href="/sign-up"
          className={`text-base opacity-60 ${selectedActionAuth === 1 && 'text-red'}`}>
          Sign Up
        </a>
        {selectedActionAuth === 1 && <hr className="h-[3px] bg-red" />}
      </div>
    </Breadcrumbs>
  )
}

export default BreadcrumbAuth
