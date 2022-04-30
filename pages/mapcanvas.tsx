import React, { useState } from "react"
import { Map, Marker, Overlay } from "pigeon-maps"
import CancelIcon from '@mui/icons-material/Cancel';
import Box from '@mui/material/Box'

export default function MapCanvas() {
    const [hue, setHue] = useState(0)
    const color = `hsl(${hue % 360}deg 39% 70%)`

    const [overlayLatLng, setOverlayLatLng]= useState<[number, number]>([0,0])

  
    function overlayDisplay(overlayLatLng: [number, number]) {
        if (overlayLatLng === [0,0]){
            return(<Overlay anchor={[overlayLatLng[0], overlayLatLng[1]]} offset={[0,0]}></Overlay>);
        }
        else{
            return(
                <Overlay anchor={[overlayLatLng[0], overlayLatLng[1]]} offset={[75, 75]}>
                    <Box
                        sx={{
                        width: 150,
                        height: 150,
                        backgroundColor: 'gray',
                        borderRadius: '30%',
                        }}>
                            <h3>place a smell?</h3>
                            <CancelIcon color="primary"/>
                  
                  
                    </Box>
                    
                    
                </Overlay>)
    }
}

//offset should be half the height and width of the size of the overlay element (both positive)
    return (
        <div>
            <Map height="99.7vh" defaultCenter={[42.444, -76.48]} defaultZoom={15} maxZoom={19} onClick={({event, latLng, pixel}) => setOverlayLatLng([latLng[0],latLng[1]])}>
               {overlayDisplay(overlayLatLng)}
               
            </Map>
        </div>
    );
}