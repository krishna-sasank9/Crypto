import React from 'react'
import { Alert, AlertIcon, } from '@chakra-ui/react'
const Errorcomponent = ({msg}) => {
  return (
    <Alert pos={"fixed"}  status='error' top={"25%"} left={"50%"} w={"container.lg"} transform={"translateX(-50%)"}>
      <AlertIcon/>
      {msg}
    </Alert>
  )
}

export default Errorcomponent