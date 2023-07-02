import { Card, CardBody, Stack, StackDivider, Text,Box,Heading, VStack, HStack, Button, Checkbox } from '@chakra-ui/react'
import React from 'react'

const ToDoItem = ({title,description,isCompleted,updateHandler,deleteHandler,id}) => {
  return (
    <>
        <Card>
  <CardBody>
  <Stack divider={<StackDivider />} spacing='4'>
  <HStack justifyContent={'space-around'}>
      <VStack justifyItems={'flex-start'}>
        <Heading size='xs' textTransform='uppercase'>
          {title}
        </Heading>
        <Text pt='2' fontSize='sm'>
          {description}
        </Text>
        
      </VStack>
      <HStack spacing={{base:'0.5rem',lg:'2rem'}}>
      <Checkbox colorScheme='green' isChecked={isCompleted} onChange={()=>updateHandler(id)} key={id}></Checkbox>
      <Button colorScheme='teal' onClick={()=>deleteHandler(id)}>Delete</Button>
      </HStack>
      </HStack>
      </Stack>
  </CardBody>
</Card>
    </>
  )
}

export default ToDoItem;
