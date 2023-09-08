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
    SimpleGrid} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEvents } from "../../features/eventSlice";
import CurrencyInput from "react-currency-input-field";

export default function EventDiscovery() {
    const dispatch = useDispatch();
    const eventList = useSelector((state) => state.events.eventList)
    const format = (val) => `$` + val
    const parse = (val) => val.replace(/^\$/, '')
    const [value, setValue] = React.useState('1.53')

    useEffect(() => {
        dispatch(fetchEvents());
    })

    return (
        <>
            <Box mb={"25vh"} mt={"10vh"}>
                <Box mb={"30px"} margin= "0 100px">
                <Heading  fontSize={"25px"} mb={"30px"}>Check Our Latest Events</Heading>
                    <SimpleGrid  columns={{base: 1, md: 2, lg: 3, xl: 4}} spacing={10} >
                        {eventList?.map((item, index) => (
                            <Card alignItems={"left"} fontSize={"md"} key={index} borderRadius={"2xl"}>
                                <CardHeader objectFit={"fit"} padding={"0"}>
                                    <Image src={item.img} />
                                </CardHeader>
                                <CardBody>
                                    <Stack fontWeight={"semibold"}> 
                                        <Text fontWeight={"bold"} fontSize={"30px"}>{item.title}</Text>
                                        <Text color={"red.500"}>{item.date}</Text>
                                        <Text color={"gray.500"}>{item.location}</Text>
                                        <Text>{item.organizer}</Text>
                                        <Text color={"blackAlpha.700"}>{item.description}</Text>
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
                                    
                                    <Button variant='solid' colorScheme='blue' size={"sm"} variant={"outline"}>
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