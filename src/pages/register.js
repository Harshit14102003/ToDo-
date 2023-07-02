
import React,{ useState,useContext,useEffect } from "react";
import axios from 'axios';
import  toast from 'react-hot-toast';
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
import { useRouter } from "next/navigation";
import { Context } from "./_app";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const register = () => {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
    const [showPassword, setShowPassword] = useState(false);
    const {isAuthenticated,setIsAuthenticated,loading,setLoading}= useContext(Context);
  const handleShowClick = () => setShowPassword(!showPassword);
    const router = useRouter();
  const submitHandler=async(e)=>{
    e.preventDefault();
    setLoading(true)
    try {
      const {data}=await axios.post('https://nodejs-todo-w0m2.onrender.com/api/v1/users/new',{
      name,email,password 
    },{
      headers:{
        "Content-Type":"application/json",
      },
      withCredentials:true,
    })
    toast.success(data.message);
    setIsAuthenticated(true); 
    setLoading(false)
    } catch (error) {
      toast.error("Please try again");
      setIsAuthenticated(false); 
      setLoading(false)
      console.log(error); 
    }
    };
    if(isAuthenticated)router.push('/');
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
                  pointerEvents="none"
                  children={<CFaUserAlt color="gray.300" />}
                />
                <Input type="text" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)} required/>
              </InputGroup>
            </FormControl>

              <FormControl>
                <InputGroup>
                  <InputLeftElement
                  color="gray.300"
                    pointerEvents="none"
                    children={<FaEnvelope color="gray.300" />}
                  />
                  <Input type="email" placeholder="email address" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
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
                    value={password} onChange={(e)=>setPassword(e.target.value)}
                    required
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                <Link href='/login'>Already signed-up Login now</Link>
                </FormHelperText>
              </FormControl>
              <Button
               isLoading={loading}
                loadingText="Signing up"
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Sign Up
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default register