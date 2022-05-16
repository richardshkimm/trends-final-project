import React, { useState, useEffect} from "react"
import { Point, Map, Marker, Overlay } from "pigeon-maps"
import CancelIcon from '@mui/icons-material/Cancel';
import Box from '@mui/material/Box'
import Smell from '../components/smell';
import styles from '../styles/bigmap.module.css'
import Button from '@mui/material/Button';
import { collection, getDocs, updateDoc ,addDoc, doc, deleteDoc, query } from "@firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {useAuthState} from "react-firebase-hooks/auth";
import {firebaseConfig, db, app} from '../util/firebase';

export default function MapCanvas() {

    firebase.initializeApp(firebaseConfig);

    const auth = firebase.auth()
    const [user] = useAuthState(auth as any)

    const [locationStat, setLocationStat] = useState<String>("Uninitialized");
    const [userLat, setUserLat] = useState<number>(42.444);
    const [userLong, setUserLong] = useState<number>(-76.48);  
    const [overlayLatLng, setOverlayLatLng]= useState<[number, number]>([0,0])
    const [addingSmell, setAddingSmell]= useState<boolean>(false)
    const [mapBounds, setMapBounds] = useState<Array<[number, number]>>([[0,0],[0,0]])
    
    const [mapCenter, setMapCenter] = useState([42.444, -76.48])

    const [allLocations, setAllLocations] = useState<Array<[number, number]>>([])

    const [dbSmellData, setDbSmellData] = useState<{[x: string]: any; }[]>([]);
   

    const fetchLocations = () => {
        const smellCollectionRef = collection(db, 'smells');
        const smellQuery = query(smellCollectionRef)
        getDocs(smellQuery).then((snapshot) => {
        const smellData = snapshot.docs.map(
        (doc) => ({ ...doc.data() })
        )
        setDbSmellData(smellData)
        const smellLocations = smellData.map(smell => smell.location)
        const newSmellLocations = []
        smellLocations.forEach(location => newSmellLocations.push([location[0].lat, location[1].lng]))
        setAllLocations(newSmellLocations);
        
        })
    }

    const [viewedMarker, setViewedMarker] = useState<[number, number]>([0,0])

    function getMarkerInfo() {
        let markerTitle = ""
        let markerDescription = ""
        let markerRating = 2.5;
        let markerAllergy = false;
        //console.log(dbSmellData[0])
        if (viewedMarker === [0,0]){
            return;}
        else if (viewedMarker !== [0]) {
            for (const smell of dbSmellData) {
                if (smell.location[0].lat === viewedMarker[0] && smell.location[1].lng === viewedMarker[1]) {
                    markerTitle= smell.title.smellTitle
                    markerDescription = smell.desc.description
                    markerRating = smell.rating.value
                    markerAllergy = smell.allergy.allergy
                }
            }
    
            return (
                <Overlay anchor={[viewedMarker[0],viewedMarker[1]]} offset={[75, 100]}>
                <Box
                    sx={{
                    width: 150,
                    height: 200,
                    backgroundColor: 'gray',
                    borderRadius: '30%',
                    }}>
                    <div className={styles.overlayBox}>
                            <div className={styles.overlayCancelIcon}>
                                <CancelIcon style={{color: "red"}} onClick={()=> setViewedMarker([0,0])}/>
                            </div>
                        <h6>You clicked smell at {viewedMarker} title: {markerTitle} description: {markerDescription} rating : {markerRating} allergy : {markerAllergy}</h6>
                    </div>      
                </Box>
            </Overlay>
            )
        }
    }

    function displayAllMarkers(){
        return(allLocations.map(location => <Marker key={location.toString()} anchor={location} payload={1} onClick={() => setViewedMarker(location)}/>))
    }

    useEffect(() => {
        // This will fire only on mount. 
        fetchLocations();
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

/*
    function deleteStale(){
        for (const smell of dbSmellData) {
            const smellCollectionRef = collection(db, 'smells');
            if (smell.time_upload < Date.now() - (1000 * 60 * 60)) {
                deleteDoc(doc(db, {smellCollectionRef}, {smell.location}));
            };
                }
            }
        
    useEffect(() => {
        // This will fire only on mount. 
        deleteStale();
        }, [])

    useEffect(() => { // deletes stale smells every ~60 seconds 
        const deleteStaleSmells = (setInterval(() => {
            deleteStale();
            }, 60000));
            return () => clearInterval(deleteStaleSmells);}, [])
*/

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
                <div style = {{height:"99.6vh"}}>
                
                <Map center={[userLat,userLong]} defaultZoom={18} minZoom={18} maxZoom={18} mouseEvents={false}>        
                        <Smell lat={overlayLatLng[0]} lng={overlayLatLng[1]} setOverlayLatLng={setOverlayLatLng} setAddingSmell={setAddingSmell} fetchLocations={fetchLocations}/>
                </Map> 
            </div>
            )
        }

        else if (addingSmell === false){
            return (
                <div style = {{height:"99.6vh"}}>
        
                    <Map center={[userLat,userLong]} defaultZoom={18} minZoom={16} maxZoom={18} onClick={({event, latLng, pixel}) => {setOverlayLatLng([latLng[0],latLng[1]])}} onBoundsChanged={({ bounds }) => {{setMapBounds([bounds.sw,bounds.ne])}}} >
                    {displayAllMarkers()}
                    {getMarkerInfo()}
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

    function signInHandler(){
        const signInWithGoogle = () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithPopup(provider);
        }
        return(
            <Button onClick={signInWithGoogle}>Sign in with Google</Button>
        )
    }

    function overallHandler(){
        if (user === null){
            return (signInHandler())
        }
        else if (user !== null){
            return (overlayHandler())
        }
    }
    

//offset should be half the height and width of the size of the overlay element (both positive)
    return (
        <div>
            {overallHandler()}
        </div>
    );
}
