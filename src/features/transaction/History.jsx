// History page
import React, {useState, useEffect} from 'react'
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
import {formatDate} from '../../helpers/dateFormat';
import { BiChevronDown,BiRefresh, BiMessageAltError } from 'react-icons/bi'
import DialogConfirm from '../../components/DialogConfirm';
import { getBorrows, getRenews, getReservations } from './transactionApi';
import { useSelector } from 'react-redux';

const StatusChip = ({status}) => {
  if(status) {
    return <div className="px-2 py-1 bg-green-200 rounded-full text-xs w-20 text-center text-nowrap">PICKED-UP</div>
  }
  else
    return <div className="px-2 py-1 bg-gray-300 rounded-full text-xs w-20 text-center text-nowrap">NOT YET</div>
}

const TABLE_BORROW_HEAD = ['Borrow date', 'ISBN', 'Book name', 'Due date', 'Return date', 'Renewal count', '', 'Fine'];
const TABLE_RENEWAL_HEAD = ['ISBN', 'Book name', 'Renew date'];
const TABLE_RESERVATION_HEAD = ['Reserve date', 'Pickup date', 'ISBN', 'Book name', 'Status'];

const History = () => {
  // BORROW
  const dateTypes = ['None', 'Borrow date', 'Due date', 'Return date']
  const [selectedDateType, setSelectedDateType] = useState(0)
  const [openMenu, setOpenMenu] = useState(false)
  const [dataBorrow, setDataBorrow] = useState([])
  const [totalPagesBorrow, setTotalPagesBorrow] = useState(1)
  const [currentPageBorrow, setCurrentPageBorrow] = useState(0)
  const [selectedDatesBorrow, setSelectedDatesBorrow] = useState({
    from: "",
    to: ""
  })

  // RENEW
  const filterSearchRenew = ['Book name', 'ISBN']
  const [selectedFilterRenew, setSelectedFilterRenew] = useState(filterSearchRenew[0]);
  const handleSearchRenew = (e) => {
    
  }
  const [dataRenew, setDataRenew] = useState([]);
  const [totalPagesRenew, setTotalPagesRenew] = useState(1)
  const [currentPageRenew, setCurrentPageRenew] = useState(0)

  // RESERVE
  const filterSearchReserve = ['Book name', 'ISBN']
  const [selectedFilterReserve, setSelectedFilterReserve] = useState(filterSearchReserve[0]);
  const handleSearchReserve = (e) => {
    
  }
  const dateTypesReserve = ['Reserve date', 'Pickup date']
  const [selectedDateTypeReserve, setSelectedDateTypeReserve] = useState(dateTypesReserve[0])
  const [openMenuReserve, setOpenMenuReserve] = useState(false)
  const [dataReserve, setDataReserve] = useState([]);
  const [totalPagesReserve, setTotalPagesReserve] = useState(1)
  const [currentPageReserve, setCurrentPageReserve] = useState(0)

  const [openConfirm, setOpenConfirm] = useState(false)
  const [openReport, setOpenReport] = useState(false)

  // ------------------- HANDLE PAGING -------------------
  // Paging borrows
  useEffect(() => {
    getBorrows(currentPageBorrow, selectedDateType, selectedDatesBorrow.from, selectedDatesBorrow.to).then((data) => {
      if(data != null) {
        setTotalPagesBorrow(data.totalPages)
        setDataBorrow(data.transactions)
      }
    })
  }, [currentPageBorrow, selectedDateType, selectedDatesBorrow])
  const prevPageBorrow = () => {
    if(currentPageBorrow > 0) {
      setCurrentPageBorrow(currentPageBorrow - 1)
    }
  }
  const nextPageBorrow = () => {
    if(currentPageBorrow < totalPagesBorrow - 1) {
      setCurrentPageBorrow(currentPageBorrow + 1)
    }
  }

  // Paging renewals
  useEffect(() => {
    getRenews(currentPageRenew).then((data) => {
      console.log(data);
      if(data != null) {
        setTotalPagesRenew(data.totalPages)
        setDataRenew(data.renewals)
      }
      else {
        setTotalPagesRenew(1)
        setDataRenew([])
      }
    })
  }, [currentPageRenew])
  const prevPageRenew = () => {
    if(currentPageRenew > 0) {
      setCurrentPageRenew(currentPageRenew - 1)
    }
  }
  const nextPageRenew = () => {
    if(currentPageRenew < totalPagesRenew - 1) {
      setCurrentPageRenew(currentPageRenew + 1)
    }
  }

  // Paging reservations
  useEffect(() => {
    getReservations(currentPageReserve).then((data) => {
      console.log(data);
      if(data != null) {
        setTotalPagesReserve(data.totalPages)
        setDataReserve(data.reservations)
      }
      else {
        setTotalPagesReserve(1)
        setDataReserve([])
      }
    })
  }, [currentPageReserve])
  const prevPageReserve = () => {
    if(currentPageReserve > 0) {
      setCurrentPageReserve(currentPageReserve - 1)
    }
  }
  const nextPageReserve = () => {
    if(currentPageReserve < totalPagesReserve - 1) {
      setCurrentPageReserve(currentPageReserve + 1)
    }
  }

  return (
    <div className={`flex w-full h-full flex-col`}>
      {/* -------------------BORROW------------------- */}
      <div>
        <div className='flex justify-between py-4 flex-col'>
          <p className='font-semibold text-2xl pb-4'>BORROWS</p>
          <div className='w-full flex flex-col justify-between gap-4'>
            <div className='flex gap-2 items-center'>
              <p>Filter</p>
              <Menu placement="bottom-start" open={openMenu} handler={setOpenMenu}>
                <MenuHandler>
                  <Button
                    ripple={false}
                    variant="text"
                    className="flex justify-between w-48 h-8 items-center gap-2 rounded-lg border border-blue-gray-200 px-2 normal-case font-normal text-sm">
                    {dateTypes[selectedDateType]}
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
                        onClick={() => setSelectedDateType(index)}>
                        <p className="">{item}</p>
                      </MenuItem>
                    )
                  })}
                </MenuList>
              </Menu>
              {
                selectedDateType !== 0 &&
                <>
                  <p>from</p>
                  <div className='w-48'>
                    <Input
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{
                        className: "min-w-fit",
                      }}
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      type="date"
                      onChange={(e) =>
                        setSelectedDatesBorrow({
                          ...selectedDatesBorrow,
                          from: e.target.value})
                      }
                      name='filter-from'
                      value={selectedDatesBorrow.from}
                    />
                  </div>
                  <p>to</p>
                  <div className='w-48'>
                    <Input
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{
                        className: "min-w-fit",
                      }}
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      type="date"
                      onChange={(e) =>
                        setSelectedDatesBorrow({
                          ...selectedDatesBorrow,
                          to: e.target.value})
                      }
                      name='filter-to'
                      value={selectedDatesBorrow.to}
                    />
                  </div>
                </>
              }
            </div>
          </div>
        </div>
        <div className='w-full min-h-max overflow-x-scroll'>
          <table className="w-full min-w-max table-auto text-left border-collapse">
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
              <>
                {record?.transactionBooks.map((detail, index) => (
                  <tr key={detail.id} className="">
                    {index === 0 && 
                      <td className="p-2 border border-blue-gray-100" rowSpan={record.transactionBooks.length}>
                        <p>{formatDate(record.borrowedDate)}</p>
                      </td>
                    }
                    <td className='p-2 border border-blue-gray-50'>
                      <p>{detail.book.isbn}</p>
                    </td>
                    <td className='p-2 border border-blue-gray-50'>
                      <p>{detail.book.name}</p>
                    </td>
                    <td className='p-2 border border-blue-gray-50'>
                      <p>{formatDate(detail.dueDate)}</p>
                    </td>
                    <td className='p-2 border border-blue-gray-50'>
                      <p>{formatDate(detail.returnDate)}</p>
                    </td>
                    <td className='p-2 border border-blue-gray-50'>
                      <p>{detail.renewalCount}</p>
                    </td>
                    <td className="p-2 border border-blue-gray-100">
                      <div className='w-fit mx-auto'>
                        <Button 
                          variant="outlined" 
                          className='p-2 text-xs normal-case font-normal mr-2'
                          onClick={() => setOpenConfirm(!openConfirm)}
                        >
                          Renew
                        </Button>
                        <Button 
                          variant="outlined" 
                          className='p-2 text-xs normal-case font-normal'
                          onClick={() => setOpenReport(!openReport)}
                        >
                          Report lost book
                        </Button>
                      </div>
                    </td>
                    {index === 0 && 
                      <td className="p-2 border border-blue-gray-100" rowSpan={record.transactionBooks.length}>
                        <p>{record.fine}</p>
                      </td>
                    }
                  </tr>
                ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination 
          className={"mx-auto w-fit"} 
          numPages={totalPagesBorrow} 
          currentPage={currentPageBorrow}
          onPageClick={(page) => setCurrentPageBorrow(page)}
          onPrevClick={prevPageBorrow}
          onNextClick={nextPageBorrow}
          />
      </div>

      {/* -------------------RENEW------------------- */}
      <div>
        <div className='flex justify-between py-4 flex-col'>
          <p className='font-semibold text-2xl pb-4'>RENEWALS</p>
          <div className='w-full flex flex-col justify-between gap-4'>
            <div className='flex gap-2 items-center'>
              <p>Filter <span className='font-semibold'>Renew date</span> from</p>
              <div className='w-48'>
                <Input
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  containerProps={{
                    className: "min-w-fit",
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
                    className: "min-w-fit",
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
                <tr key={record.id} className="even:bg-blue-gray-50/50 hover:bg-lightOrange/30">
                  <td className="p-2">
                    <p>{record.transactionBook?.book?.isbn}</p>
                  </td>
                  <td className="p-2">
                    <p>{record.transactionBook?.book?.name}</p>
                  </td>
                  <td className="p-2">
                    <p>{formatDate(record.requestDate)}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination 
          className={"mx-auto w-fit"} 
          numPages={totalPagesRenew} 
          currentPage={currentPageRenew}
          onPageClick={(page) => setCurrentPageRenew(page)}
          onPrevClick={prevPageRenew}
          onNextClick={nextPageRenew}
          />
      </div>

      {/* -------------------RESERVATIONS------------------- */}
      <div>
        <div className='flex justify-between py-4 flex-col'>
          <p className='font-semibold text-2xl pb-4'>RESERVATIONS</p>
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
                    className: "min-w-fit",
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
                    className: "min-w-fit",
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
                    {index === 0 && 
                      <td className="p-2 border border-blue-gray-100" rowSpan={record.books.length}>
                        <StatusChip status={record.status} />
                      </td>
                    }
                  </tr>
                ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination 
          className={"mx-auto w-fit"} 
          numPages={totalPagesReserve} 
          currentPage={currentPageReserve}
          onPageClick={(page) => setCurrentPageReserve(page)}
          onPrevClick={prevPageReserve}
          onNextClick={nextPageReserve}
          />
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
