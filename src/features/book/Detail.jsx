import React, {useEffect, useState} from 'react'
import dummyImage from '../../assets/book.png';
import CustomButton from '../../components/CustomButton'
import {BiChevronUp, BiChevronDown} from 'react-icons/bi'
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { getBookByIsbn } from './bookApi'

// Book detail page
const Detail = () => {
  const { id } = useParams();

  const [expanded, setExpanded] = useState(false);
  const [currentBook, setCurrentBook] = useState(null)

  useEffect(() => {
    getBookByIsbn(id).then((data) => {
      if(data != null) {
        setCurrentBook(data)
      }
      else {
        setCurrentBook(null)
      }
    })
  }, [])

  const navigate = useNavigate();

  const gotoBorrow = () => {
      navigate(`/transaction`, { state: { currentIsbn: currentBook.isbn } })
  }
  
  return (
      <div className='w-full h-full space-y-3 py-2 pr-4 pl-3'>
      {currentBook &&
      <div className='w-full flex gap-4 h-fit'>
        <img src={currentBook.image?.secureUrl} alt="book" className='w-40 h-auto object-contain place-self-start shrink-0' />
        
        {/* Detail */}
        <div className='w-full space-y-2'>
          <h1 className='text-2xl font-semibold'>{currentBook.name}</h1>
          <p className='text-lg'>ISBN: <span className='font-medium text-red'>{currentBook.isbn}</span></p>
          <p> Author: {currentBook.author.name} </p>
          <p> Publisher: {currentBook.publisher.name} </p>
          <p> Publish year: {currentBook.publishYear} </p>
          <p> Genre: {currentBook.genres?.map(obj => obj.name).join(', ')} </p>
          <p> Price: {currentBook.price} VND </p>
          <div>
            <p className='font-medium'>Description:</p>
            <p className={`text-justify ${expanded ? 'line-clamp-none' : 'line-clamp-4'}`}>{currentBook.description}</p>
            <button
              onClick={() => setExpanded(!expanded)}
              className='space-x-1'
            >
              <span className='text-red'>{expanded ? 'Read less' : 'Read more'}</span>
              {expanded ? <BiChevronUp size='1rem' color='var(--my-red)' className='inline-block' /> : <BiChevronDown size='1rem' color='var(--my-red)' className='inline-block' />}
            </button>
          </div>
        </div>

        {/* Note */}
        <div className='w-fit h-fit border-2 border-lightGrey rounded-md px-4 py-2 space-y-3'>
          <p className='text-lg font-medium'>{currentBook.borrowed < currentBook.quantity ? 
            <span className='text-available'>Available</span> : 
            <span className='text-unavailable'>Not available</span>}
          </p>
          <p>Amount: <span className='font-medium'>{currentBook.quantity}</span></p>
          <p>Available: <span className='font-medium'>{currentBook.quantity - currentBook.borrowed}</span></p>
          <CustomButton label='Borrow' classes='self-center w-[12rem]' disabled={currentBook.borrowed >= currentBook.quantity} onClick={gotoBorrow}  />
        </div>
      </div>
    }
    </div>
  )
}

export default Detail