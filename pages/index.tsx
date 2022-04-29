import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import * as React from 'react';
import Box from '@mui/material/Box';

const Home: NextPage = () => {
  return (
    <div>
      <Link href="addsmellcanvas">
        <a>addsmellcanvas</a>
      </Link>
      <br></br>
      <br></br>
      <br></br>
      <Link href="profilecanvas">
        <a>profilecanvas</a> 
      </Link>
      <br></br>
      <br></br>
      <br></br>
      <Link href="smelllistcanvas">
        <a>smelllistcanvas</a> 
      </Link>
      <div className='styles.box'>
      <Box
      sx={{
        width: "60%",
        height: 900,
        backgroundColor: 'primary.dark',
      }}
    />
      </div>
      
      


    </div>
  )
}

export default Home
