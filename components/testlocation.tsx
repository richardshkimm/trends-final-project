import React, { useState, useEffect, useRef } from "react"
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