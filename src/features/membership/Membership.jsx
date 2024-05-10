import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Typography,
  Button,
  List,
  ListItem
} from "@material-tailwind/react";
import CustomButton from "../../components/CustomButton";
import { currencyFormat } from "../../helpers/currency";
import {getAllMemberships} from './membershipApi';
import React, {useEffect, useState} from 'react'
import {membershipPayment} from './membershipApi';
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedItem } from '../../slices/menu';

const Membership = () => {
  const [memberships, setMemberships] = useState([]);
  const curUser = useSelector((state) => state.auth.currentUser.user);
  const dispatch = useDispatch();

  dispatch(setSelectedItem(4))

  useEffect(() => {
    getAllMemberships().then((data) => {
      if(data){
        setMemberships(data);
      }
    })
  }, [])

  const handleOrder = (membership) => {
    console.log(membership)
    membershipPayment(membership, curUser, dispatch).then((data) => {
      window.location.href = data
    })
  };
  
  return (
    <div className="flex w-full h-full flex-col gap-4">
      <h1 className='text-2xl font-semibold text-center'>MEMBERSHIP</h1>

      <div className="flex w-full h-full justify-between">
        {memberships.map((membership, index) => (
            <Card className="w-fit h-fit">
              <CardHeader className="m-0 mb-4">
                <div className={`flex flex-col items-center justify-center h-32 ${index===0 ? 'bg-deep-orange-50' : index===1 ? 'bg-deep-orange-100' : 'bg-deep-orange-200'}`}>
                  <Typography variant="h4">
                    {currencyFormat(membership.membershipFee)} VND
                  </Typography>
                  <Typography variant="paragraph">
                    per year
                  </Typography>
                </div>
              </CardHeader>
              <CardBody className="flex flex-col gap-2 items-center p-0">
                <Typography variant="h5" className="">
                  {membership.type}
                </Typography>
                <List className="w-full">
                  <ListItem className=""><p>Max number of books borrowed at a time: <span className="font-semibold">{membership.maxBook}</span></p></ListItem>
                  <ListItem className=""><p>Max number of times to renew a book: <span className="font-semibold">{membership.maxRenewal}</span></p></ListItem>
                  <ListItem className=""><p>Max number of books reserved at a time: <span className="font-semibold">{membership.reserve}</span></p></ListItem>
                </List>
              </CardBody>
              <CardFooter className="pt-0 w-full flex justify-center">
                {
                  membership.type !== "Student" ?
                  <CustomButton 
                    onClick={() => handleOrder(membership)} 
                    label={curUser.membership.type === membership.type ? "Renew" : "Start now"} 
                    classes={"w-fit"}
                  /> : 
                  <CustomButton 
                    label={"Register at library"} 
                    classes={"w-fit"} 
                    disabled={true} 
                  />
                }
              </CardFooter>
            </Card>
          ))}
        </div>
    </div>
  )
}

export default Membership