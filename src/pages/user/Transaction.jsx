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
  Tfoot,
  Text,
  Input,
  HStack,
  Button,
  useNumberInput,
} from '@chakra-ui/react';
import React from 'react';

export default function Transaction() {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    max: 6,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();
  return (
    <>
      <Grid mt={50} ml={20} mr={20} h="200px" templateRows="repeat(3, 1fr)" templateColumns="repeat(5, 1fr)" gap={3}>
        <GridItem colSpan={3}>
          <TableContainer>
            <Table variant="simple">
              <TableCaption>Reserve</TableCaption>
              <Thead>
                <Tr>
                  <Th>Name Event</Th>
                  <Th>Location</Th>
                  <Th isNumeric>Price</Th>
                  <Th>Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Comic Frontier</Td>
                  <Td>BSD, Tangerang</Td>
                  <Td isNumeric>30000</Td>
                  <Td>2 Desember 2023</Td>
                </Tr>
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th></Th>
                  <Th></Th>
                  <Th>Total</Th>
                  <Th isNumeric>30000</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </GridItem>
        <GridItem colSpan={2}>
          <Text as="b">Booking Date</Text>
          <Input placeholder="Select Date and Time" size="md" type="date" />
          <Text as="b">General Admission</Text>
          <HStack maxW="320px" mb={5} mt={5}>
            <Button colorScheme="orange" {...dec}>
              -
            </Button>
            <Input {...input} />
            <Button colorScheme="orange" {...inc}>
              +
            </Button>
          </HStack>
          <Input focusBorderColor="tomato" placeholder="Code Redeem" />
          <Button mt={100} colorScheme="twitter">
            Reserve a Spot
          </Button>
        </GridItem>
      </Grid>
    </>
  );
}
