import axios from 'axios';
import { Inter } from 'next/font/google'
import ToDoItem from '@/comps/ToDoItem';
import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
} from '@chakra-ui/react';
import {
  MdAccountCircle,
  MdEmail,
  MdFacebook,
  MdOutlineEmail,
} from 'react-icons/md';
import { BsGithub, BsDiscord, BsPerson } from 'react-icons/bs';
import { useContext,useEffect,useState } from 'react';
import { Context } from './_app';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {user,isAuthenticated}= useContext(Context)
  const [description,setDescription]=useState("");
  const router = useRouter();
  const [title,setTitle]=useState("");
  const [loading,setLoading]=useState(false);
  const [tasks,setTasks]=useState([])
  const [refresh,setRefresh]=useState(false);
  const updateHandler=async(id)=>{
    try {
     const {data}= await axios.put(`https://nodejs-todo-w0m2.onrender.com/api/v1/tasks/${id}`,{},{withCredentials:true}
      )
      toast.success(data.message)
      setRefresh((prev)=>(!prev))
    } catch (error) {
      toast.error(error.response.data.message);
    }

  }
  const deleteHandler=async(id)=>{
    try {
      const {data}= await axios.delete(`https://nodejs-todo-w0m2.onrender.com/api/v1/tasks/${id}`, {withCredentials:true}
       )
       setRefresh((prev)=>(!prev))
       toast.success(data.message)
     } catch (error) {
       toast.error(error.response.data.message);
     }
  }
  const submitHandler=async(e)=>{
    e.preventDefault();
try {
  setLoading(true);
  const {data}=await axios.post("https://nodejs-todo-w0m2.onrender.com/api/v1/tasks/new",{
    title,description
  },{
    withCredentials:true,
    headers:{
      "Content-Type":"application/json"
    }
  })
  setTitle("")
  setDescription("")
  toast.success(data.message)
setRefresh((prev)=>(!prev))
  setLoading(false);
} catch (error) {
  toast.error(err.response.data.message);
  setLoading(false);
}
  }
  useEffect(()=>{
axios.get("https://nodejs-todo-w0m2.onrender.com/api/v1/tasks/my",{
  withCredentials:true,
}).then(res=>{
   setTasks (res.data.tasks);
}).catch((e)=>{
 toast.error(e.response.data.message)
})
  },[refresh])
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, []);
  return(
    <>
      <Flex
      flexDirection="column"
      width="100wh"
      height="89vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
      alignContent={"center"}
    >
<Container  maxW="full" mt={0} centerContent overflow="hidden" >
      <Flex>
        <Box
          bg="#02054B"
          color="white"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}>
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>
                <Box>
                  <Heading>Post Your Task</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                    Share your daily tasks
                  </Text>
                  <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                    <VStack pl={0} spacing={3} alignItems="flex-start">
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        color="#DCE2FF"
                        textTransform={'capitalize'}
                        _hover={{ border: '2px solid #1C6FEB' }}
                        leftIcon={<MdAccountCircle color="#1970F1" size="20px" />}>
                        {user.name?user.name:'Login first'}
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        color="#DCE2FF"
                        _hover={{ border: '2px solid #1C6FEB' }}
                        leftIcon={<MdEmail color="#1970F1" size="20px" />}>
                        {user.email?user.email:"Your email"}
                      </Button>
                    </VStack>
                  </Box>
                  <HStack
                    mt={{ lg: 10, md: 10 }}
                    spacing={5}
                    px={5}
                    alignItems="flex-start">
                    <IconButton
                      aria-label="facebook"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: '#0D74FF' }}
                      icon={<MdFacebook size="28px" color='white'/>}
                    />
                    <IconButton
                      aria-label="github"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: '#0D74FF' }}
                      icon={<BsGithub size="28px" color='white'/>}
                    />
                    <IconButton
                      aria-label="discord"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: '#0D74FF' }}
                      icon={<BsDiscord size="28px" color='white'/>}
                    />
                  </HStack>
                </Box>
              </WrapItem>
              <WrapItem>
                <Box bg="white" borderRadius="lg">
                  <Box m={8} color="#0B0E3F">
                    <VStack spacing={5}>
                    
                      <FormControl id="name" >
                        <FormLabel>Title</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement
                            pointerEvents="none"
                          />
                          <Input type="text" size="md" onChange={(e)=>setTitle(e.target.value)} value={title}/>
                        </InputGroup>
                      </FormControl>
                      
                      <FormControl id="name">
                        <FormLabel>Description</FormLabel>
                        <Textarea
                        value={description} 
                        onChange={(e)=>setDescription(e.target.value)}
                          borderColor="gray.300"
                          _hover={{
                            borderRadius: 'gray.300',
                          }}
                        />
                      </FormControl>
                      <FormControl id="name" float="right">
                        <Button
                        isLoading={loading}
                        onClick={submitHandler}
                        loadingText={"Posting"}
                          variant="solid"
                          bg="#0D74FF"
                          color="white"
                          _hover={{}}>
                          Post task
                        </Button>
                      </FormControl>
                      
                    </VStack>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Flex>
    </Container>
    </Flex>
    <VStack width={'100vw'} align={'center'} justify={'center'} bg={'gray.200'}>
    <Heading>My Tasks</Heading>
<Flex width={'65vw'} justify={'center'} p={'2rem'} direction={'column'} >
     {
      tasks.map((i)=>(
        <Box p={{base:'0.5rem',lg:'1rem'}}>
        <ToDoItem title={i.title} description={i.description} isCompleted={i.isCompleted} updateHandler={updateHandler} deleteHandler={deleteHandler} id={i._id} key={i._id}/>
        </Box>
      ))
     }
     </Flex>
     </VStack>
    </>
  )
}
