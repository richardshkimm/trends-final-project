import React, { useState } from "react"
import { Map, Marker, Overlay } from "pigeon-maps"
import CancelIcon from '@mui/icons-material/Cancel';
import Box from '@mui/material/Box'
import Smell from '../components/smell';
import styles from '../styles/bigmap.module.css'
import Button from '@mui/material/Button';

export default function MapCanvas() {


    const [overlayLatLng, setOverlayLatLng]= useState<[number, number]>([0,0])
    const [addingSmell, setAddingSmell]= useState<boolean>(false)
    
    function mobileOverlayDisplay(overlayLatLng: [number, number]) {
        if (overlayLatLng === [0,0]){
            return(<Overlay anchor={[overlayLatLng[0], overlayLatLng[1]]} offset={[0,0]}>
                <div></div>
            </Overlay>);
        }
        else if (overlayLatLng[0] !== 0 && overlayLatLng[1] !== 0){
            return(
                <Overlay anchor={[overlayLatLng[0], overlayLatLng[1]]} offset={[75, 75]}>
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
                                <h6>submit a smell at {overlayLatLng}?</h6>
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
                <Map height="99.6vh" defaultCenter={[42.444, -76.48]} defaultZoom={15} minZoom={15} maxZoom={15} onClick={({event, latLng, pixel}) => {setOverlayLatLng([latLng[0],latLng[1]])}}>
                    
                        <div className={styles.smellCancelIcon}>
                                <CancelIcon style={{color: "red"}} onClick={()=> {setAddingSmell(false); setOverlayLatLng([0,0])}}/>
                        </div>
                        <Smell/>
                    
                </Map>
            </div>
            )
        }

        else if (addingSmell === false){
            return (
                <div>
                    <Map height="99.6vh" defaultCenter={[42.444, -76.48]} defaultZoom={15} minZoom={15} maxZoom={15} onClick={({event, latLng, pixel}) => {setOverlayLatLng([latLng[0],latLng[1]]); console.log(event, latLng, pixel)}}>
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