import React, {useState} from "react";
import { Input } from "@material-tailwind/react";
// import { FaInfoCircle } from "react-icons/fa";
import RadioButton from "../../components/RadioButton";
import CustomButton from "../../components/CustomButton";

const SignUp = () => {
  const [account, setAccount] = useState({email: '', password: '', name: '', id: '', birthday: '', gender: 'Male', address: ''});

  const handleChangeInfo = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setAccount({...account, [name]: value});
  }

  return (
    <form
      className="flex flex-col items-center gap-8 w-full"
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
          name='id' 
          value={account.id}
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
        <div className="flex gap-4"> {/* TODO: Update UI whenever change gender*/}
          <RadioButton 
            label="Male" 
            value='Male'
            name='gender' 
            checked={account.gender === 'Male'}
            onChange={handleChangeInfo}
          />
          <RadioButton 
            label="Female"
            value='Female'
            name='gender' 
            checked={account.gender === 'Female'} 
            onChange={handleChangeInfo}
          />
        </div>
      </div>
      <CustomButton label="Sign Up" type="submit" />
    </form>
  )
}

export default SignUp
