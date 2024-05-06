import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import {Input} from "@material-tailwind/react";
import CustomButton from '../../components/CustomButton'
import { useNavigate } from "react-router-dom";
import {formatDate} from '../../helpers/dateFormat'
import { useDispatch, useSelector } from 'react-redux'
import SearchBook from '../../components/SearchBook'
import {reserveBook, getNotPickUpBooks} from './transactionApi'
import { toast } from 'react-toastify';

const EXPIRATION = 30;

const TABLE_HEAD = ['ISBN', 'Reserve date' , 'Pickup date', 'Book name']
// Transaction page
const Transaction = () => {

  const { id } = useParams();
  const [expanded, setExpanded] = useState(false);
  const today = new Date();

  const curUser = useSelector((state) => state.auth.currentUser.user);

  const [reservation, setReservation] = useState({
    isbn: id?[id]:[],
    pickupDate: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toISOString().split('T')[0]
  })

  const navigate = useNavigate();


  const handleChangeInfo = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    const chosenDate = new Date(value);
    setReservation({...reservation, pickupDate: value, dueDate: new Date(chosenDate.getFullYear(), chosenDate.getMonth(), chosenDate.getDate() + EXPIRATION).toISOString().split('T')[0]});
  }

  const [tempISBN, setTempISBN] = useState('');


  // const addISBN = (e) => {
  //   e.preventDefault();
  //   if(tempISBN !== '' && reservation.isbn.length < 2 && !reservation.isbn.includes(tempISBN))
  //     setReservation({...reservation, isbn: [...reservation.isbn, tempISBN]});
  //   setTempISBN('');
  // }

  const handleAddReservation = (e) => {
    e.preventDefault();
    console.log(reservation);
    reserveBook(reservation).then((data) => {
      if(data){
        toast.success(data.message);
        setNotPickUpBooks([...notPickUpBooks, data.reservation]);
      } else{
        setReservation({...reservation, isbn: []});
      }
    })
  }

  const addISBN = (isbn) => {
    if(isbn !== '' && reservation.isbn.length < 2 && !reservation.isbn.includes(isbn))
      setReservation({...reservation, isbn: [...reservation.isbn, isbn]});
  }

  const [notPickUpBooks, setNotPickUpBooks] = useState([]);

  useEffect(() => {
    getNotPickUpBooks().then((data) => {
      if(data){
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
            />
            {/* <button
              className="absolute right-1 bottom-1 border-2 px-2 py-1 rounded-md bg-lightGrey font-medium"
              type="submit"
              onClick={addISBN}
            >
              Add
            </button> */}
          </div>
          <Input
            variant="standard"
            label="ISBN"
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
          {/* <tbody>
            {borrowBooks?.map((record, index) => (
              <tr key={index} className="even:bg-blue-gray-50/50 hover:bg-lightOrange/30">
                <td className="p-2">
                  <p>{record?.isbn}</p>
                </td>
                <td className="p-2">
                  <p>{formatDate(record.reserveDate)}</p>
                </td>
                <td className="p-2">
                  <p>{formatDate(record.pickupDate)}</p>
                </td>  
                <td className="p-2">
                  <p>{record.status}</p>
                </td>
              </tr>
            ))}
          </tbody> */}
          {notPickUpBooks?.map((record) => (
                <>
                {record?.books.map((detail, index) => (
                  <tr key={`${record.id}${detail.id}`} className="">
                    <td className='p-2 border border-blue-gray-50'>
                      <p>{detail.isbn}</p>
                    </td>
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
                      <p>{detail.name}</p>
                    </td>
                  </tr>
                ))}
                </>
              ))}
        </table>
      </div>
    </div>
  )
}

export default Transaction
