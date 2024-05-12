import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import {Input} from "@material-tailwind/react";
import CustomButton from '../../components/CustomButton'
import { useNavigate, useLocation } from "react-router-dom";
import {formatDate} from '../../helpers/dateFormat'
import { useDispatch, useSelector } from 'react-redux'
import SearchBook from './SearchBook'
import {reserveBook, getNotPickUpBooks} from './transactionApi'
import { toast } from 'react-toastify';
import { setSelectedItem } from '../../slices/menu';

const EXPIRATION = 30;

const TABLE_HEAD = ['Reserve date' , 'Pickup date', 'ISBN', 'Book name']
// Transaction page
const Transaction = () => {
  const dispatch = useDispatch()
  dispatch(setSelectedItem(1))

  const location = useLocation();

  const curUser = useSelector((state) => state.auth.currentUser);

  const tempPickupDate = new Date(new Date().getTime() + (24 * 60 * 60 * 1000))

  const [reservation, setReservation] = useState({
    isbn: location.state ? [location.state.currentIsbn] : [],
    pickupDate: tempPickupDate.toISOString().split('T')[0],
    dueDate: new Date(tempPickupDate.getFullYear(), tempPickupDate.getMonth(), tempPickupDate.getDate() + EXPIRATION).toISOString().split('T')[0]
  })

  const handleChangeInfo = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    const chosenDate = new Date(value);
    setReservation({
      ...reservation, 
      pickupDate: value, 
      dueDate: new Date(chosenDate.getFullYear(), chosenDate.getMonth(), chosenDate.getDate() + EXPIRATION).toISOString().split('T')[0]
    });
  }

  const [bookNameSearch, setBookNameSearch] = useState('');

  const handleAddReservation = (e) => {
    e.preventDefault();
    console.log(reservation);
    if(reservation.isbn.length <= 0) {
      toast.info("Please have at least 1 book to reserve.")
      return
    }
    reserveBook(reservation).then((data) => {
      if(data != null){
        setNotPickUpBooks([...notPickUpBooks, data.reservation]);
      }
      setReservation({...reservation, isbn: []});
      setBookNameSearch("")
    })
  }

  const addISBN = (isbn) => {
    if(isbn !== '' && !reservation.isbn.includes(isbn))
      setReservation({...reservation, isbn: [...reservation.isbn, isbn]});
  }

  const [notPickUpBooks, setNotPickUpBooks] = useState([]);

  useEffect(() => {
    getNotPickUpBooks().then((data) => {
      if(data != null){
        setNotPickUpBooks(data);
      }
    })
  }, [])
  return (
    <div className=''>
      <form className='space-y-6' onSubmit={handleAddReservation}>
        <h1 className='text-2xl font-semibold'>RESERVE BOOK</h1>
        <div className='grid grid-cols-2 gap-5'>
          <div className='col-span-2'>
            <Input
              variant="standard"
              label="Email"
              value={curUser.email}
              readOnly
            />
          </div>
          <Input
            variant="standard"
            label="Received date (in 3 days)"
            name='pickupDate'
            value={reservation.pickupDate}
            onChange={handleChangeInfo}
            type='date'
            min={new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toISOString().split('T')[0]}
            max={new Date(new Date().getTime() + (3 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]}
            required
          />
          <Input
            variant="standard"
            label="Expected due date"
            value={reservation.dueDate}
            type='date'
            readOnly
          />
          <div className="relative">
            <SearchBook
              onClick={(item) => addISBN(item.isbn)}
              bookName={bookNameSearch}
              setBookName={setBookNameSearch}
            />
          </div>
          <Input
            variant="standard"
            label="Chosen book ISBNs"
            value={reservation.isbn}
            readOnly
          />
        </div>
        <div className='flex justify-center'>
          <CustomButton label='done' type='submit' />
        </div>
      </form>
      <div className='space-y-6 mt-8'>
        <p className='text-2xl font-semibold'>YOU HAVE NOT PICK UP YET</p>
        <table className="w-full min-w-max table-auto text-left">
          <thead className='sticky top-0'>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th key={index} className="border-b border-blue-gray-100 bg-blue-gray-50 px-2 py-4">
                  <p className="leading-none opacity-70">{head}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
          {notPickUpBooks?.map((record) => (
            <>
            {record?.books.map((detail, index) => (
              <tr key={`${record.id}${detail.id}`} className="">
                {index === 0 && 
                  <>
                    <td className="p-2 border border-blue-gray-100" rowSpan={record.books.length}>
                      <p>{formatDate(record.reservedDate)}</p>
                    </td>
                    <td className="p-2 border border-blue-gray-100" rowSpan={record.books.length}>
                      <p>{formatDate(record.pickupDate)}</p>
                    </td>
                  </>
                }
                <td className='p-2 border border-blue-gray-50'>
                  <p>{detail.isbn}</p>
                </td>
                <td className='p-2 border border-blue-gray-50'>
                  <p>{detail.name}</p>
                </td>
              </tr>
            ))}
            </>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Transaction
