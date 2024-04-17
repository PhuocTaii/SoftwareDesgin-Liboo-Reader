import React, {useEffect, useState} from 'react'
import dummyImage from '../../assets/book.png';
import CustomButton from '../../components/CustomButton'
import {BiChevronUp, BiChevronDown} from 'react-icons/bi'
import { useNavigate } from "react-router-dom";


// Book detail page
const Detail = () => {
    const [expanded, setExpanded] = useState(false);
    const dummyBook = {
        name: 'Dummy Book',
        image: dummyImage,
        ISBN: '1234567890',
        author: 'John Doe',
        publisher: 'Example Publisher',
        publishYear: '2022',
        genre: ['Fiction', 'Thriller'],
        price: '200000',
        description: 'This is a dummy book description. It contains some text to represent the description of a book. This is a dummy book description. It contains some text to represent the description of a book. This is a dummy book description. It contains some text to represent the description of a book. This is a dummy book description. It contains some text to represent the description of a book. This is a dummy book description. It contains some text to represent the description of a book. This is a dummy book description. It contains some text to represent the description of a book. This is a dummy book description. It contains some text to represent the description of a book. This is a dummy book description. It contains some text to represent the description of a book. This is a dummy book description. It contains some text to represent the description of a book.',
        borrowed: 5,
        quantity: 10
    };
    const navigate = useNavigate();

    const currentBook = dummyBook;
    // const gotoBorrow = () => {
    //     navigate(`/Borrow/${id}`)
    //   }
    const gotoBorrow = () => {
        navigate(`/transaction/${currentBook.ISBN}`)
    }
    
    return (
        <div className='w-full h-full space-y-3 py-2 pr-4 pl-3'>
        {currentBook &&
        <div className='w-full flex gap-4 h-fit'>
          <img src={currentBook.image} alt="book" className='w-40 h-auto object-contain place-self-start shrink-0' />
          
          {/* Detail */}
          <div className='w-full space-y-2'>
            <h1 className='text-2xl font-semibold'>{currentBook.name}</h1>
            <p className='text-lg'>ISBN: <span className='font-medium text-red'>{currentBook.ISBN}</span></p>
            <p> Author: {currentBook.author} </p>
            <p> Publisher: {currentBook.publisher} </p>
            <p> Publish year: {currentBook.publishYear} </p>
            <p> Genre: {currentBook.genre?.join(', ')} </p>
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