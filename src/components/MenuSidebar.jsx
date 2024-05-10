// Menu sidebar component
import logo from '../assets/logo.png'
import { Link, useLocation } from 'react-router-dom'
import { GoBook, GoArrowRight, GoPerson, GoHistory } from 'react-icons/go'
import { MdCardMembership } from "react-icons/md";
import { BiLogOut, BiX } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { setToggle, setSelectedItem } from '../slices/menu'
import { motion } from 'framer-motion'
import {logout} from "../features/auth/authApi"
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa'

const items = [
  {
    icon: <GoBook color="white" size="1.5rem" />,
    text: 'Catalog',
    path: '/catalog',
  },
  {
    icon: <GoArrowRight color="white" size="1.5rem" />,
    text: 'Reserve',
    path: '/transaction',
  },
  {
    icon: <GoHistory color="white" size="1.5rem" />,
    text: 'History',
    path: '/history',
  },
  {
    icon: <GoPerson color="white" size="1.5rem" />,
    text: 'My account',
    path: '/myaccount',
  },
  {
    icon: <MdCardMembership color="white" size="1.5rem" />,
    text: 'Membership',
    path: '/membership',
  },
]

const MenuItem = ({ icon, text, active, onClick }) => {
  return (
    <li
      className={`flex gap-2 px-3 py-2 rounded-l-3xl ${active ? 'bg-orange' : 'hover:bg-orange hover:bg-opacity-30'}`}
      onClick={onClick}>
      {icon}
      <span className="text-white text-base">{text}</span>
    </li>
  )
}

const MenuSidebar = () => {
  const { toggle, selectedItem } = useSelector((state) => state.menu)
  const dispatch = useDispatch()

  const handleToggleMenu = (e) => {
    e.preventDefault()
    dispatch(setToggle())
  }

  const logoutHandle = () => {
    logout(dispatch);
    dispatch(setToggle());
    dispatch(setSelectedItem(-1));
  }

  return (
    <div className="h-screen fixed">
      {toggle && (
        <motion.div
          className="bg-red w-full h-full sm:relative sm:w-[12.875rem]"
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{
            type: 'spring',
            stiffness: 120,
            damping: 20,
            duration: 0.3,
          }}>
          <div className="flex flex-col items-center pt-14 pb-5 h-full">
            <Link
              to="/"
              className="flex items-center gap-3 h-fit"
              >
              <img src={logo} alt="logo" className="w-12 h-12" />
              <p className="text-2xl font-semibold text-lightOrange">LIBOO</p>
            </Link>

            <ul className="flex flex-col gap-3 w-full pl-5 h-full pt-8">
              {items.map((item, index) => {
                return (
                  <Link key={index} to={item.path}>
                    <MenuItem
                      icon={item.icon}
                      text={item.text}
                      active={selectedItem === index}
                    />
                  </Link>
                )
              })}
            </ul>

            <div className="w-full pl-8 text-base space-y-3">
              <hr className="mr-4" />
              <button onClick={logoutHandle} className="flex gap-2">
                <BiLogOut color="white" size="1.5rem" />
                <span className="text-white">Logout</span>
              </button>
              <hr className="mr-4" />
              <Link to="/rules">
                <p 
                  className="font-medium text-white pt-2" 
                  onClick={() => dispatch(setSelectedItem(-1))}
                >LIBOO rules</p>
              </Link>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/profile.php?id=100011493965643"
                  target="_blank"
                  rel="noreferrer">
                  <FaFacebookSquare color="white" size="1.5rem" />
                </a>
                <a href="#">
                  <FaInstagram color="white" size="1.5rem" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <motion.button
        className="absolute top-2 left-4"
        onClick={(e) => handleToggleMenu(e)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ rotate: 360, transition: { duration: 0.5 } }}>
        <BiX size="2.5rem" color="white" />
      </motion.button>
    </div>
  )
}

export { items }
export default MenuSidebar
