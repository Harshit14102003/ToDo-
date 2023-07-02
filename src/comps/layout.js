import Nav from "./header";
import {createContext,useState} from 'react'
import {
    Box,
  } from "@chakra-ui/react";

const Layout = ({ children }) => {
    
return(
    <> 
    
        <Nav/>
        <Box mt="5rem">{children}</Box>
        
    </>
)
}
export default Layout;