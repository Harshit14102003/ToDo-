import React, { createContext } from 'react'
import { useState,useContext } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock ,FaEnvelope} from "react-icons/fa";
import { toast } from 'react-hot-toast';
import { Context } from './_app';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
  const handleShowClick = () => setShowPassword(!showPassword);
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const {isAuthenticated,setIsAuthenticated,loading,setLoading}= useContext(Context);
  const submitHandler=async(e)=>{
    e.preventDefault();
    setLoading(true);
    try {
      const {data}=await axios.post('https://nodejs-todo-w0m2.onrender.com/api/v1/users/login',{
      email,password 
    },{
      headers:{
        "Content-Type":"application/json",
      },
      withCredentials:true,
    })
    toast.success(data.message);
    setIsAuthenticated(true); 
    setLoading(false);
    } catch (error) {
      toast.error("Invalid email or password");
      console.log(error); 
      setIsAuthenticated(false); 
      setLoading(false);
    }
    };
    if(isAuthenticated){
      router.push('/');
    }
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="89vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={submitHandler}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                  color="gray.300"
                    pointerEvents="none"
                    children={<FaEnvelope color="gray.300" />}
                  />
                  <Input type="email" placeholder="email address" onChange={(e)=>setEmail(e.target.value)} required value={email}/>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick} >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                isLoading={loading}
                loadingText='Logging in'
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link color="teal.500" href="/register">
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
};

export default login