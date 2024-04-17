import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import dummyImage from '../../assets/book.png';
import Pagination from '../../components/Pagination'

// Catalog page
const Catalog = () => {
 const [data, setData] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    // Dummy data creation
    const dummyData = Array.from({ length: 24 }, (_, index) => ({
      _id: index + 1,
      name: `Book ${index + 1}`,
      image: dummyImage,
      ISBN: `ISBN-${index + 1}`,
    }));
    setData(dummyData);
  }, []);



  return (
    <div className='flex flex-col w-full items-center gap-6'>
      <h1 className='text-2xl font-semibold'>CATALOG</h1>
      <div className='grid grid-cols-6 gap-x-10 gap-y-4 max-w-fit'>
        {data?.map((item) => (
          <Link key={item._id} to={`/catalog/${item.ISBN}`}>
            <div className='flex flex-col items-center gap-2'>
              <div className='relative'>
                <img src={item.image} alt='book' className='peer h-60 object-cover' />
                <p className='hidden peer-hover:block peer-hover:absolute peer-hover:top-0 peer-hover:right-0 peer-hover:bg-red peer-hover:text-white peer-hover:px-2 peer-hover:py-1'>{item.ISBN}</p>
              </div>
              <p className='text-center text-sm'>{item.name}</p>
            </div>
          </Link>
        ))}
      </div>
        <Pagination />
    </div>
  )
}

export default Catalog
