import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import {Input} from "@material-tailwind/react";
import CustomButton from '../../components/CustomButton'
import { useNavigate } from "react-router-dom";
import {formatDate} from '../../helpers/dateFormat'
import { BiBookOpen} from 'react-icons/bi';
import {BiRefresh, BiMessageAltError} from 'react-icons/bi'

const EXPIRATION = 7;
const TABLE_HEAD = ['ISBN', 'Borrowing date' , 'Due date', '', '']

// Book history page
const BookHistory = () => {

    const [borrowBooks, setBorrowBooks] = useState([
        {
            isbn: '978-0451524935',
            borrowDate: new Date(2024, 2, 20), // Date format: year, month (0-indexed), day
            dueDate: new Date(2024, 3, 10)
        },
        {
            isbn: '978-0141439587',
            borrowDate: new Date(2024, 2, 15),
            dueDate: new Date(2024, 3, 5)
        },
        // Add more dummy data as needed
    ]);

    return (
        <div>
            <h1 className='text-2xl font-semibold'>BOOKING HISTORY</h1>
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
                        <p>{formatDate(record.borrowDate)}</p>
                        </td>
                        <td className="p-2">
                        <p>{formatDate(record.dueDate)}</p>
                        </td>           
                        <td className="p-2 pr-4 space-x-6 flex justify-end">
                        {/* <button onClick={() => {setToggleRenew(true); setSelectedBorrow(record)}}>
                            <BiRefresh size='1.5rem' />
                        </button> */}
                        <button>
                            <BiBookOpen size='1.5rem' />
                        </button>
                        {/* <button onClick={() => {setToggleReport(true); setSelectedBorrow(record)}}>
                            <BiMessageAltError size='1.5rem' />
                        </button> */}
                        <button>
                            <BiMessageAltError size='1.5rem' />
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default BookHistory;