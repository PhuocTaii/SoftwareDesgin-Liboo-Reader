// call API here
import axios from "../../config/axiosConfig";
import {slice} from "./bookSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const getBookDetails = async (user, dispatch, navigate, bookId) => {
    dispatch(slice.getBookBeginBegin())
    try{
        const res = await axios.post('/book/' + bookId, {
            ...user,
        }, {
            'Content-Type': 'application/json'
        })
        dispatch(slice.getBookSuccess(res.data))
        toast.success('Get book details successfully!');
        navigate('/catalog/'+bookId);
    } catch (err){
        console.log(err.response);
        dispatch(slice.getBookFailure());
        toast.error(err.response.data);
    }
}