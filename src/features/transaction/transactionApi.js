// call API here
import { instance } from "../../config/axiosConfig";

export const getBorrows = async (page, filterIdx="", dateFrom="", dateTo="") => {
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
    console.log("calling api")
    const res = await instance.get(`/user/transactions?page=${page}&filter-by=${filterOption()}&from=${dateFrom}&to=${dateTo}`);
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