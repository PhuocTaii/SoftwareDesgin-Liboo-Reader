// call API here
import axios from "../../config/axiosConfig";
import { instance } from "../../config/axiosConfig";
import {slice} from "./authSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const register = async (user, dispatch, navigate) => {
    dispatch(slice.registerBegin())
    try{
        const res = await axios.post('/authentication/signup', {
            ...user,
            birthDate: user.birthday,
        }, {
            'Content-Type': 'application/json'
        })
        window.localStorage.setItem('access_token', res.data.access_token);
        window.localStorage.setItem('refresh_token', res.data.refresh_token);
        dispatch(slice.registerSuccess(res.data.user))
        toast.success('Register successfully!');
        navigate('/');
    } catch (err){
        dispatch(slice.registerFailure());
        toast.error(err.response.data);
    }
}

export const login = async (user, dispatch, navigate) => {
    dispatch(slice.signInBegin())
    try{
        const res = await axios.post('/authentication/user/login', user, {
            'Content-Type': 'application/json'
        })
        window.localStorage.setItem('access_token', res.data.access_token);
        window.localStorage.setItem('refresh_token', res.data.refresh_token);
        dispatch(slice.registerSuccess(res.data.user))
        toast.success('Login successfully!');
        navigate('/');
    } catch(err){
        dispatch(slice.signInFailure());
        toast.error(err.response.data);
    }
}

export const logout = async (dispatch, token) => {
    dispatch(slice.logoutBegin());
    try{
        const res = await instance.post('/authentication/logout');
        dispatch(slice.logoutSuccess());
        window.localStorage.clear();
        toast.success('Logout successfully!');
    } catch(err){
        dispatch(slice.logoutFailure());
        toast.error(err.response.data);
    }
}