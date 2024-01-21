import React, { useEffect, useState } from 'react'
import { Container, HStack, Text ,VStack,Image, Heading} from '@chakra-ui/react'
import axios from 'axios'
import {server} from "../index"
import Loader from './Loader'
import Errorcomponent from './Errorcomponent'
const Exchanges = () => {

const [exchanges,setExcahnges]=useState([])
const [Load,setLoad]=useState(true)
const [error,setError]=useState(false)
   useEffect(()=>{
    const fetchExchange=async()=>{
        try {
          const {data}=await axios.get(`${server}/exchanges`)
        setExcahnges(data)
        setLoad(false)
        } catch (error) {
          setError(true)
          setLoad(false)
        }
    }
    fetchExchange()
   },[])
  if(error){return (<Errorcomponent msg={"Failed to Fetch"}/>)}
  return (
    <Container maxW={"container.xl"}>
       {
        Load?<Loader/> : <>
           
           <HStack wrap={"wrap"} justifyContent={"center"}>
            {
              exchanges.map((i)=>(
                <ExchangeCard key={i.id} name={i.name} img={i.image} rank={i.trust_score_rank} url={i.url}/>
              ))
            }
           </HStack>

        </>
       }
    </Container>
  )
}
const ExchangeCard=({name,img,rank,url})=>(
  <a href={url} target={"blank"}>
        <VStack w="52" bgColor={"whiteAlpha.400"} shadow="lg" p="6" borderRadius="lg" transition="all 0.5s" m={"7"} 
        css={{
          "&:hover":{
            transform:"scale(1.1)"
          }
        }}>
          <Image src={img} w={"10"} h={"10"} objectFit={"contain"} alt="logo"/>
          <Heading size={"md"} noofLines={1}>{rank}</Heading>
          <Text noofLines={1}>{name}</Text>
        </VStack>
    </a>
)
export default Exchanges