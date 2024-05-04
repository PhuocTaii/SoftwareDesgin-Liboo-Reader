import React, { useState } from "react";
import { Input } from "@material-tailwind/react";
import CustomButton from "../../components/CustomButton";
import { FaRegUser, FaLock } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./authApi";


// Login form component
const Login = () => {

  const [account, setAccount] = useState({email: '', password: ''});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeInfo = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setAccount({...account, [name]: value});
  }

  const handleLogin = (e) => {
    e.preventDefault();
    login(account, dispatch, navigate);
  }

  return (
    <form className="flex flex-col items-center gap-8 w-full"
      onSubmit={(e) => handleLogin(e)}
    >
      <div className="w-full flex flex-col gap-3">
        <Input 
          icon={<FaRegUser />} 
          label="Email"
          onChange={handleChangeInfo}
          required
          name="email"
          value={account.email}
        />
        <Input 
          icon={<FaLock />} 
          label="Password"
          type="password"
          onChange={handleChangeInfo}
          required
          name="password"
          value={account.password}
        />
      </div>
      <CustomButton label="Sign In" type='submit' />
    </form>
  )
}

export default Login
