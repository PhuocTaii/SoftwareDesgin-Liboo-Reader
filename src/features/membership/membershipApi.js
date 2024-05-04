// call API here
import axios from "../../config/axiosConfig";
import {slice} from "./membershipSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const request_membership = async (user, dispatch, navigate, id) => {
    dispatch(slice.requestBegin())
    try{
        const res = await axios.post('/membership/user/request-membership/' + id, {
            ...user,
        }, {
            'Content-Type': 'application/json'
        })
        dispatch(slice.requestSuccess(res.data))
        toast.success('Request successful!');
        // Navigate to payment process here, depending on the payment method
        if (res.data.paymentMethod === 'paypal') {
            // Redirect to PayPal payment page
            window.location.href = 'https://www.paypal.com/payment_page';
        } else if (res.data.paymentMethod === 'momo') {
            // Redirect to Momo payment page
            window.location.href = 'https://www.momo.com/payment_page';
        } else {
            // If payment method is not specified or unsupported, navigate to myaccount page
            navigate('/myaccount');
        }
    } catch (err){
        console.log(err.response);
        dispatch(slice.requestFailure());
        toast.error(err.response.data);
    }
}

export const update_membership = async (user, dispatch, navigate, id) => {
    dispatch(slice.updateBegin())
    try{
        const res = await axios.post('/membership/user/update-membership/' + id, {
            ...user,
        }, {
            'Content-Type': 'application/json'
        })
        dispatch(slice.updateSuccess(res.data))
        toast.success('Update membership successful!');
        navigate('/myaccount');
    } catch (err){
        console.log(err.response);
        dispatch(slice.updateFailure);
        toast.error(err.response.data);
    }
}
