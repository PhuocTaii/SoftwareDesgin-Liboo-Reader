import axios from "axios";
import {slice} from "../auth/authSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const url = "http://localhost:8080/api/"

export const updateProfile = async (dispatch, id, token, user) => {
    dispatch(slice.updateBegin())
    try{
        const res = await axios.put(`${url + 'modify-user/' + id}`, {
            ...user,
            birthDate: user.birthday,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        dispatch(slice.updateSuccess(res.data))
        toast.success('Update successfully!');
    } catch(err){
        console.log(err.response);
        dispatch(slice.updateFailure());
        toast.error('Update failed!');
    }
}

export const updateImage = async (dispatch, id, token, formData) => {
    dispatch(slice.updateBegin())
    try{ 
        const res = await axios.put(`${url + 'add-user-image/' + id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })
        dispatch(slice.updateSuccess(res.data))
        toast.success('Update successfully!');
    } catch(err){
        console.log(err.response);
        dispatch(slice.updateFailure());
        toast.error('Update failed!');
    }
} 

export const getCurrentUser = async (token, id, dispatch) => {
    dispatch(slice.getCurrentUserBegin())
    try{
        const res = await axios.get(`${url + 'user/' + id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        dispatch(slice.getCurrentUserSuccess(res.data))
    } catch (err){
        console.log(err.response);
        dispatch(slice.getCurrentUserFailure());
    }
}
