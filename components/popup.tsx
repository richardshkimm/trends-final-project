import * as React from 'react';
import Box from '@mui/material/Box';
import styles from "../styles/popup.module.css";


export default function Popup() {
    return (

            <div className={styles.box}>
            <Box
            sx={{
            width: "70vw",
            height: "70vh",
            backgroundColor: 'gray',
            borderRadius: '5%',
            }}
            />
            </div>
    );
}