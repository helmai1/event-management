import React, { useEffect } from "react";
import 
{   Text, 
    Flex,
    Box,
    Card, 
    CardHeader, 
    CardBody, 
    CardFooter,
    Image,
    Divider, 
    Stack,
    Button,
    Heading,
    SimpleGrid,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightAddon
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEvents } from "../../features/eventSlice";
import CurrencyInput from "react-currency-input-field";

export default function EventDiscovery() {
    const dispatch = useDispatch();
    const eventList = useSelector((state) => state.events.eventList)

    useEffect(() => {
        dispatch(fetchEvents());
    })

    return (
        <>
        {/* <Flex minWidth={{base: "200px", xl:"300px"}} maxWidth={"500px"} ml={"10px"} justifyContent={"center"}>
            <InputGroup borderRadius={5} size="sm">
            <InputLeftElement
            pointerEvents="none"
            />
            <Input type="text" placeholder="Search..." border="1px solid #949494"
                onChange={(values) => {
                    dispatch(getFilteredEvent(values))
                }}
            />
            <InputRightAddon
            p={0}
            border="none"
            >
            <Button size="sm" borderLeftRadius={0} borderRightRadius={3.3} border="1px solid #949494"
            >
                Search
            </Button>
            </InputRightAddon>
            </InputGroup>
        </Flex> */}
            <Box mb={"25vh"} mt={"10vh"}>
                <Box mb={"30px"} margin= "0 100px">
                <Heading  fontSize={"25px"} mb={"30px"}>Check Our Latest Events</Heading>
                    <SimpleGrid  columns={{base: 1, md: 2, lg: 3, xl: 4}} spacing={10} >
                        {eventList?.map((item, index) => (
                            <Card alignItems={"left"} fontSize={"md"} key={index} borderRadius={"2xl"}>
                                <CardBody>
                                    <Stack fontWeight={"semibold"}> 
                                        <Text fontWeight={"bold"} fontSize={"20px"}>{item.event_name}</Text>
                                        <Text color={"red.500"}>{item.date}</Text>
                                        <Text color={"gray.500"}>{item.location}</Text>
                                    </Stack>         
                                </CardBody>
                                <Divider/>
                                <CardFooter fontWeight={"bold"} justify={"space-between"}>
                                    <Flex w={"50%"} fontSize={"15px"}>
                                        <CurrencyInput  
                                            mt={"30px"}
                                            prefix="Rp"
                                            value={item.price}
                                        />
                                    </Flex>
                                    
                                    <Button colorScheme='blue' size={"sm"} variant={"outline"}>
                                        Reserve Now
                                    </Button>
                                </CardFooter>       
                            </Card>
                        ))} 
                     </SimpleGrid>
                </Box>
            </Box>
           
        </>
    )
}