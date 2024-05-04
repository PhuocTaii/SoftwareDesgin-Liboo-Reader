// call API here
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