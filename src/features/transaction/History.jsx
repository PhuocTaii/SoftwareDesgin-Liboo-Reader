// History page
import React, {useState} from 'react'
import { 
  Select, 
  Option,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Input
} from '@material-tailwind/react';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';
import {formatDate} from '../../helpers/dateFormat';
import { BiChevronDown,BiRefresh, BiMessageAltError } from 'react-icons/bi'
import DialogConfirm from '../../components/DialogConfirm';

const StatusChip = ({status}) => {
  switch (status) {
    case 'Pending':
      return <div className="px-2 py-1 bg-gray-300 rounded-full text-xs w-20 flex justify-center">Pending</div>
    case 'Rejected':
      return <div className="px-2 py-1 bg-deep-orange-400 rounded-full text-xs w-20 flex justify-center">Rejected</div>
    case 'Accepted':
      return <div className="px-2 py-1 bg-amber-400 rounded-full text-xs w-20 flex justify-center">Accepted</div>
    default:
      return <div className="px-2 py-1 bg-green-200 rounded-full text-xs w-20 flex justify-center">Done</div>
  }
}

const TABLE_BORROW_HEAD = ['ISBN', 'Book name', 'Borrow date', 'Due date', 'Return date', 'Fine', 'Renewal count', ''];
const TABLE_RENEWAL_HEAD = ['ISBN', 'Book name', 'Renew date'];
const TABLE_RESERVATION_HEAD = ['ISBN', 'Book name', 'Reserve date', 'Pickup date', 'Status'];

const History = () => {
  // BORROW
  const filterSearch = ['Book name', 'ISBN']
  const [selectedFilter, setSelectedFilter] = useState(filterSearch[0]);
  const handleSearch = (e) => {
    
  }
  const dateTypes = ['Borrow date', 'Due date', 'Return date', '']
  const [selectedDateType, setSelectedDateType] = useState(dateTypes[0])
  const [openMenu, setOpenMenu] = useState(false)
  const [dataBorrow, setDataBorrow] = useState([
    {
      ISBN: 'ISBN-1',
      bookName: 'Book name',
      borrowDate: Date.now(),
      dueDate: Date.now(),
      returnDate: Date.now(),
      fine: 0,
      renewalCount: 0,
    },
    {
      ISBN: 'ISBN-1',
      bookName: 'Book name',
      borrowDate: Date.now(),
      dueDate: Date.now(),
      returnDate: Date.now(),
      fine: 0,
      renewalCount: 0,
    },
    {
      ISBN: 'ISBN-1',
      bookName: 'Book name',
      borrowDate: Date.now(),
      dueDate: Date.now(),
      returnDate: Date.now(),
      fine: 0,
      renewalCount: 0,
    },
  ]);

  // RENEW
  const filterSearchRenew = ['Book name', 'ISBN']
  const [selectedFilterRenew, setSelectedFilterRenew] = useState(filterSearchRenew[0]);
  const handleSearchRenew = (e) => {
    
  }
  const [dataRenew, setDataRenew] = useState([
    {
      ISBN: 'ISBN-1',
      bookName: 'Book name',
      renewDate: Date.now(),
    },
    {
      ISBN: 'ISBN-1',
      bookName: 'Book name',
      renewDate: Date.now(),
    },
    {
      ISBN: 'ISBN-1',
      bookName: 'Book name',
      renewDate: Date.now(),
    },
  ]);

  // RESERVE
  const filterSearchReserve = ['Book name', 'ISBN']
  const [selectedFilterReserve, setSelectedFilterReserve] = useState(filterSearchReserve[0]);
  const handleSearchReserve = (e) => {
    
  }
  const dateTypesReserve = ['Reserve date', 'Pickup date']
  const [selectedDateTypeReserve, setSelectedDateTypeReserve] = useState(dateTypesReserve[0])
  const [openMenuReserve, setOpenMenuReserve] = useState(false)
  const [dataReserve, setDataReserve] = useState([
    {
      ISBN: 'ISBN-1',
      bookName: 'Book name',
      reserveDate: Date.now(),
      pickupDate: Date.now(),
      status: 'Pending',
    },
    {
      ISBN: 'ISBN-1',
      bookName: 'Book name',
      reserveDate: Date.now(),
      pickupDate: Date.now(),
      status: 'Rejected',
    },
    {
      ISBN: 'ISBN-1',
      bookName: 'Book name',
      reserveDate: Date.now(),
      pickupDate: Date.now(),
      status: 'Accepted',
    },
  ]);

  const [openConfirm, setOpenConfirm] = useState(false)
  const [openReport, setOpenReport] = useState(false)

  return (
    <div className={`flex w-full h-full flex-col`}>
      {/* -------------------BORROW------------------- */}
      <div>
        <div className='flex justify-between py-4 flex-col'>
          <p className='font-semibold text-2xl pb-4'>BORROWS</p>
          {/* Search bar */}
          <div className='w-full flex flex-col justify-between gap-4'>
            <div className='flex gap-2 items-center'>
              <p>Filter</p>
              <Menu placement="bottom-start" open={openMenu} handler={setOpenMenu}>
                <MenuHandler>
                  <Button
                    ripple={false}
                    variant="text"
                    className="flex justify-between w-48 h-8 items-center gap-2 rounded-lg border border-blue-gray-200 px-2 normal-case font-normal text-sm">
                    {selectedDateType}
                    <BiChevronDown
                      size="1.3rem"
                      className={`transition-transform ${openMenu ? 'rotate-180' : ''}`}
                    />
                  </Button>
                </MenuHandler>
                <MenuList className="max-h-[20rem] max-w-[18rem]">
                  {dateTypes.map((item, index) => {
                    return (
                      <MenuItem
                        key={index}
                        value={item}
                        className="flex items-center gap-2"
                        onClick={() => setSelectedDateType(item)}>
                        <p className="">{item}</p>
                      </MenuItem>
                    )
                  })}
                </MenuList>
              </Menu>
              <p>from</p>
              <div className='w-48'>
                <Input
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  containerProps={{
                    className: "min-w-0",
                  }}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  type="date"
                  // onChange={handleChangeInfo}
                  name='filter-from'
                />
              </div>
              <p>to</p>
              <div className='w-48'>
                <Input
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  containerProps={{
                    className: "min-w-0",
                  }}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  type="date"
                  // onChange={handleChangeInfo}
                  name='filter-to' 
                />
              </div>
            </div>
          </div>
        </div>
        <div className='w-full min-h-max overflow-x-scroll'>
          <table className="w-full min-w-max table-auto text-left">
            <thead className='sticky top-0'>
              <tr>
                {TABLE_BORROW_HEAD.map((head, index) => (
                  <th key={index} className="border-b border-blue-gray-100 bg-blue-gray-50 px-2 py-4">
                    <p className="leading-none opacity-70">{head}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataBorrow?.map((record) => (
                <tr key={record._id} className="even:bg-blue-gray-50/50 hover:bg-lightOrange/30">
                  <td className="p-2">
                    <p>{record.ISBN}</p>
                  </td>
                  <td className="p-2">
                    <p>{record.bookName}</p>
                  </td>
                  <td className="p-2">
                    <p>{formatDate(record.borrowDate)}</p>
                  </td>
                  <td className="p-2">
                    <p>{formatDate(record.dueDate)}</p>
                  </td>
                  <td className="p-2">
                    <p>{formatDate(record.returnDate)}</p>
                  </td>
                  <td className="p-2">
                    <p>{record.fine}</p>
                  </td>
                  <td className="p-2">
                    <p>{record.renewalCount}</p>
                  </td>
                  <td className="p-2 pr-4 space-x-6 flex justify-end">
                    <BiRefresh 
                      size='1.5rem'
                      onClick={() => setOpenConfirm(!openConfirm)}
                      className='hover:cursor-pointer'
                    />
                    <BiMessageAltError
                      size='1.5rem'
                      onClick={() => setOpenReport(!openReport)}
                      className='hover:cursor-pointer'
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination/>
      </div>

      {/* -------------------RENEW------------------- */}
      <div>
        <div className='flex justify-between py-4 flex-col'>
          <p className='font-semibold text-2xl pb-4'>RENEWALS</p>
          {/* Search bar */}
          <div className='w-full flex flex-col justify-between gap-4'>
            <div className='flex gap-2 items-center'>
              <p>Filter <span className='font-semibold'>Renew date</span> from</p>
              <div className='w-48'>
                <Input
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  containerProps={{
                    className: "min-w-0",
                  }}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  type="date"
                  // onChange={handleChangeInfo}
                  name='filter-from'
                />
              </div>
              <p>to</p>
              <div className='w-48'>
                <Input
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  containerProps={{
                    className: "min-w-0",
                  }}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  type="date"
                  // onChange={handleChangeInfo}
                  name='filter-to' 
                />
              </div>
            </div>
          </div>
        </div>
        <div className='w-full min-h-max overflow-x-scroll'>
          <table className="w-full min-w-max table-auto text-left">
            <thead className='sticky top-0'>
              <tr>
                {TABLE_RENEWAL_HEAD.map((head, index) => (
                  <th key={index} className="border-b border-blue-gray-100 bg-blue-gray-50 px-2 py-4">
                    <p className="leading-none opacity-70">{head}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataRenew?.map((record) => (
                <tr key={record._id} className="even:bg-blue-gray-50/50 hover:bg-lightOrange/30">
                  <td className="p-2">
                    <p>{record.ISBN}</p>
                  </td>
                  <td className="p-2">
                    <p>{record.bookName}</p>
                  </td>
                  <td className="p-2">
                    <p>{formatDate(record.renewDate)}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination/>
      </div>

      {/* -------------------RESERVATIONS------------------- */}
      <div>
        <div className='flex justify-between py-4 flex-col'>
          <p className='font-semibold text-2xl pb-4'>RESERVATIONS</p>
          {/* Search bar */}
          <div className='w-full flex flex-col justify-between gap-4'>
            <div className='flex gap-2 items-center'>
              <p>Filter</p>
              <Menu placement="bottom-start" open={openMenuReserve} handler={setOpenMenuReserve}>
                <MenuHandler>
                  <Button
                    ripple={false}
                    variant="text"
                    className="flex justify-between w-48 h-8 items-center gap-2 rounded-lg border border-blue-gray-200 px-2 normal-case font-normal text-sm">
                    {selectedDateTypeReserve}
                    <BiChevronDown
                      size="1.3rem"
                      className={`transition-transform ${openMenuReserve ? 'rotate-180' : ''}`}
                    />
                  </Button>
                </MenuHandler>
                <MenuList className="max-h-[20rem] max-w-[18rem]">
                  {dateTypesReserve.map((item, index) => {
                    return (
                      <MenuItem
                        key={index}
                        value={item}
                        className="flex items-center gap-2"
                        onClick={() => setSelectedDateTypeReserve(item)}>
                        <p className="">{item}</p>
                      </MenuItem>
                    )
                  })}
                </MenuList>
              </Menu>
              <p>from</p>
              <div className='w-48'>
                <Input
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  containerProps={{
                    className: "min-w-0",
                  }}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  type="date"
                  // onChange={handleChangeInfo}
                  name='filter-from'
                />
              </div>
              <p>to</p>
              <div className='w-48'>
                <Input
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  containerProps={{
                    className: "min-w-0",
                  }}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  type="date"
                  // onChange={handleChangeInfo}
                  name='filter-to' 
                />
              </div>
            </div>
          </div>
        </div>
        <div className='w-full min-h-max overflow-x-scroll'>
          <table className="w-full min-w-max table-auto text-left">
            <thead className='sticky top-0'>
              <tr>
                {TABLE_RESERVATION_HEAD.map((head, index) => (
                  <th key={index} className="border-b border-blue-gray-100 bg-blue-gray-50 px-2 py-4">
                    <p className="leading-none opacity-70">{head}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataReserve?.map((record) => (
                <tr key={record._id} className="even:bg-blue-gray-50/50 hover:bg-lightOrange/30">
                  <td className="p-2">
                    <p>{record.ISBN}</p>
                  </td>
                  <td className="p-2">
                    <p>{record.bookName}</p>
                  </td>
                  <td className="p-2">
                    <p>{formatDate(record.reserveDate)}</p>
                  </td>
                  <td className="p-2">
                    <p>{formatDate(record.pickupDate)}</p>
                  </td>
                  <td className="p-2">
                    <StatusChip status={record.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination/>
      </div>

      <DialogConfirm 
        open={openConfirm} 
        handleOpen={() => setOpenConfirm(!openConfirm)}
        title="Sure you want to renew?"
        content="Are you sure you want to renew this book?"
        icon={<BiRefresh size='2rem' />}
      >
      </DialogConfirm>

      <DialogConfirm 
        open={openReport}
        handleOpen={() => setOpenReport(!openReport)}
        title="You have lost this book?"
        content={<span>You will be fined <span className='text-red'>{123000}</span> VND for losing it.</span>}
        icon={<BiMessageAltError size='2rem' />}
      >
      </DialogConfirm>
    </div>
  )
}

export default History
