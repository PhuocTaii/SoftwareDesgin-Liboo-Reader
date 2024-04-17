import React from 'react'
import { Button } from '@material-tailwind/react'

const CustomButton = ({label, onClick, type, classes, disabled, icon}) => {
  return (
    <Button 
      className={`flex items-center justify-center w-[18.75rem] h-10 ${classes}`} 
      style={{backgroundImage: `linear-gradient(to right, var(--my-red), var(--my-orange)`}}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {label}
      {icon}
    </Button>
  )
}

export default CustomButton