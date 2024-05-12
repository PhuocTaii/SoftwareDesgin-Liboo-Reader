import { instance } from "../../config/axiosConfig";

export const getAllMemberships = async () => {
    try{
        const res = await instance.get('/all-memberships');
        const memberships = res.data.filter((membership) => membership.id > 1);
        return memberships;
    } catch (err){
        console.log(err.response);
        return null
    }
};

export const membershipPayment = async (membership, user) => {
    try{
        const fee = membership.membershipFee;
        const id = user.id;
        const res = await instance.post(`/payment/submitOrder?amount=${fee}&orderInfo=${id}`);
        console.log(res.data);
        return res.data;
    } catch(err){
        console.log(err.response);
        return null;
    }
} 