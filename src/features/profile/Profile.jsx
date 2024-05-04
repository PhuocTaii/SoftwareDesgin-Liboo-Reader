import React, {useEffect, useState} from "react";
import { BiUserCircle } from 'react-icons/bi';
import { MdEdit } from 'react-icons/md';
import { Input } from "@material-tailwind/react";
import { FaInfoCircle } from "react-icons/fa";
import RadioButton from "../../components/RadioButton";
import CustomButton from "../../components/CustomButton";
import {formatDate} from '../../helpers/dateFormat'
import { useSelector, useDispatch } from 'react-redux'
import { updateProfile, updateImage } from './profileApi'


// Profile page
const Profile = () => {
  const curUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  const [account, setAccount] = useState({
    id: curUser.user.id,
    image: curUser.user.image,
    name: curUser.user.name,
    identifier: curUser.user.identifier,
    birthday: curUser.user.birthDate,
    gender: curUser.user.gender,
    email: curUser.user.email,
    address: curUser.user.address,
    makingDay: curUser.user.joinedDate,
    invalidDay: curUser.user.expiredDate,
    phone: curUser.user.phone,
  });

  useEffect(() => {
    setAccount({
      ...account,
      image: curUser.user.image,
    })
  }, [curUser.user.image])


  const handleChangeInfo = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setAccount({...account, [name]: value});
  }

  const changePhoto = (e) => {
    e.preventDefault();
    console.log(e.target.files[0].name)
    var formData = new FormData();
    formData.append('image', e.target.files[0]);
    updateImage(dispatch, account?.id, curUser?.refresh_token, formData);
  }

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    account.gender = document.getElementById("update-profile")['gender'].value === 'male'
    updateProfile(dispatch, account?.id, curUser.refresh_token, account);
  }

  return (
    <div className="w-full flex gap-8">
      <div className="relative w-32 h-32 shrink-0">
        {!account?.image ? (
          <BiUserCircle className="w-full h-full " />
        ) : (
          <img
            src={account?.image.secureUrl}
            alt="upload"
            className="object-cover w-full h-full rounded-full border"
          />
        )}
        <div
          className="absolute bottom-3 right-2 w-7 h-7 p-1 rounded-full bg-red flex items-center justify-center"
        >
          <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={changePhoto} />
          <MdEdit className="text-white text-center hover:cursor-pointer w-full h-full" onClick={() => document.querySelector('input[type="file"]').click()} />
        </div>
      </div>
      <form id="update-profile" className='w-full space-y-6' onSubmit={handleUpdateProfile}>
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
            readOnly
            onInput={(e) =>
              (e.target.value = e.target.value
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*?)\..*/g, "$1"))
            }
            pattern=".{12}"
            maxLength={12}
            onChange={handleChangeInfo}
            name="identifer"
            value={account.identifier}
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
          <Input
            variant="standard"
            label="Phone number"
            required
            onChange={handleChangeInfo}
            value={account.phone}
            name="phone"
          />
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
            value={account.invalidDay ? formatDate(account.invalidDay) : ''}
            name="invalidDay"
            labelProps={{ className: "peer-disabled:text-textDisable" }}
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
        <div className="flex justify-center pt-3">
          <CustomButton label="Save changes" type="submit" />
        </div>
      </form>
    </div>
  )
}

export default Profile