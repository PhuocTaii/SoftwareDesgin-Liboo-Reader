// call API here
import axios from "axios";
import {slice} from "./authSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const url = "http://localhost:8080/api/authentication/"

export const register = async (user, dispatch, navigate) => {
    dispatch(slice.registerBegin())
    try{
        const res = await axios.post(`${url + 'signup'}`, {
            email: user.email,
            password: user.password,
            name: user.name,
            identifier: user.identifier,
            birthDate: user.birthday,
            address: user.address,
            gender: user.gender,
            phone: user.phone
        }, {
            'Content-Type': 'application/json'
        })
        dispatch(slice.registerSuccess(res.data))
        toast.success('Register successfully!');
        navigate('/');
    } catch (err){
        console.log(err.response);
        dispatch(slice.registerFailure());
        toast.error('Login failed!');
    }
}

export const login = async (user, dispatch, navigate) => {
    dispatch(slice.signInBegin())
    try{
        console.log(user)
        const res = await axios.post(`${url + 'login'}`, {
            email: user.email,
            password: user.password
        }, {
            headers:{
                'Content-Type': 'application/json'
            }
        })
        dispatch(slice.signInSuccess(res.data))
        toast.success('Login successfully!');
        navigate('/');
    } catch(err){
        console.log(err.response);
        dispatch(slice.signInFailure());
        toast.error('Login failed!');
    }
}

export const logout = async (dispatch, token) => {
    dispatch(slice.logoutBegin());
    try{
        console.log(`Bearer ${token}`);
        const res = await axios.post(`${url + 'logout'}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`}
        })
        dispatch(slice.logoutSuccess());
        toast.success('Logout successfully!');
    } catch(err){
        dispatch(slice.logoutFailure());
        toast.error(err.response);
    }
}