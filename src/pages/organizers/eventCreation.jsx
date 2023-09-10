import React, { useEffect } from "react";
import {
  Flex,
  Box,
  Stack,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Input,
  Button,
  Heading,
  useToast

} from "@chakra-ui/react";

import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { postEvents } from "../../features/eventSlice";
import * as Yup from "yup";

const eventSchema = Yup.object().shape({
  event_name:Yup.string().required(),
  location: Yup.string().required(),
  date: Yup.string().required(),
  price: Yup.number().required(),
})

export default function EventCreation(){
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const refreshPage = () => {
    window.location.reload(true);
  }

  useEffect(() => {

  })

  return (
    <>
      <Box mb={"25em"}>
        <Box align="center"  margin={"40px"}>
          <Heading fontSize={"20px"}>Register your event here</Heading>    
        </Box>
        <Flex justifyContent={"center"}>
          <Box padding={"20px"} border={"2px solid black"} minWidth={{base: "400px", xl:"600px"}} maxWidth={"1000px"} borderRadius={"10px"}>
            <Formik
              initialValues={{
                event_name:"",
                location: "",
                date: "",
                price: 0,
              }}
              onSubmit={(values) => {
                dispatch(postEvents({
                  event_name:values.event_name,
                  location: values.location,
                  date: values.date,
                  price: values.price,
                }))
                toast({
                  title: "Event is created!",
                  description: "the event has been created",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                  position: "bottom-left",
                })
                navigate("/")
                refreshPage()
              }}
              validationSchema={eventSchema}
            >
              {({values, handleChange, handleBlur}) => (
                 <Form>
                 <Stack spacing={"30px"}>
                    <FormControl>
                       <FormLabel> Event Name </FormLabel>
                       <Input type="text" name="event_name" onChange={handleChange} onBlur={handleBlur} value={values.event_name}></Input>
                       <ErrorMessage component={"div"} name="event_name" style={{color:'red'}}></ErrorMessage>
                 </FormControl>
                 <FormControl>
                       <FormLabel> Location </FormLabel>
                       <Input type="text" name="location" onChange={handleChange} onBlur={handleBlur} value={values.location}></Input>
                       <ErrorMessage component={"div"} name="location" style={{color:'red'}}></ErrorMessage>
                 </FormControl>
                 <FormControl>
                       <FormLabel> Date </FormLabel>
                       <Input type="text" name="date" onChange={handleChange} onBlur={handleBlur} value={values.date}></Input>
                       <ErrorMessage component={"div"} name="date" style={{color:'red'}}></ErrorMessage>
                 </FormControl>
                 <FormControl>
                       <FormLabel> Price </FormLabel>
                       <Input type="text" name="price" onChange={handleChange} onBlur={handleBlur} value={values.price}></Input>
                       <ErrorMessage component={"div"} name="price" style={{color:'red'}}></ErrorMessage>
                        {/* <FormLabel>Price</FormLabel> */}
                       {/* <NumberInput max={99999999999} min={0} onChange={handleChange} onBlur={handleBlur} value={values.price}>
                         <NumberInputField />
                         <NumberInputStepper>
                           <NumberIncrementStepper />
                           <NumberDecrementStepper />
                         </NumberInputStepper>
                       </NumberInput> */}
                 </FormControl>
                 </Stack>
                 <Button
                   mt={"50px"}
                   width={"100%"}
                   variant={"solid"}
                   colorScheme={"blue"}
                   type='submit'
                  //  onClick={() => {
                  //   navigate("/")
                  //   refreshPage()
                  // }}
                 >
                   Reserve
                 </Button>
               </Form> 
              )}
              
            </Formik> 
          </Box>
      </Flex>
      </Box>
      
      
         
    </>
  )
}