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
            'Content-Type': 'application/model-attribute'
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