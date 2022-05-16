import React, { useState, useEffect} from "react"
import { Point, Map, Marker, Overlay } from "pigeon-maps"
import CancelIcon from '@mui/icons-material/Cancel';
import Box from '@mui/material/Box'
import Smell from '../components/smell';
import styles from '../styles/bigmap.module.css'
import Button from '@mui/material/Button';
import { collection, getDocs, updateDoc ,addDoc, doc, query } from "@firebase/firestore";
import { db } from "../util/firebase";
import Cluster from 'pigeon-cluster';

export default function MapCanvas() {

    const [locationStat, setLocationStat] = useState<String>("Uninitialized");
    const [userLat, setUserLat] = useState<number>(42.444);
    const [userLong, setUserLong] = useState<number>(-76.48);  
    const [overlayLatLng, setOverlayLatLng]= useState<[number, number]>([0,0])
    const [addingSmell, setAddingSmell]= useState<boolean>(false)
    const [mapBounds, setMapBounds] = useState<Array<[number, number]>>([[0,0],[0,0]])
    
    const [mapCenter, setMapCenter] = useState([42.444, -76.48])

    const [allLocations, setAllLocations] = useState<Array<[number, number]>>([])

    const fetchLocations = () => {
        const smellCollectionRef = collection(db, 'smells');
        const smellQuery = query(smellCollectionRef)
        getDocs(smellQuery).then((snapshot) => {
        const smellData = snapshot.docs.map(
        (doc) => ({ ...doc.data() })
        )
        const smellLocations = smellData.map(smell => smell.location)
        setAllLocations(smellLocations);
        
        })
    }

    function locationThing(){
        console.log(allLocations.map(location => <Marker key={location.toString()} anchor={location} payload={1}/>))
    }

    useEffect(() => {
        // This will fire only on mount. 
        fetchLocations();
        locationThing();
        }, [])

    const getLocation = () => {
        if (!navigator.geolocation){
            setLocationStat("Retrieving your Location is not supported by your browser")
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
      

    useEffect(() => { // updates location every ~5 seconds -- check with console.log(userLat, userLong, Date.now());
        const updateLocation = (setInterval(() => {
            getLocation();
            }, 5000));
            return () => clearInterval(updateLocation);}, [])

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
                <Map height="99.6vh" center={[userLat,userLong]} defaultZoom={18} minZoom={18} maxZoom={18} mouseEvents={false}>        
                        <Smell lat={overlayLatLng[0]} lng={overlayLatLng[1]} setOverlayLatLng={setOverlayLatLng} setAddingSmell={setAddingSmell}/>
                </Map> 
            </div>
            )
        }

        else if (addingSmell === false){
            return (
                <div>
        
                    <Map height="99.6vh" center={[userLat,userLong]} defaultZoom={18} minZoom={16} maxZoom={18} onClick={({event, latLng, pixel}) => {setOverlayLatLng([latLng[0],latLng[1]])}} onBoundsChanged={({ bounds }) => {{setMapBounds([bounds.sw,bounds.ne])}}} >
                        
                            <h1 id={styles.aromap}>aroMap</h1>
                        
                        <Overlay anchor={[userLat, userLong]} offset={[12, 100]}>
                            <div className={styles.location_container}>
                                <div className={styles.ring}></div>
                                <div className={styles.circle}></div>
                            </div>
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