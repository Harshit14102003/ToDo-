import React, { useContext ,useEffect} from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineHome } from 'react-icons/ai';
import axios from "axios";
import { toast } from "react-hot-toast";
import { Context } from "@/pages/_app";
import { useRouter } from "next/router";
export default function Nav() {
  const {isAuthenticated,setIsAuthenticated,loading,setLoading}= useContext(Context);
  const router=useRouter();
  const logoutHandler=async()=>{
    setLoading(true);
    try {
      const {data}=await axios.get('https://nodejs-todo-w0m2.onrender.com/api/v1/users/logout',{
      withCredentials:true,
    })
    toast.success("Logged out successfully");
    setIsAuthenticated(false); 
    setLoading(false);
    } catch (error) {
      toast.error("some server error");
      console.log(error); 
      setIsAuthenticated(true); 
      setLoading(false);
    }
    };
    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/login');
      }
    }, []);
  return (
    <Flex
      position={"fixed"}
      top={0}
      zIndex={100}
      h="fit-content"
      direction="row"
      alignContent={"center"}
      w={"100%"}
      overflowX={"clip"}
      color={"white"}
    >
      <Flex
        h="5rem"
        w="100%"
        color="white"
        backgroundColor="#02054B"
        display={"flex"}
      >
        <HStack
          fontSize={"1.1rem"}
          fontWeight={"400"}
          justifyContent={"space-between"}
          w={"100%"}
        >
        <HStack ml={{base:'0.5rem',lg:'2rem'}} w={{base:'30%',lg:'10%'}} justifyContent={'space-between'}>
          <Link href="/">
          <Box bg={'purple.600'} color={'white'} borderRadius={'10%'} boxSize={'2.6rem'} alignContent={'center'}  display="flex" justifyContent="center"
  alignItems="center" _hover={{boxShadow: '0px 0px 35px 4px rgba(99, 64, 201, 0.74)'}}>
            <AiOutlineHome size={'1.6rem'}/>
            </Box>
          </Link>
          <Link href="/">
            <Text _hover={{ borderTop: "1px", transitionDuration: "0.1s" }}>
              Home
            </Text>
          </Link>
          </HStack>
          <HStack  mr={{base:'0.5rem',lg:'2rem'}} w={{base:'50%',lg:'20%'}} justify={'flex-end'} justifyContent={'space-between'}>
          <Link href="/profile">
            <Text _hover={{ borderTop: "1px", transitionDuration: "0.1s" }}>
              Profile
            </Text>
          </Link>
          <Flex
            w={"11rem"}
            borderRadius={"2rem"}
            justify={"center"}
            bgColor={"purple.600"}
            color={"white"}
            h={"3rem"}
            _hover={{boxShadow: '0px 0px 35px 4px rgba(99, 64, 201, 0.74)'}}
          > 
          {
            isAuthenticated?(<Flex justify={'center'} alignItems={'center'} onClick={logoutHandler}><Link href='/'><Button bg={"transparent"} _hover={{backgroundColor:'transparent'}} color={'white'} isLoading={loading} loadingText="Logging out">Logout</Button></Link></Flex>)
            : 
             ( <HStack justify={"center"} align={"center"}>
            <Link href="/register">
              <Text
                _hover={{
                  cursor: "pointer",
                  borderTop: "1px",
                  transitionDuration: "0.1s",
                }}
              >
                Signup
              </Text>
              </Link>
              <Text>|</Text>
              <Link href="/login">
              <Text _hover={{
                  cursor: "pointer",
                  borderTop: "1px",
                  transitionDuration: "0.1s",
                }}>Login</Text></Link>
            </HStack>
         ) }
          </Flex>
          </HStack>
        </HStack>
      </Flex>
     
      
    </Flex>
  );
}
