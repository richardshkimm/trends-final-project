import React from "react";
import { Map } from "pigeon-maps";
import styles from '../styles/addSmellList.module.css';
import Link from 'next/link';
import { getDocs, updateDoc ,addDoc, doc, collection, query } from "firebase/firestore"
import { db } from "../util/firebase";

export default function AddSmellList() {

  return (
    <div className={styles.box}>
            <h1 className={styles.header}>Smells Near You</h1>

            <div className='map'>
            <Map height={400} defaultCenter={[42.44, -76.48]} defaultZoom={15} minZoom={15} maxZoom={15}> </Map>
            </div>
            
            <div className={styles.list}>
            <Link href="eachSmell">
            <a> 1. {"smell"} || {"smellRating"} </a>
            </Link>  {/* Make this into a pop up and also add onHover effect */}
              <p> 2. "Title of Smell" || </p>
              <p> 3. "Title of Smell" || </p>
              <p> 4. "Title of Smell" || </p>
              <p> 5. "Title of Smell" || </p>
            </div>



        </div>
  )

}