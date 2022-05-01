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
      <br></br>
      <br></br>
      <br></br>
      <div id={styles.shadowbox}>
        <h1 className={styles.rainbow}> 
        <p>Application UI is currently being implemented in separate "canvases" to improve modularity and reduce merge conflicts</p>
          <p>Therefore, elements may be sporadically spread throughout site, with the furthest along page being the "map canvas"</p>
          They're all linked here on the index.tsx home page though will be migrated here together later as api calls necessitate their usage
        </h1>
      </div>

    </div>
    
  )
}

export default Home
