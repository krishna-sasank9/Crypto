import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';
import img from '../assets/btc.png'
import {motion} from 'framer-motion'
const Home = () => {
  return <Box bgColor={"blackAlpha.900"} w={"full"} h={"85vh"}>
     <motion.div style={{
      height:"80vh",
     }}
     animate={{
          translateY: "20px",
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
     >
     <Image w={"full"} h={"full"} objectFit={"contain"} src={img}/>
     </motion.div>
     <Text fontSize={"6xl"} textAlign={"center"} fontWeight={'thin'} color={"white"} marginTop={"-20"}>
      Crypto
     </Text>
  </Box>;
};

export default Home;
