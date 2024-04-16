import { motion } from 'framer-motion'
import { setToggle } from '../slices/menu'
import { useDispatch, useSelector } from 'react-redux'
import { BiMenu } from 'react-icons/bi'
import SearchBar from './SearchBar'

const Header = () => {
  const { toggle } = useSelector((state) => state.menu)
  const dispatch = useDispatch()

  const handleToggleMenu = (e) => {
    e.preventDefault()
    dispatch(setToggle())
  }

  return (
    <div
      className={`h-14 w-full ${toggle ? '!w-[calc(100%-12.875rem)]' : ''} fixed top-0 flex justify-between items-center px-9 bg-white z-50`}>
      <motion.button
        className=""
        onClick={(e) => handleToggleMenu(e)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ rotate: 360, transition: { duration: 0.5 } }}>
        {!toggle && <BiMenu size="2rem" color="black" />}
      </motion.button>
      <SearchBar className="" />
    </div>
  )
}

export default Header
