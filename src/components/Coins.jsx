import React, { useEffect, useState } from 'react'
import { Container, HStack, Text ,VStack,Image, Heading, Button, RadioGroup, Radio} from '@chakra-ui/react'
import axios from 'axios'
import {server} from "../index"
import Loader from './Loader'
import Errorcomponent from './Errorcomponent'
import { Link } from 'react-router-dom'

const Coins = () => {
const [coins,setCoins]=useState([])
const [Load,setLoad]=useState(true)
const [error,setError]=useState(false)
const [page,setPage]=useState(1)
const [currency,setCurrency]=useState("inr")
const changePage=(p)=>{
  setPage(p);
  setLoad(true)
}
const btn=new Array(100).fill(1)
const currencySymbol=currency==="inr"?"₹":currency==="usd"?"$":"€"
   useEffect(()=>{
    const fetchCoin=async()=>{
        try {
          const {data}=await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
        setCoins(data)
        console.log(data)
        setLoad(false)
        } catch (error) {
          setError(true)
          setLoad(false)
        }
    }
    fetchCoin()
   },[currency,page])
  if(error){return (<Errorcomponent msg={"Failed to Fetch"}/>)}
  return (
    <Container maxW={"container.xl"}>
       {
        Load?<Loader/> : 
        <>
           <RadioGroup  value={currency} onChange={setCurrency}>
             <HStack spacing={"2"} p={"6"}  justifyContent={"center"}>
              <Radio value={"inr"}>₹-INR</Radio>
              <Radio value={"usd"}>$-USD</Radio>
              <Radio value={"eur"}>€-EUR</Radio>
             </HStack>
           </RadioGroup>
           
           <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {
              coins.map((i)=>(
                <CoinCard id={i.id} key={i.id} name={i.name} img={i.image} price={i.current_price} symbol={i.symbol} url={i.url} currencySymbol={currencySymbol} />
              ))
            }
           </HStack>
           <HStack w={"full"} overflowX={"auto"} m={"1"} p={"8"}>
            {
              btn.map((item,i)=>(
              <Button key={i} bgColor={"blackAlpha.900"} jus color={"white"} onClick={()=>changePage(i+1)}>{i+1}</Button>
            ))
            }
           </HStack>

        </>
       }
    </Container>
  )
}
const CoinCard=({id,name,img,symbol,price,currencySymbol="₹"})=>(
  <Link to={`/coins/${id}`} >
        <VStack w="52" bgColor={"whiteAlpha.400"} shadow="lg" p="6" borderRadius="lg" transition="all 0.5s" m={"7"} 
        css={{
          "&:hover":{
            transform:"scale(1.1)"
          }
        }}>
          <Image src={img} w={"10"} h={"10"} objectFit={"contain"} alt="logo"/>
          <Heading size={"md"} noofLines={1}>{symbol}</Heading>
          <Text noofLines={1}>{name}</Text>
          <Text noofLines={1}>{price?`${currencySymbol}${price}`:"NA"}</Text>
        </VStack>
    </Link>
)
export default Coins