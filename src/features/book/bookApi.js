import { instance } from "../../config/axiosConfig";
import axios from "../../config/axiosConfig";
import {slice} from "./bookSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const getBooks = async (page) => {
  try{
    const res = await instance.get(`/all-books?page=${page}`);
    return res.data;
  } catch (err){
    console.log(err.response);
    return null
  }
}

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
        const res = await instance.get(`/book/name?name=${name}`);
        return res.data;
    } catch (err){
        console.log(err.response);
        return null
    }
}