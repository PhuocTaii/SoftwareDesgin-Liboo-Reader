// call API here
import { toast } from "react-toastify";
import { instance } from "../../config/axiosConfig";

export const getBorrows = async (page) => {
  try{
    const res = await instance.get(`/user/transactions?page=${page}`);
    return res.data;
  } catch (err){
    console.log(err.response);
    return null
  }
}

export const getRenews = async (page) => {
  try{
    const res = await instance.get(`/user/renewals?page=${page}`);
    return res.data;
  } catch (err){
    console.log(err.response);
    return null
  }
}
export const getReservations = async (page) => {
  try{
    const res = await instance.get(`/user/reservations?page=${page}`);
    return res.data;
  } catch (err){
    console.log(err.response);
    return null
  }
}

export const reserveBook = async (reservation) => {
  try{
    const res = await instance.post(`/user/add-reservation`, reservation);
    toast.success(res.data.message);
    return res.data
  } catch (err){
    toast.error(err.response.data);
    return null
  }
}

export const getNotPickUpBooks = async () => {
  try{
    const res = await instance.get(`/user/not-picked-up-reservations`);
    return res.data;
  } catch (err){
    console.log(err.response);
    return null
  }
}