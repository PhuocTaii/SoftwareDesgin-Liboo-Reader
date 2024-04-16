import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import {Input} from "@material-tailwind/react";
import CustomButton from '../../components/CustomButton'
import { useNavigate } from "react-router-dom";
import {formatDate} from '../../helpers/dateFormat'
const EXPIRATION = 7;

const TABLE_HEAD = ['ISBN', 'Reserve date' , 'Pickup date', 'Status']
// Transaction page
const Transaction = () => {

  const { id } = useParams();
  const [expanded, setExpanded] = useState(false);
  const today = new Date();
  const dummyUser = {
    username: 'phuoctai17@gmail.com',
    // image: dummyImage,
    // ISBN: '1234567890',
    // author: 'John Doe',
    // publisher: 'Example Publisher',
    // publishYear: '2022',
    // genre: ['Fiction', 'Thriller'],
    // price: '200000',
    // description: 'This is a dummy book description. It contains some text to represent the description of a book. This is a dummy book description. It contains some text to represent the description of a book. This is a dummy book description. It contains some text to represent the description of a book. This is a dummy book description. It contains some text to represent the description of a book. This is a dummy book description. It contains some text to represent the description of a book. This is a dummy book description. It contains some text to represent the description of a book. This is a dummy book description. It contains some text to represent the description of a book. This is a dummy book description. It contains some text to represent the description of a book. This is a dummy book description. It contains some text to represent the description of a book.',
    // borrowed: 5,
    // quantity: 10
  };
  const [slip, setSlip] = useState({username: dummyUser.username, isbn: id ? id : '', borrowDate: today.toISOString().split('T')[0], dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + EXPIRATION).toISOString().split('T')[0]})
  const navigate = useNavigate();
  // Dummy data for the table
  const [borrowBooks, setBorrowBooks] = useState([
    { isbn: '1234567890', reserveDate: '2024-03-25', pickupDate: '2024-03-27', status: 'Pending' },
    { isbn: '1234567891', reserveDate: '2024-03-26', pickupDate: '2024-03-28', status: 'Pending' },
    { isbn: '1234567892', reserveDate: '2024-03-26', pickupDate: '2024-03-28', status: 'Pending' },
    { isbn: '1234567893', reserveDate: '2024-03-26', pickupDate: '2024-03-28', status: 'Pending' },
    // Add more dummy data as needed
  ]);

  const handleChangeInfo = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    const chosenDate = new Date(value);
    setSlip({...slip, borrowDate: value, dueDate: new Date(chosenDate.getFullYear(), chosenDate.getMonth(), chosenDate.getDate() + EXPIRATION).toISOString().split('T')[0]});
  }

  return (
    <div>
    <div className=''>
      <form className='space-y-6'>
        <h1 className='text-2xl font-semibold'>BORROW BOOK</h1>
        <div className='grid grid-cols-2 gap-5'>
          <Input
            variant="standard"
            label="Email"
            value={slip.username}
            readOnly
          />
          <Input
            variant="standard"
            label="ISBN"
            value={slip.isbn}
            readOnly
          />
          <Input
            variant="standard"
            label="Received date (in 3 days)"
            name='borrowDate'
            value={slip.borrowDate}
            onChange={handleChangeInfo}
            type='date'
            min={(new Date()).toISOString().split('T')[0]}
            max={new Date(new Date().getTime() + (2 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]}
            required
          />
          <Input
            variant="standard"
            label="Due date"
            value={slip.dueDate}
            type='date'
            readOnly
          />
        </div>
        <div className='flex justify-center'>
          <CustomButton label='done' type='submit' disabled={id ? false : true} />
        </div>
      </form>
      <div className='space-y-6 mt-8'>
        <p className='text-2xl font-semibold'>YOUR RESERVATIONS</p>
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
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Transaction
