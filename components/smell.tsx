import { Button, TextField, Typography, FormGroup, FormControlLabel, Switch } from '@mui/material';
import React, { useState } from "react"
import styles from '../styles/addsmellcanvas.module.css'
import {Rating, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { Map, Marker, Overlay } from "pigeon-maps"
import CancelIcon from '@mui/icons-material/Cancel';


export default function AddSmellCanvas() {

    function getLabelText(value: number) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
      }

    const labels: { [index: string]: string } = {
    0.5: 'Death',
    1: 'Grotesque',
    1.5: 'Gross',
    2: 'Smelly',
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

    return (
        <div className={styles.box}>
            <h1 className={styles.header}>Add a Smell!</h1>
            <div className='map'>
            <Map height="40vh" defaultCenter={[42.444, -76.48]} defaultZoom={15} maxZoom={19} onClick={({event, latLng, pixel}) => setOverlayLatLng([latLng[0],latLng[1]])}>
               {overlayDisplay(overlayLatLng)}
               
            </Map>
            </div>

            <TextField className={styles.title} id="outlined-basic" label="Title of Smell" variant="outlined" />

            <div className={styles.category}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Smell Category</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={smell}
                label="smell-category"
                onChange={handleChange}
            >
                <MenuItem>Good</MenuItem>
                <MenuItem>Mid</MenuItem>
                <MenuItem>Bad</MenuItem>
            </Select>
            </FormControl>
            </div>

            <div className={styles.rating}>
            <Typography component="legend">Smell Rating</Typography>
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
        </div>
    );
  }