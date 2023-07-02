import '@/styles/globals.css'
import React, { createContext, useEffect, useState } from 'react'

import Layout from '../comps/layout';
import { ChakraProvider } from '@chakra-ui/react'
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';
import NextNProgress from "nextjs-progressbar";
import axios from 'axios';
import {  useRouter } from 'next/router';
export const Context=createContext({isAuthenticated:false,loading:false,user:{}});
export default function App({ Component, pageProps }) {
  const [isAuthenticated,setIsAuthenticated]=useState(false)
    const [loading,setLoading]=useState(false)
    const [user,setUser]=useState({})
    const router=useRouter();
    useEffect(()=>{
axios.get("https://nodejs-todo-w0m2.onrender.com/api/v1/users/me",{
  withCredentials:true,
}).then(res=>{
  setUser(res.data.user)
  setIsAuthenticated(true);
}).catch((error)=>{
  setUser({})
  setIsAuthenticated(false);
})
    },[router.asPath])
  return (
    <>
    <Head>
      <title>Todo</title>
    </Head>
    <Context.Provider value={{isAuthenticated,setIsAuthenticated,loading,setLoading,user,setUser}}>
    <ChakraProvider>
    <Layout>
      <NextNProgress options={{showSpinner:false}}/>  
      <Toaster position='top-center'/>
      <Component {...pageProps} /> 
      </Layout>
    </ChakraProvider>
    </Context.Provider>
    </>
  )
}
