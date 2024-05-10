import React from 'react'
import {BiChevronRight} from 'react-icons/bi'
import CustomButton from '../../components/CustomButton'
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSelectedItem } from '../../slices/menu';

const Home = () => {
  const dispatch = useDispatch()
  dispatch(setSelectedItem(-1))

  const navigate = useNavigate();

  const navigateToCatalog = () => {
    navigate('/Catalog')
  }

  return (
    <div className='flex relative w-full h-full bg-bg1 bg-right bg-contain bg-no-repeat'>
      <div className='self-center w-1/2 space-y-8 pl-16'>
        <p className='text-[80px] text-red font-semibold mb-8'>LIBOO</p>
        <p className='text-justify text-lg'>LIBOO is not only a repository of information but also a vibrant community hub where individuals of all ages can come together to read, study, research, and connect. Join us in this virtual realm of literary exploration and convenience, where your love for books meets the convenience of the digital age.</p>
        <CustomButton classes='w-32' label='Explore' icon={<BiChevronRight color='white' size='1.5rem' />} onClick={navigateToCatalog} />
      </div>
    </div>
  )
}

export default Home