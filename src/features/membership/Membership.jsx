// Membership page
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

const memberships = [
  {
    id: 1,
    type: "Regular",
    membershipFee: 50000,
    maxBooksAllowed: 3,
    maxRenewalsAllowed: 2,
    reservedBooksAllowed: 2,
  },
  {
    id: 2,
    type: "Premium",
    membershipFee: 75000,
    maxBooksAllowed: 5,
    maxRenewalsAllowed: 3,
    reservedBooksAllowed: 3,
  },
  {
    id: 3,
    type: "Student",
    membershipFee: 30000,
    maxBooksAllowed: 4,
    maxRenewalsAllowed: 2,
    reservedBooksAllowed: 1,
  }
]

const Membership = () => {
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
                  <ListItem className=""><p>Max books allowed to borrow per time: <span className="font-semibold">{membership.maxBooksAllowed}</span></p></ListItem>
                  <ListItem className=""><p>Max renewals allowed per time: <span className="font-semibold">{membership.maxRenewalsAllowed}</span></p></ListItem>
                  <ListItem className=""><p>Max reservations allowed per time: <span className="font-semibold">{membership.reservedBooksAllowed}</span></p></ListItem>
                </List>
              </CardBody>
              <CardFooter className="pt-0 w-full flex justify-center">
                <CustomButton label={"Start now"} classes={"w-fit"} />
              </CardFooter>
            </Card>
          ))}
        </div>
    </div>
  )
}

export default Membership