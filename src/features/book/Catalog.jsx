import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Pagination from '../../components/Pagination'
import SearchBar from './SearchBar'
import { getBooks } from './bookApi'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PiBookLight } from "react-icons/pi";

const PlaceholderCover = () => {
  return (
    <div className='h-60 bg-gray-200 flex items-center'>
      <PiBookLight className="text-9xl text-gray-400" />
    </div>
  )
}

// Catalog page
const Catalog = () => {
  const emptyData = {
    books: [],
    totalPages: 0,
    pageNumber: 0
  }

  const [data, setData] = useState(emptyData)

  // ------------------- HANDLE PAGING -------------------
  useEffect(() => {
    getBooks(data.pageNumber).then((data) => {
      if(data != null) {
        setData(data)
      }
      else {
        toast.error("Failed to load data. Please try again later.")
        setData(emptyData)
      }
    })
  }, [data.pageNumber])
  const prevPage = () => {
    if(data.pageNumber > 0) {
      setData({...data, pageNumber: data.pageNumber - 1})
    }
  }
  const nextPage = () => {
    if(data.pageNumber < data.totalPages - 1) {
      setData({...data, pageNumber: data.pageNumber + 1})
    }
  }

  // ------------------- HANDLE SEARCH -------------------
  const filters = ['ISBN', 'name']
  const [selectedFilter, setSelectedFilter] = useState(0)
  const handleSearch = (searchTerm, filterBy) => {
    if(selectedFilter === 0)
      getBooks(data.pageNumber, filterBy, searchTerm).then(res => {
        setData(res)
      })
    else
    getBooks(data.pageNumber, filterBy, searchTerm).then(res => {
      setData(res)
    });
  }


  return (
    <div className='flex flex-col w-full items-center gap-6'>
      {/* <SearchBar className="place-self-end"/> */}
      <SearchBar 
          className="place-self-end"
          filters={filters} 
          onSearch={(searchTerm, filterBy) => handleSearch(searchTerm, filterBy)}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
      <h1 className='text-2xl font-semibold'>CATALOG</h1>
      <div className='grid grid-cols-6 gap-x-10 gap-y-4 max-w-fit'>
        {data.books.map((item) => (
          <Link key={item.isbn} to={`/catalog/${item.isbn}`}>
            <div className='flex flex-col items-center gap-2'>
              <div className='relative'>
                { 
                  item.image === null ? 
                  <PlaceholderCover /> : 
                  <img src={item.image?.secureUrl} alt='book' className='peer h-60 object-cover' />
                }
                <p className='hidden peer-hover:block peer-hover:absolute peer-hover:top-0 peer-hover:right-0 peer-hover:bg-red peer-hover:text-white peer-hover:px-2 peer-hover:py-1'>{item.isbn}</p>
              </div>
              <p className='text-center text-sm'>{item.name}</p>
            </div>
          </Link>
        ))}
      </div>
        <Pagination 
          className={""} 
          numPages={data.totalPages} 
          currentPage={data.pageNumber}
          onPageClick={(page) => {
            setData({...data, pageNumber: page})
          }}
          onPrevClick={prevPage}
          onNextClick={nextPage}
        />
    </div>
  )
}

export default Catalog
