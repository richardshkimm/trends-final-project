import { Button, TextField, Typography, FormGroup, FormControlLabel, Switch } from '@mui/material';
import React, { useState } from "react"
import styles from '../styles/addsmell.module.css'
import {Rating, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { borders } from '@mui/system';
import { Map, Marker, Overlay } from "pigeon-maps"
import CancelIcon from '@mui/icons-material/Cancel';


type Props = {
    readonly lat: number;
    readonly lng: number;
    readonly setOverlayLatLng: (overlayLatLng: [number, number]) => void;
    readonly setAddingSmell: (addingSmell: boolean) => void;
    readonly overlayLatLng: [number, number];
  };

export default function AddSmellCanvas({ lat, lng, setOverlayLatLng, setAddingSmell, overlayLatLng }: Props) {

    function getLabelText(value: number) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
      }

    const labels: { [index: string]: string } = {
    0.5: 'Death',
    1: 'Grotesque',
    1.5: 'Gross',
    2: 'Stinky',
    2.5: 'Tolerable',
    3: 'Decent',
    3.5: 'Nice',
    4: 'Fragrant',
    4.5: 'Amazing',
    5: 'Heavenly',
    };

    const [value, setValue] = React.useState<number | null>(2);
    const [hover, setHover] = React.useState(-1);

    const [smell, setSmell] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSmell(event.target.value as string);
    };

    return (
        <div className={styles.box}>
            <Box
                        sx={{
                        border: 1,
                        maxWidth: "150vw",
                        maxHeight: "110vh",
                        backgroundColor: 'lightblue',
                        borderRadius: '8%',
                        }}>
                            
                <div className={styles.smellCancelIcon}>
                    <CancelIcon style={{color: "red"}} onClick={()=> {setAddingSmell(false); setOverlayLatLng([0,0])}}/>
                </div>        
            
                <h1 className={styles.header}>Add a Smell!</h1>
                <div className={styles.map}>
                    <Map height="30vh" defaultCenter={[overlayLatLng[0], overlayLatLng[1]]} defaultZoom={15} minZoom={15} maxZoom={15} mouseEvents={false} touchEvents={false}> 
                        <Marker width={60} anchor={[overlayLatLng[0], overlayLatLng[1]]} payload={1} onClick={({ event, anchor, payload }) => console.log(anchor, payload)} />
                    </Map>
                </div>

                <TextField 
                className={styles.title} 
                id="outlined-basic" 
                label="Title of Smell" 
                variant="outlined"
                />

                <div className={styles.rating}>
                <Typography component="legend"></Typography>
                    <Rating
                        name="hover-feedback"
                        value={value}
                        precision={0.5}
                        getLabelText={getLabelText}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                            setHover(newHover);
                        }}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                        {value !== null && (
                        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                        )}
                </div>

                <div className={styles.switch}>
                <FormGroup>
                    <FormControlLabel control={<Switch defaultChecked />} label="Allergy" />
                </FormGroup>
                </div>

                <div className={styles.textbox}>
                <TextField className='text-box-info'
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    defaultValue=""
                />
                </div>

                <div className={styles.submit}>
                <Button variant="contained">Submit</Button>
                </div>
            </Box>

        </div>
    );
  }