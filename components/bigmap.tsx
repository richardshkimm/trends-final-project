import React, { useState, useEffect} from "react"
import { Map, Marker, Overlay } from "pigeon-maps"
import CancelIcon from '@mui/icons-material/Cancel';
import Box from '@mui/material/Box'
import Smell from '../components/smell';
import styles from '../styles/bigmap.module.css'
import Button from '@mui/material/Button';

export default function MapCanvas() {

    const [locationStat, setLocationStat] = useState<String>("Uninitialized");
    const [userLat, setUserLat] = useState<number>(42.444);
    const [userLong, setUserLong] = useState<number>(-76.48);  
    
    const [mapCenter, setMapCenter] = useState([42.444, -76.48])

    const getLocation = () => {
        if (!navigator.geolocation){
            setLocationStat("Retrieving your Location is not supported by your broswer")
        }
        const success = (pos : GeolocationPosition) => {
            setLocationStat("");
            setUserLong(pos.coords.longitude);
            setUserLat(pos.coords.latitude);
            setMapCenter([pos.coords.latitude, pos.coords.longitude]);
        }

        const error = (error: GeolocationPositionError) => {
            setLocationStat("Location unretrievable")
        }
        navigator.geolocation.getCurrentPosition(success, error);
    }

    useEffect(() => {
        // This will fire only on mount.
        getLocation();
      }, [])

    const [overlayLatLng, setOverlayLatLng]= useState<[number, number]>([0,0])
    const [addingSmell, setAddingSmell]= useState<boolean>(false)
    
    function mobileOverlayDisplay(overlayLatLng: [number, number]) {
        if (locationStat !== "" && overlayLatLng[0] !== 0 && overlayLatLng[1] !== 0){
            return (
                <Overlay anchor={[overlayLatLng[0], overlayLatLng[1]]} offset={[45, 90]}>
                    <Box
                        sx={{
                        width: 90,
                        height: 110,
                        backgroundColor: 'gray',
                        borderRadius: '30%',
                        }}>
                            <div className={styles.overlayBox}>
                                <h5>Please enable location to make a submission</h5>
                            </div>  
                    </Box>
                </Overlay>
            )
        }
        if (overlayLatLng === [0,0]){
            return(<Overlay anchor={[overlayLatLng[0], overlayLatLng[1]]} offset={[0,0]}>
                <div></div>
            </Overlay>);
        }
        else if (overlayLatLng[0] !== 0 && overlayLatLng[1] !== 0){
            return(
                <Overlay anchor={[overlayLatLng[0], overlayLatLng[1]]} offset={[75, 100]}>
                    <Box
                        sx={{
                        width: 150,
                        height: 200,
                        backgroundColor: 'gray',
                        borderRadius: '30%',
                        }}>
                            <div className={styles.overlayCancelIcon}>
                                <CancelIcon style={{color: "red"}} onClick={()=> setOverlayLatLng([0,0])}/>
                            </div>
                            <div className={styles.overlayBox}>
                                <h5>Submit a smell at {overlayLatLng}?</h5>
                                <Button variant="contained" onClick={()=> setAddingSmell(true)}>Add Smell</Button>
                            </div>  
                    </Box>
                </Overlay>)
    }
}

    function overlayHandler(){
        if (addingSmell === true){
            return(
            <div>
                <Map height="99.6vh" center={[userLat,userLong]} defaultZoom={15} minZoom={15} maxZoom={15}>
                        <h1>{userLat},{userLong}</h1>
                        
                        
                        <Smell lat={overlayLatLng[0]} lng={overlayLatLng[1]} setOverlayLatLng={setOverlayLatLng} setAddingSmell={setAddingSmell}/>
                    
                </Map>
            </div>
            )
        }

        else if (addingSmell === false){
            return (
                <div>
                    <Map height="99.7vh" center={[userLat,userLong]} defaultZoom={15} minZoom={15} maxZoom={15} onClick={({event, latLng, pixel}) => setOverlayLatLng([latLng[0],latLng[1]])}>
                    <h1>{userLat},{userLong}</h1>
                    <Overlay anchor={[userLat, userLong]} offset={[25, 25]}>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Location_dot_blue.svg/1024px-Location_dot_blue.svg.png' width={50} height={50} alt='location indicator' />
                </Overlay>
                    {mobileOverlayDisplay(overlayLatLng)}
                        
                    </Map>
                </div>
            )
        }
    }

//offset should be half the height and width of the size of the overlay element (both positive)
    return (
        <div>
            {overlayHandler()}
        </div>
    );
}