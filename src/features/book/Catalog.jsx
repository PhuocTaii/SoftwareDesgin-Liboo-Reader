import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Pagination from '../../components/Pagination'
import SearchBar from './SearchBar'
import { getBooks } from './bookApi'

// Catalog page
const Catalog = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // ------------------- HANDLE PAGING -------------------
  useEffect(() => {
    getBooks(currentPage).then((data) => {
      if(data != null) {
        setTotalPages(data.totalPages)
        setData(data.books)
      }
      else {
        setTotalPages(1)
        setData([])
      }
    })
  }, [currentPage])
  const prevPage = () => {
    if(currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }
  const nextPage = () => {
    if(currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div className='flex flex-col w-full items-center gap-6'>
      <SearchBar className="place-self-end"/>
      <h1 className='text-2xl font-semibold'>CATALOG</h1>
      <div className='grid grid-cols-6 gap-x-10 gap-y-4 max-w-fit'>
        {data?.map((item) => (
          <Link key={item.isbn} to={`/catalog/${item.isbn}`}>
            <div className='flex flex-col items-center gap-2'>
              <div className='relative'>
                <img src={item.image.secureUrl} alt='book' className='peer h-60 object-cover' />
                <p className='hidden peer-hover:block peer-hover:absolute peer-hover:top-0 peer-hover:right-0 peer-hover:bg-red peer-hover:text-white peer-hover:px-2 peer-hover:py-1'>{item.isbn}</p>
              </div>
              <p className='text-center text-sm'>{item.name}</p>
            </div>
          </Link>
        ))}
      </div>
        <Pagination 
          className={"mx-auto w-fit"} 
          numPages={totalPages} 
          currentPage={currentPage}
          onPageClick={(page) => setCurrentPage(page)}
          onPrevClick={prevPage}
          onNextClick={nextPage}
        />
    </div>
  )
}

export default Catalog
