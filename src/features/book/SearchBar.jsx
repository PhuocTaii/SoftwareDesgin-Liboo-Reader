import React, { useState, useRef, useEffect } from 'react'
import { BiSearch, BiChevronDown } from 'react-icons/bi'
import {
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import { getBookByName, searchBookByIsbn } from './bookApi'
import { debounce } from 'lodash'
import { useCallback } from 'react'

const SearchBar = ({ className }) => {
  const filters = ['ISBN', 'name']

  const [selectedFilter, setSelectedFilter] = useState(0)
  const [openMenu, setOpenMenu] = useState(false)

  const [bookList, setBookList] = useState([]);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  function searchBook(searchTerm, selectedFilter) {
    if(selectedFilter === 0)
      searchBookByIsbn(searchTerm).then(res => {
        setBookList(res)}
      )
    else
      getBookByName(searchTerm).then(res => {
        setBookList(res)}
      );
  }

  const debounceSearch = useCallback(
    debounce((searchTerm, selectedFilter) => {
      searchBook(searchTerm, selectedFilter)
      setOpen(true)
    }, 500), // Debounce the searchBook function
    []
  );

  const handleSearchBook = (e) => {
    const searchTerm = e.target.value;

    if (searchTerm === '') {
      setBookList([]);
      setOpen(false);
      return;
    } else {
      debounceSearch(searchTerm, selectedFilter);
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={`flex w-full sm:w-[23rem] ${className}`}>
      <Menu placement="bottom-start" open={openMenu} handler={setOpenMenu}>
        <MenuHandler>
          <Button
            ripple={false}
            variant="text"
            color="blue-gray"
            className="flex justify-between w-fit h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 px-3">
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
                onClick={() =>
                  setSelectedFilter(index)}>
                <p className="capitalize">{item}</p>
              </MenuItem>
            )
          })}
        </MenuList>
      </Menu>
      <div className="w-full relative">
        <Input
          type="text"
          placeholder="Search..."
          className="w-full rounded-l-none !border-t-blue-gray-200 focus:!border-gray-300 focus:border-2"
          labelProps={{
            className: 'before:content-none after:content-none',
          }}
          onChange={handleSearchBook}
          icon={<BiSearch size="1.2rem" />}
        />
        {open &&
          <div ref={menuRef} className='z-50 w-full h-fit absolute top-12 space-y-2 bg-white border-blue-gray-200 border-[1.2px] rounded-md px-1.5 py-2 overflow-auto'>
          {
            bookList.length !== 0 ?
            bookList.map((item) => (
              <Link key={item.isbn} to={`/catalog/${item.isbn}`}>
                <div key={item.id} className='space-y-2'>
                  <div className='flex gap-2 w-full h-fit cursor-pointer'>
                    <img src={item.image.secureUrl} alt='book' className='w-10 h-10 object-cover' />
                    <div>
                      <p>{item.name}</p>
                      <p>{item.isbn}</p>
                    </div>
                  </div>
                  <hr />
                </div>
              </Link>
            ))
            :
            <p className='font-medium'>No book found</p>
          }
          </div>
        }
      </div>
    </div>
  )
}

export default SearchBar
