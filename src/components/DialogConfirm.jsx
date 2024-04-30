import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography
} from "@material-tailwind/react";
import CustomButton from "./CustomButton";
import { BiX } from "react-icons/bi";

const DialogConfirm = ({open, handleOpen, title, content, icon = null, haveButtons = true}) => {
  return (
    <Dialog
      open={open}
      handler={handleOpen}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      size="xs"
    >
      <div className="flex items-center justify-between">
        <DialogHeader className="flex gap-4 items-center">
          {/* Icon */}
          {icon !== null &&
            <div className='bg-lightGrey flex justify-center items-center w-12 h-12 p-2 rounded-lg'>
              {icon}
            </div>
          }
          <Typography variant="h4">{title}</Typography>
        </DialogHeader>
        <BiX className="mr-3 h-8 w-8 hover:cursor-pointer" onClick={handleOpen} />
      </div>
      <DialogBody>
        {content}
      </DialogBody>
      {haveButtons &&
        <DialogFooter className="flex gap-4">
          <Button
            variant="text"
            onClick={handleOpen}
            className="w-fit"
          >
            <span>Cancel</span>
          </Button>
          <CustomButton label='Yes, confirm' classes='w-fit' type='submit' />
        </DialogFooter>
      }
    </Dialog>
  );
}

export default DialogConfirm;