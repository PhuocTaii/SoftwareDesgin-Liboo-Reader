// import axios from "axios";
import { instance } from "../../config/axiosConfig";
import {slice} from "../auth/authSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const updateProfile = async (dispatch, id, user) => {
    dispatch(slice.updateBegin())
    try{
        const res = await instance.put(`/modify-user/${id}`, {
            ...user,
            birthDate: user.birthday,
        }, {
            headers: {
                'Content-Type': 'application/json',
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

export const updateImage = async (dispatch, id, formData) => {
    dispatch(slice.updateBegin())
    try{ 
        const res = await instance.put(`/add-user-image/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
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

export const getCurrentUser = async (id, dispatch) => {
    dispatch(slice.getCurrentUserBegin())
    try{
        const res = await instance.get(`/user/${id}`)
        dispatch(slice.getCurrentUserSuccess(res.data))
    } catch (err){
        console.log(err.response);
        dispatch(slice.getCurrentUserFailure());
    }
}
