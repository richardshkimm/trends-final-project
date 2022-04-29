import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

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
      

    </div>
  )
}

export default Home
