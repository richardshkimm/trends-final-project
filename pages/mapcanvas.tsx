import React, { useState } from "react"
import { Map, Marker, Overlay } from "pigeon-maps"

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
                <Overlay anchor={[overlayLatLng[0], overlayLatLng[1]]} offset={[120, 79]}>
                    <img src='https://www.engineering.cornell.edu/sites/default/files/content/faculty/image/david-gries-NEW.jpg' width={240} height={158} alt='' />
                </Overlay>)
    }
}

    return (
        <div>
            <Map height="99.7vh" defaultCenter={[42.444, -76.48]} defaultZoom={15} maxZoom={19} onClick={({event, latLng, pixel}) => setOverlayLatLng([latLng[0],latLng[1]])}>
               {overlayDisplay(overlayLatLng)}
            </Map>
        </div>
    );
}