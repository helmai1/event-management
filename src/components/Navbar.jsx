import { Box, Button, Flex, Heading, HStack, Spacer } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <Flex as="nav" p="10px" alignItems="center">
      <Heading as="h1" color="orange.400">
        EM APP
      </Heading>
      <Spacer />
      <HStack spacing="20px">
        <Link to="/">
          <Button>Find Events</Button>
        </Link>
        <Link to="create">
          <Button>Create Events</Button>
        </Link>
        <Link to="login">
          <Button>Login</Button>
        </Link>
        <Link to="register">
          <Button>Sign Up</Button>
        </Link>
      </HStack>
    </Flex>
  );
}
