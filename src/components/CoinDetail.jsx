import {
  Box,
  Button,
  Container,
  RadioGroup,
  Radio,
  HStack,
  VStack,
  Text,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Badge,
  Progress,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader';
import { server } from '../index';
import { useParams } from 'react-router-dom';
import Errorcomponent from './Errorcomponent';
import Chart from './Chart';
const CoinDetail = () => {
  const [coin, setCoin] = useState([]);
  const [Load, setLoad] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState('inr');
  const [days,setDays]=useState("24h")
  const [array,setArray]=useState([])
  const params = useParams();
  const currencySymbol =
    currency === 'inr' ? '₹' : currency === 'usd' ? '$' : '€';
  
    const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];
    const switchChart = (key) => {
      switch (key) {
        case "24h":
          setDays("24h");
          setLoad(true);
          break;
        case "7d":
          setDays("7d");
          setLoad(true);
          break;
        case "14d":
          setDays("14d");
          setLoad(true);
          break;
        case "30d":
          setDays("30d");
          setLoad(true);
          break;
        case "60d":
          setDays("60d");
          setLoad(true);
          break;
        case "200d":
          setDays("200d");
          setLoad(true);
          break;
        case "1y":
          setDays("365d");
          setLoad(true);
          break;
        case "max":
          setDays("max");
          setLoad(true);
          break;
  
        default:
          setDays("24h");
          setLoad(true);
          break;
      }
    };

    useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        const { data:chartData } = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
        setArray(chartData.prices)
        setCoin(data);
        setLoad(false);
      } catch (error) {
        setError(true);
        setLoad(false);
      }
    };
    fetchCoin();
  }, [params.id,currency,days]);

  if (error) {
    return <Errorcomponent msg={'Failed to Fetch'} />;
  }
  return (
    <Container maxW={'container.xl'}>
      {Load ? (
        <Loader />
      ) : (
        <>
          <Box borderWidth={1} w={'full'}>
            <Chart arr={array} currency={currencySymbol} days={days}/>
          </Box>
          <HStack p="4" overflowX={"auto"}>
            {btns.map((i) => (
              <Button
                disabled={days === i}
                key={i}
                onClick={() => switchChart(i)}
              >
                {i}
              </Button>
            ))}
          </HStack>
          <RadioGroup value={currency} onChange={setCurrency}>
            <HStack spacing={'2'} p={'6'} justifyContent={'space-evenly'}>
              <Radio value={'inr'}>₹-INR</Radio>
              <Radio value={'usd'}>$-USD</Radio>
              <Radio value={'eur'}>€-EUR</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={'4'} padding={'8'} alignItems={'flex-start'}>
            <Text fontSize={'medium'} alignSelf={'center'}>
              Last Updated on{' '}
              {Date(coin.market_data.last_updated).split('G')[0]}
            </Text>
            <Image
              src={coin.image.large}
              w={'20'}
              h={'20'}
              objectFit={'contain'}
            />
            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol}
                {coin.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h > 0
                      ? 'increase'
                      : 'decrease'
                  }
                />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>
            <Badge fontSize={'2xl'} bgColor={'blackAlpha.700'} color={'white'}>
              {`#${coin.market_cap_rank}`}
            </Badge>
            <CustomBar
              high={`${coin.market_data.high_24h[currency]}`}
              low={`${coin.market_data.low_24h[currency]}`}
            />
            <Box w={"full"} p={"4"}>
                 <Item title={"Max Supply"} value={coin.market_data.max_supply}/>
                 <Item title={"Circulating Supply"} value={coin.market_data.circulating_supply}/>
                 <Item title={"Market Capital"} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}/>
                 <Item title={"All time Low"} value={`${currencySymbol}${coin.market_data.atl[currency]}`}/>
                 <Item title={"All time High"} value={`${currencySymbol}${coin.market_data.ath[currency]}`}/>
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};
const Item=({title,value})=>(
    <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
      <Text fontFamily={"sans-serif"} letterSpacing={"wider"}>{title}</Text>
      <Text>{value}</Text>
    </HStack>
)

const CustomBar = ({ high, low }) => (
  <VStack w={'full'}>
    <Progress value={50} colorScheme="teal" w={'full'} />
    <HStack justifyContent={'space-between'} w={'full'}>
      <Badge children={low} colorScheme="red" />
      <Text>24H</Text>
      <Badge children={high} colorScheme="green" />
    </HStack>
  </VStack>
);

export default CoinDetail;
