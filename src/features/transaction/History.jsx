// History page
import React, {useState, useEffect} from 'react'
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Input,
} from '@material-tailwind/react';
import Pagination from '../../components/Pagination';
import {formatDate} from '../../helpers/dateFormat';
import { BiChevronDown,BiRefresh, BiMessageAltError } from 'react-icons/bi'
import DialogConfirm from '../../components/DialogConfirm';
import { getBorrows, getRenews, getReservations, requestRenew } from './transactionApi';
import {currencyFormat} from '../../helpers/currency'

const StatusChip = ({status}) => {
  if(status) {
    return <div className="px-2 py-1 bg-green-200 rounded-full text-xs w-20 text-center text-nowrap">PICKED-UP</div>
  }
  else
    return <div className="px-2 py-1 bg-gray-300 rounded-full text-xs w-20 text-center text-nowrap">NOT YET</div>
}

const InputDate = ({onChange, value}) => {
  return (
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
        onChange={onChange}
        value={value}
      />
    </div>
  )
}

const MenuFilter = ({filters, selectedFilter, setSelectedFilter, openMenu, setOpenMenu}) => {
  return(
    <Menu placement="bottom-start" open={openMenu} handler={setOpenMenu}>
      <MenuHandler>
        <Button
          ripple={false}
          variant="text"
          className="flex justify-between w-48 h-8 items-center gap-2 rounded-lg border border-blue-gray-200 px-2 normal-case font-normal text-sm">
          {filters[selectedFilter]}
          <BiChevronDown
            size="1.3rem"
            className={`transition-transform ${openMenu ? 'rotate-180' : ''}`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="max-h-[20rem] max-w-[18rem]">
        {filters.map((item, index) => {
          return (
            <MenuItem
              key={index}
              value={item}
              className="flex items-center gap-2"
              onClick={() => setSelectedFilter(index)}>
              <p className="">{item}</p>
            </MenuItem>
          )
        })}
      </MenuList>
    </Menu>
  )
}

const TABLE_BORROW_HEAD = ['Borrow date', 'ISBN', 'Book name', 'Due date', 'Return date', 'Renewal count', '', 'Fine'];
const TABLE_RENEWAL_HEAD = ['ISBN', 'Book name', 'Renew date'];
const TABLE_RESERVATION_HEAD = ['Reserve date', 'Pickup date', 'ISBN', 'Book name', 'Status'];

const History = () => {
  // BORROW
  const filters = ['None', 'Borrow date', 'Due date', 'Return date']
  const [selectedFilter, setSelectedFilter] = useState(0)
  const [openMenu, setOpenMenu] = useState(false)
  const [dataBorrow, setDataBorrow] = useState({
    transactions: [],
    totalPages: 1,
    pageNumber: 0
  })
  const [selectedDatesBorrow, setSelectedDatesBorrow] = useState({
    from: "",
    to: ""
  })

  // RENEW
  const filtersRenew = ['None', 'Request date']
  const [selectedFilterRenew, setSelectedFilterRenew] = useState(0)
  const [openMenuRenew, setOpenMenuRenew] = useState(false)
  const [dataRenew, setDataRenew] = useState({
    renewals: [],
    totalPages: 1,
    pageNumber: 0
  })
  const [selectedDatesRenew, setSelectedDatesRenew] = useState({
    from: "",
    to: ""
  })

  // RESERVE
  const filtersReserve = ['None', 'Reserve date', 'Pickup date']
  const [selectedFilterReserve, setSelectedFilterReserve] = useState(0)
  const [openMenuReserve, setOpenMenuReserve] = useState(false)
  const [dataReserve, setDataReserve] = useState({
    reservations: [],
    totalPages: 1,
    pageNumber: 0
  })
  const [selectedDatesReserve, setSelectedDatesReserve] = useState({
    from: "",
    to: ""
  })

  const [openConfirm, setOpenConfirm] = useState(false)
  const [openReport, setOpenReport] = useState(false)

  // ------------------- HANDLE PAGING -------------------
  // Paging borrows
  useEffect(() => {
    getBorrows(dataBorrow.pageNumber, selectedFilter, selectedDatesBorrow.from, selectedDatesBorrow.to).then((data) => {
      if(data != null) {
        console.log(data)
        setDataBorrow(data)
      }
    })
  }, [dataBorrow.pageNumber, selectedFilter, selectedDatesBorrow])
  const prevPageBorrow = () => {
    if(dataBorrow.pageNumber > 0) {
      setDataBorrow({...dataBorrow, pageNumber: dataBorrow.pageNumber - 1})
    }
  }
  const nextPageBorrow = () => {
    if(dataBorrow.pageNumber < dataBorrow.totalPages - 1) {
      setDataBorrow({...dataBorrow, pageNumber: dataBorrow.pageNumber + 1})
    }
  }

  // Paging renewals
  useEffect(() => {
    getRenews(dataRenew.pageNumber, selectedFilterRenew, selectedDatesRenew.from, selectedDatesRenew.to).then((data) => {
      if(data != null) {
        setDataRenew(data)
      }
    })
  }, [dataRenew.pageNumber, selectedFilterRenew, selectedDatesRenew])
  const prevPageRenew = () => {
    if(dataRenew.pageNumber > 0) {
      setDataRenew({...dataRenew, pageNumber: dataRenew.pageNumber - 1})
    }
  }
  const nextPageRenew = () => {
    if(dataRenew.pageNumber < dataRenew.totalPages - 1) {
      setDataRenew({...dataRenew, pageNumber: dataRenew.pageNumber + 1})
    }
  }

  // Paging reservations
  useEffect(() => {
    getReservations(dataReserve.pageNumber, selectedFilterReserve, selectedDatesReserve.from, selectedDatesReserve.to).then((data) => {
      if(data != null) {
        setDataReserve(data)
      }
    })
  }, [dataReserve.pageNumber, selectedFilterReserve, selectedDatesReserve])
  const prevPageReserve = () => {
    if(dataReserve.pageNumber > 0) {
      setDataReserve({...dataReserve, pageNumber: dataReserve.pageNumber - 1})
    }
  }
  const nextPageReserve = () => {
    if(dataReserve.pageNumber < dataReserve.totalPages - 1) {
      setDataReserve({...dataReserve, pageNumber: dataReserve.pageNumber + 1})
    }
  }

  // ------------------- HANDLE ACTIONS -------------------
  const [selectedId, setSelectedId] = useState(0)
  const handleRenew = () => {
    requestRenew(selectedId).then((data) => {
      if(data != null) {
        // update returnDate and renewalCount in borrows
        setDataBorrow({
          ...dataBorrow,
          transactions: dataBorrow.transactions.map((transaction) => {
            return {
              ...transaction,
              transactionBooks: transaction.transactionBooks.map((tb) => {
                if(tb.id === selectedId) {
                  return {
                    ...tb,
                    dueDate: data.transactionBook.dueDate,
                    renewalCount: data.transactionBook.renewalCount
                  }
                }
                return tb
              })
            }
          })
        })

        // add renew to renewals
        getRenews(dataRenew.pageNumber, selectedFilterRenew, selectedDatesRenew.from, selectedDatesRenew.to).then((data) => {
          if(data != null) {
            setDataRenew(data)
          }
        })
      }
    })
    setOpenConfirm(!openConfirm)
  }

  const [priceLost, setPriceLost] = useState(null)
  const getPriceForLost = () => {
    console.log(dataBorrow.transactions)
    for(var transaction of dataBorrow.transactions) {
      console.log(transaction)

      for(var detail of transaction.transactionBooks) {
        console.log(detail)
        if(detail.id === selectedId) {
          setPriceLost(currencyFormat(detail.book.price * 2))
          return
        }
      }
    }
    setPriceLost(null)
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
              <MenuFilter
                filters={filters}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
              />
              {
                selectedFilter !== 0 &&
                <>
                  <p>from</p>
                  <InputDate
                    onChange={(e) =>
                      setSelectedDatesBorrow({
                        ...selectedDatesBorrow,
                        from: e.target.value})
                    }
                    value={selectedDatesBorrow.from}
                  />
                  <p>to</p>
                  <InputDate
                    onChange={(e) =>
                      setSelectedDatesBorrow({
                        ...selectedDatesBorrow,
                        to: e.target.value})
                    }
                    value={selectedDatesBorrow.to}
                  />
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
            {dataBorrow.transactions.map((record) => (
              <>
                {record?.transactionBooks.map((detail, index) => (
                  <tr key={detail.id} className="" onClick={() => setSelectedId(detail.id)}>
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
                      <div className='w-fit'>
                        {detail.returnDate === null && 
                        <>
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
                          onClick={() => {
                            setOpenReport(!openReport)
                            getPriceForLost()
                          }}
                        >
                          Report lost book
                        </Button>
                      </>
                      }
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
          numPages={dataBorrow.totalPages} 
          currentPage={dataBorrow.pageNumber}
          onPageClick={(page) => 
            setDataBorrow({
              ...dataBorrow,
              pageNumber: page
            })
          }
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
            <p>Filter</p>
            <MenuFilter
              filters={filtersRenew}
              selectedFilter={selectedFilterRenew}
              setSelectedFilter={setSelectedFilterRenew}
              openMenu={openMenuRenew}
              setOpenMenu={setOpenMenuRenew}
            />
            {
              selectedFilterRenew !== 0 &&
              <>
                <p>from</p>
                <InputDate
                  onChange={(e) =>
                    setSelectedDatesRenew({
                      ...selectedDatesRenew,
                      from: e.target.value})
                  }
                  value={selectedDatesRenew.from}
                />
                <p>to</p>
                <InputDate
                  onChange={(e) =>
                    setSelectedDatesRenew({
                      ...selectedDatesRenew,
                      to: e.target.value})
                  }
                  value={selectedDatesRenew.to}
                />
              </>
            }
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
              {dataRenew.renewals.map((record) => (
                <tr key={record.id} className="even:bg-blue-gray-50/50">
                  <td className="p-2">
                    <p>{record.renewal.transactionBook?.book?.isbn}</p>
                  </td>
                  <td className="p-2">
                    <p>{record.renewal.transactionBook?.book?.name}</p>
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
          numPages={dataRenew.totalPages} 
          currentPage={dataBorrow.pageNumber}
          onPageClick={(page) => 
            setDataRenew({
              ...dataRenew,
              pageNumber: page
            })
          }
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
              <MenuFilter
              filters={filtersReserve}
              selectedFilter={selectedFilterReserve}
              setSelectedFilter={setSelectedFilterReserve}
              openMenu={openMenuReserve}
              setOpenMenu={setOpenMenuReserve}
            />
            {
              selectedFilterReserve !== 0 &&
              <>
                <p>from</p>
                <InputDate
                  onChange={(e) =>
                    setSelectedDatesReserve({
                      ...selectedDatesReserve,
                      from: e.target.value})
                  }
                  value={selectedDatesReserve.from}
                />
                <p>to</p>
                <InputDate
                  onChange={(e) =>
                    setSelectedDatesReserve({
                      ...selectedDatesReserve,
                      to: e.target.value})
                  }
                  value={selectedDatesReserve.to}
                />
              </>
            }
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
              {dataReserve.reservations.map((record) => (
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
          numPages={dataReserve.totalPages} 
          currentPage={dataReserve.pageNumber}
          onPageClick={(page) => 
            setDataReserve({
              ...dataReserve,
              pageNumber: page
            })
          }
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
        onClick={handleRenew}
      >
      </DialogConfirm>

      <DialogConfirm 
        open={openReport}
        handleOpen={() => setOpenReport(!openReport)}
        title="You have lost this book?"
        content={<span>You will be fined <span className='text-red'>{priceLost}</span> VND for losing it.</span>}
        icon={<BiMessageAltError size='2rem' />}
        haveButtons={false}
      >
      </DialogConfirm>
    </div>
  )
}

export default History
