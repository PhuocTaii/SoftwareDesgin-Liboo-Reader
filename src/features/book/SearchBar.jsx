import React, { useState, useCallback, useEffect } from 'react'
import { BiSearch, BiChevronDown } from 'react-icons/bi'
import {
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from '@material-tailwind/react'
import {debounce} from 'lodash'

const SearchBar = ({filters, selectedFilter, setSelectedFilter, onSearch, className}) => {

  const [openMenu, setOpenMenu] = useState(false)

  const [searchTerm, setSearchTerm] = useState('')

  const debounceSearch = useCallback(
    debounce((searchTerm, selectedFilter) => {
      onSearch(searchTerm, selectedFilter)
    }, 500), // Debounce the searchBook function
    []
  );

  const handleSearch = () => {
    // const searchTerm = e.target.value;

    // if (searchTerm === '') {
    //   return;
    // }
    debounceSearch(searchTerm, selectedFilter);
  }

  useEffect(() => {
    handleSearch()
  }, [searchTerm, selectedFilter])

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
                onClick={() => setSelectedFilter(index)}>
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
          onChange={(e) => {
            setSearchTerm(e.target.value)
          }}
          icon={<BiSearch size="1.2rem" />}
        />
      </div>
    </div>
  )
}

export default SearchBar
