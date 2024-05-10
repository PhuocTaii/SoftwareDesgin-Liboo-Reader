import { instance } from "../../config/axiosConfig";

export const getBookByIsbn = async (isbn) => {
  try{
    const res = await instance.get(`/book/isbn/${isbn}`);
    return res.data;
  } catch (err){
    console.log(err.response);
    return null
  }
}

export const getBookByName = async (name) => {
  try{
    const res = await instance.get(`/books/name?name=${name}`);
    return res.data;
  } catch (err){
    console.log(err.response);
    return null
  }
}

export const getBooks = async (page=0, searchBy=-1, query="", sortBy="") => {
  var searchOption = "";
  if(searchBy === 0)
    searchOption = "isbn";
  else if(searchBy === 1)
    searchOption = "name";
  try{
      const res = await instance.get(`/user/books?page=${page}&search-by=${searchOption}&query=${query}@sort-by=${sortBy}`);
      return res.data;
  } catch (err){
      console.log(err.response);
      return null
  }
}