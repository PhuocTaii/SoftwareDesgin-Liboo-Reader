import React, {useState} from "react";
import { BiUserCircle } from 'react-icons/bi';
import { MdEdit } from 'react-icons/md';
import { Input } from "@material-tailwind/react";
import { FaInfoCircle } from "react-icons/fa";
import RadioButton from "../../components/RadioButton";
import CustomButton from "../../components/CustomButton";
import {formatDate} from '../../helpers/dateFormat'

// Profile page
const Profile = () => {
  // Dummy account object
  const [account, setAccount] = useState({
    image: '', // You can add a placeholder image URL here if needed
    username: 'example_user',
    name: 'John Doe',
    id: '123456789012',
    birthday: '1990-01-01',
    sex: 'Male',
    email: 'example@example.com',
    address: '123 Street, City, Country',
    makingDay: new Date(),
    invalidDay: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  });

  const handleChangeInfo = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setAccount({...account, [name]: value});
  }

  const changePhoto = (e) => {
    e.preventDefault();
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setAccount({...account, image: reader?.result});
      // updateInfo(dispatch, account._id, user?.accessToken , {...account, image: reader?.result});
    }
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    // updateInfo(dispatch, account?._id, account?.accessToken, account);
  }

  return (
    <div className="w-full flex gap-8">
      <div className="relative w-32 h-32 shrink-0">
        {!account?.image ? (
          <BiUserCircle className="w-full h-full" />
        ) : (
          <img
            src={account?.image}
            alt="upload"
            className="object-cover w-full h-full rounded-full"
          />
        )}
        <div
          className="absolute bottom-3 right-2 w-7 h-7 p-1 rounded-full bg-red flex items-center justify-center"
        >
          <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={changePhoto} />
          <MdEdit className="text-white text-center hover:cursor-pointer w-full h-full" onClick={() => document.querySelector('input[type="file"]').click()} />
        </div>
      </div>
      <form className='w-full space-y-6' onSubmit={handleUpdateProfile}>
        <h1 className='text-2xl font-semibold text-center'>PROFILE</h1>
        <div className='w-full grid grid-cols-2 gap-4'>
          <Input
            variant="standard"
            label="Email"
            required
            type="email"
            onChange={handleChangeInfo}
            value={account.email}
            name="email"
            readOnly
          />
          <Input
            variant="standard"
            label="Name"
            required
            onChange={handleChangeInfo}
            name="name"
            value={account.name}
          />
          <Input
            variant="standard"
            label="ID number"
            required
            onInput={(e) =>
              (e.target.value = e.target.value
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*?)\..*/g, "$1"))
            }
            pattern=".{12}"
            maxLength={12}
            onChange={handleChangeInfo}
            name="id"
            value={account.id}
          />
          <Input
            variant="standard"
            label="Birthdate"
            required
            type="date"
            onChange={handleChangeInfo}
            name="birthday"
            value={account.birthday === '' ? '' : new Date(account.birthday).toISOString().slice(0, 10)}
          />
          <div className="flex gap-4 self-end"> 
            <RadioButton
              label="Male"
              onChange={handleChangeInfo}
              value="Male"
              name="sex"
              checked={account.sex === "Male"}
            />
            <RadioButton
              label="Female"
              onChange={handleChangeInfo}
              value="Female"
              name="sex"
              checked={account.sex === "Female"}
            />
          </div>
          <Input
            variant="standard"
            label="Address"
            required
            onChange={handleChangeInfo}
            value={account.address}
            name="address"
          />
          <Input
            variant="standard"
            label="Registration date"
            readOnly
            value={formatDate(account.makingDay)}
            name="makingDay"
            labelProps={{ className: "peer-disabled:text-textDisable" }}
          />
          <Input
            variant="standard"
            label="Expiration date"
            readOnly
            value={formatDate(account.invalidDay)}
            name="invalidDay"
            labelProps={{ className: "peer-disabled:text-textDisable" }}
          />
        </div>
        <div className="flex justify-center pt-3">
          <CustomButton label="Save changes" type="submit" />
        </div>
      </form>
    </div>
  )
}

export default Profile
