// call API here
import { instance } from "../../config/axiosConfig";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const getBorrows = async (page, filterIdx, dateFrom, dateTo) => {
  const filterOption = () => {
      switch(filterIdx){
      case 1:
        return "borrow-date"
      case 2:
        return "due-date"
      case 3:
        return "return-date"
      default:
        {
          dateFrom = ""
          dateTo = ""
          return ""
        }
    }
  }

  if(filterOption() !== "" && (dateFrom === "" || dateTo === ""))
    return null

  try{
    const res = await instance.get(`/user/transactions?page=${page}&filter-by=${filterOption()}&from=${dateFrom}&to=${dateTo}`);
    return res.data;
  } catch (err){
    console.log(err.response);
    return null
  }
}

export const getRenews = async (page, filterIdx, dateFrom, dateTo) => {
  if(filterIdx !== 0 && (dateFrom === "" || dateTo === ""))
    return null

  if(filterIdx === 0) {
    dateFrom = ""
    dateTo = ""
  }

  console.log("calling api")
  try{
    const res = await instance.get(`/user/renewals?page=${page}&from=${dateFrom}&to=${dateTo}`);
    return res.data;
  } catch (err){
    console.log(err.response);
    return null
  }
}

export const getReservations = async (page, filterIdx, dateFrom, dateTo) => {
  const filterOption = () => {
    switch(filterIdx){
    case 1:
      return "reserve-date"
    case 2:
      return "pickup-date"
    default:
      {
        dateFrom = ""
        dateTo = ""
        return ""
      }
  }
}

  if(filterOption() !== "" && (dateFrom === "" || dateTo === ""))
    return null

  try{
    const res = await instance.get(`/user/reservations?page=${page}&filter-by=${filterOption()}&from=${dateFrom}&to=${dateTo}`);
    return res.data;
  } catch (err){
    console.log(err.response);
    return null
  }
}

export const requestRenew = async (transactionId) => {
  console.log("calling api")
  try{
    const res = await instance.post(`/user/request-renewal`, {
      "transactionBook": transactionId
    });
    toast.success('Renew successfully!');
    return res.data;
  } catch (err){
    console.log(err.response);
    toast.error(err.response.data);
    return null
  }
}