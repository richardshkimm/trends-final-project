import React, { useState, useEffect } from "react"
import { Map, Marker, Overlay } from "pigeon-maps"
import CancelIcon from '@mui/icons-material/Cancel';
import Box from '@mui/material/Box'
import Smell from '../components/smell';
import styles from '../styles/bigmap.module.css'
import Button from '@mui/material/Button';

export default function MapCanvas() {

    const [stat, setStat] = useState<String>("");
    const [lat, setLat] = useState<number>(0);
    const [long, setLong] = useState<number>(0);    

    const getLocation = () => {
        if (!navigator.geolocation){
            setStat("Retrieving your Location is not supported by your broswer")
        }
        const success = (pos : GeolocationPosition) => {
            setStat("");
            setLong(pos.coords.longitude);
            setLat(pos.coords.latitude);
        }

        const error = (error: GeolocationPositionError) => {
            setStat("Location unretrievable")
        }
        navigator.geolocation.getCurrentPosition(success, error);
    }

    useEffect(() => {
        // This will fire only on mount.
        getLocation();
        
      }, [])

    const MINUTE_MS = 5000;

    useEffect(() => {
    const interval = setInterval(() => {
        console.log('Logs every minute');
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])


//offset should be half the height and width of the size of the overlay element (both positive)
    return (
            <div> 
              <button onClick={getLocation}>Get Location</button>
              <h1>Coordinates</h1>
              <p>{stat}</p>
              {lat && <p>Latitude: {lat}</p>}
              {long && <p>Longitude: {long}</p>}
            </div>
          );
}