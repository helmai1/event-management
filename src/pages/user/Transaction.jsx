import {
  Grid,
  GridItem,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  Input,
  HStack,
  Button,
  useNumberInput,
} from '@chakra-ui/react';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Transaction() {
  //axios
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountCodeFromServer, setDiscountCodeFromServer] = useState('');
  const [remainingUses, setRemainingUses] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    Axios.get(`http://localhost:3000/events/${id}`)
      .then((result) => {
        console.log(result.data);
        setPosts(result.data);
        // this.setState({ transactionList: result.data }); //get data from json
      })
      .catch((error) => console.log(error));

    Axios.get('http://localhost:3000/discountCode')
      .then((response) => {
        console.log('discountCode data : ' + response.data.discount);
        setDiscountCodeFromServer(response.data.code);
        setRemainingUses(response.data.remainingUses);
        setDiscountPercent(response.data.discount);
      })
      .catch((error) => {
        console.error('Error fetching discount code:', error);
      });
  }, [id]);

  const handleDiscountCodeChange = (e) => {
    setDiscountCode(e.target.value);
  };

  //button increment & decrement
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    max: 6,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();
  // Increment and Decrement button handlers
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const totalPrice = quantity * posts.price;
  // Handle reservation button click
  const handleReservation = () => {
    window.alert(`Event : ${posts.event_name}, with price : ${totalPrice} Reserved successfully!`);
    window.alert('Have fun! You Refreshed to Home!');
    window.location.href = 'http://localhost:5173/';
  };

  //apply Discount
  const applyDiscount = () => {
    if (remainingUses > 0 && discountCode === discountCodeFromServer) {
      const discountedPrice = posts.price * discountPercent;
      setPosts({ ...posts, price: discountedPrice });
      setDiscountApplied(true);

      // Decrement the remaining uses of the discount code
      setRemainingUses(remainingUses - 1);

      // Update the remaining uses on the server
      Axios.patch('http://localhost:3000/discountCode', { remainingUses: remainingUses - 1 }).catch((error) => {
        console.error('Error updating remaining uses:', error);
      });

      // Update the event's price in the database

      alert('Discount Applied!');
    } else {
      setDiscountApplied(false);
      alert('Invalid discount code or code has reached its limit of uses.');
    }
  };
  return (
    <>
      <Grid mt={50} ml={20} mr={20} h="200px" templateRows="repeat(3, 1fr)" templateColumns="repeat(5, 1fr)" gap={3}>
        <GridItem colSpan={3}>
          <TableContainer>
            <Table variant="simple">
              <TableCaption>Reserve</TableCaption>
              <Thead>
                <Tr>
                  <Th>Event Name</Th>
                  <Th>Location</Th>
                  <Th isNumeric>Price</Th>
                  <Th>Date</Th>
                  <Th>Total Price</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{posts.event_name}</Td>
                  <Td>{posts.location}</Td>
                  <Td isNumeric>{posts.price}</Td>
                  <Td>{posts.date}</Td>
                  <Td>Rp. {totalPrice}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </GridItem>
        <GridItem colSpan={2}>
          <Text mt={100} as="b">
            General Admission
          </Text>
          <HStack maxW="320px" mb={5} mt={5}>
            <Button colorScheme="orange" onClick={handleDecrement}>
              -
            </Button>
            <Input {...input} value={quantity} readOnly />
            <Button colorScheme="orange" onClick={handleIncrement}>
              +
            </Button>
          </HStack>
          <Input focusBorderColor="tomato" placeholder="Code Redeem" value={discountCode} onChange={handleDiscountCodeChange} />
          <Button mt={100} colorScheme="teal" onClick={applyDiscount} isDisabled={discountApplied}>
            Apply Discount
          </Button>
          <Button mt={100} colorScheme="twitter" onClick={handleReservation}>
            Reserve a Spot
          </Button>
        </GridItem>
      </Grid>
    </>
  );
}
