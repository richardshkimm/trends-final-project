import React from "react";
import { Map } from "pigeon-maps";
import styles from '../styles/addSmellList.module.css';

export default function AddSmellList() {


  const [smell1, smellRating] = ["some smell", "this should be a rating"]
  return (
    <div className={styles.box}>
            <h1 className={styles.header}>Smells Near You</h1>

            <div className='map'>
            <Map height={400} defaultCenter={[42.44, -76.48]} defaultZoom={18} maxZoom={20}> </Map>
            </div>
            
            <div className={styles.list}>
              <p> 1. {smell1} || {smellRating} </p>
              <p> 2. "Title of Smell" || </p>
              <p> 3. "Title of Smell" || </p>
              <p> 4. "Title of Smell" || </p>
              <p> 5. "Title of Smell" || </p>
            </div>



        </div>
  )

}