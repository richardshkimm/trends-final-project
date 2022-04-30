import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Box from '@mui/material/Box'
import * as React from 'react';
import Button from '@mui/material/Button';


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
      <br></br>
      <br></br>
      <br></br>
      <Link href="mapcanvas">
        <a>mapcanvas</a> 
      </Link>  
      <br></br>
      <br></br>
      <br></br>
      <Link href="individualsmellcanvas">
        <a>individualsmellcanvas</a> 
      </Link>  

            <div className={styles.box}>
              <Box
                  sx={{
                  width: "70vw",
                  height: "70vh",
                  backgroundColor: 'gray',
                  borderRadius: '5%',
                  }}>

                      <div className={styles.button}><Button variant="contained">Button 1</Button></div>
                      
                      <div className={styles.button}><Button variant="contained">Button 2</Button></div>
              
                      <div className={styles.button}><Button variant="contained">Button 3</Button></div>
                
                </Box>
            </div>

    </div>
    
  )
}

export default Home
