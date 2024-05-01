import React, {useState} from "react";
import { Input, Typography } from "@material-tailwind/react";
import { FaInfoCircle } from "react-icons/fa";
import RadioButton from "../../components/RadioButton";
import CustomButton from "../../components/CustomButton";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "./authApi";

const SignUp = () => {
  const [account, setAccount] = useState({email: '', password: '', name: '', identifier: '', birthday: '', gender: true, address: '', phone: ''});
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleChangeInfo = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    if(name !== 'gender') {
      setAccount(prevAccount => 
        ({
          ...prevAccount, 
          [name]: value
        }));
    }
  }

  const handleSignup = (e) => {
    e.preventDefault();
    account.gender = document.getElementById("form-sign-up")['gender'].value === 'male'
    console.log(account)
    register(account, dispatch, navigate)
  }

  return (
    <form
      id="form-sign-up"
      className="flex flex-col items-center gap-8 w-full"
      onSubmit={(e) => handleSignup(e)}
    >
      <div className="w-full grid grid-cols-2 gap-3">
        <Input
          label="Email"
          type="email"
          required
          onChange={handleChangeInfo}
          name='email' 
          value={account.email}
        />
        <Input
          label="Password"
          type="password"
          required
          onChange={handleChangeInfo}
          name='password' 
          value={account.password}
        />
        <Input
          label="Name"
          required
          onChange={handleChangeInfo}
          name='name' 
          value={account.name}
        />
        <Input
          label="ID"
          required
          onChange={handleChangeInfo}
          onInput={(e) => e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')}
          pattern=".{12}"
          name='identifier'
          value={account.identifier}
        />
        <Input
          label="Birthdate"
          type="date"
          required
          onChange={handleChangeInfo}
          name='birthday' 
          value={account.birthday}
        />
        <Input
          label="Address"
          required
          onChange={handleChangeInfo}
          name='address' 
          value={account.address}
        />
        <Input
          label="Phone"
          required
          onChange={handleChangeInfo}
          name='phone' 
          value={account.phone}
        />
        <div className="flex gap-4">
          <RadioButton 
            label="Male" 
            value={true}
            name='gender'
            defaultChecked={true}
          />
          <RadioButton 
            label="Female"
            value={false}
            name='gender'
          />
        </div>
      </div>
      <CustomButton label="Sign Up" type="submit" />
    </form>
  )
}

export default SignUp
