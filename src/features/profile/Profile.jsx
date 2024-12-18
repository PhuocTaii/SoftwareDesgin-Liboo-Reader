import React, {useEffect, useState} from "react";
import { BiUserCircle } from 'react-icons/bi';
import { MdEdit } from 'react-icons/md';
import { Input } from "@material-tailwind/react";
import { FaInfoCircle } from "react-icons/fa";
import RadioButton from "../../components/RadioButton";
import CustomButton from "../../components/CustomButton";
import {formatDate} from '../../helpers/dateFormat'
import { useSelector, useDispatch } from 'react-redux'
import { updateProfile, updateImage, getCurrentUser } from './profileApi'
import { setSelectedItem } from '../../slices/menu';

// Profile page
const Profile = () => {
  const curUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  dispatch(setSelectedItem(3))
  console.log(curUser)

  useEffect(() => {
    getCurrentUser(curUser.id, dispatch);
  }, [])

  const [account, setAccount] = useState({
    id: curUser.id,
    image: curUser.image,
    name: curUser.name,
    identifier: curUser.identifier,
    birthday: curUser.birthDate,
    gender: curUser.gender,
    email: curUser.email,
    address: curUser.address,
    makingDay: curUser.joinedDate,
    invalidDay: curUser.expiredDate,
    phone: curUser.phone,
    membership: curUser.membership,
  });

  useEffect(() => {
    setAccount({
      id: curUser.id,
      image: curUser.image,
      name: curUser.name,
      identifier: curUser.identifier,
      birthday: curUser.birthDate,
      gender: curUser.gender,
      email: curUser.email,
      address: curUser.address,
      makingDay: curUser.joinedDate,
      invalidDay: curUser.expiredDate,
      phone: curUser.phone,
      membership: curUser.membership,
    })
    curUser.gender ?
      document.getElementById("update-gender-male").checked = true :
      document.getElementById("update-gender-female").checked = true

  }, [curUser])

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
    updateImage(dispatch, account?.id, formData);
  }

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    account.gender = document.getElementById("update-profile")['gender'].value
    updateProfile(dispatch, account?.id, account);
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
          <div className="flex gap-4">
            <RadioButton 
              label="Male" 
              value={true}
              name='gender'
              defaultChecked={true}
              id="update-gender-male"
            />
            <RadioButton 
              label="Female"
              value={false}
              name='gender'
              id="update-gender-female"
            />
          </div>
          <Input
            variant="standard"
            label="Membership"
            required
            type="membership"
            value={account.membership.type}
            name="membership"
            readOnly
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
        </div>
        <div className="flex justify-center pt-3">
          <CustomButton label="Save changes" type="submit" />
        </div>
      </form>
    </div>
  )
}

export default Profile