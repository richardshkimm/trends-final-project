import { Button, TextField, Typography, FormGroup, FormControlLabel, Switch } from '@mui/material';
import React, { useState } from "react"
import styles from '../styles/addsmell.module.css'
import {Rating, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { borders } from '@mui/system';
import { Map, Marker, Overlay } from "pigeon-maps"
import CancelIcon from '@mui/icons-material/Cancel';
import { updateDoc ,addDoc, doc, collection } from "firebase/firestore"
import { db } from "../util/firebase";


type Props = {
    readonly lat: number;
    readonly lng: number;
    readonly setOverlayLatLng: (overlayLatLng: [number, number]) => void;
    readonly setAddingSmell: (addingSmell: boolean) => void;
  };

export default function AddSmellCanvas({ lat, lng, setOverlayLatLng, setAddingSmell }: Props) {

    
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


    const [hover, setHover] = useState(-1);
    const [smellTitle, setSmellTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState<number | null>(2.5);
    const [allergy, setAllergy]= useState<boolean>(false);
    const smellCollectionRef = collection(db, 'smells');


    const handleChange = (val: string) => {
        setSmellTitle(val);
    };

    const handleChangeDesc = (val: string) => {
        setDescription(val);
    };


    // type Smell = {sm: string, rate: number | null, desc: string,isAllergic: boolean, position: [number, number] }
    // var firebaseData = new Object(Smell);

    const clearInputs = () => {
        setSmellTitle('');
        setDescription('');
        setValue(2.5);
        setAllergy(false);
    }



    const d = new Date();
    const sendSmell = async () => {
            await addDoc(smellCollectionRef, { allergy: {allergy}, desc: {description}, location: [{lat}, {lng}], rating: {value}, 
                time_upload: 0, title: {smellTitle}, 
                upvote: {time_upvote: 0, user: {username: "user_1"}}  });
            clearInputs();
            setAddingSmell(false);
                //time_upload: d.getTime()
            // firebaseData.sm = smell;
            // let firebaseData : Smell =  {sm: smell, rate: value, isAllergic: allergy, desc: description, position: [lat, lng]}
            // let firebaseData = {smell, value, allergy, description, position}
        }

    

    // const docRef = doc(db, "users", "jason");
    // const updateSmellRef = collection(db, 'smells', {smell.name}); // fill in with the smell you're upvoting/selecting
    // const exDocRef = doc(db, 'smells', 'ex_smell');
    // await updateDoc(updateSmellRef, "smell_upvoted" , {upvote: {time_upvote: }});  

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
                    <Map height = "30vh" defaultCenter={[lat, lng]} defaultZoom={15} minZoom={15} maxZoom={15} mouseEvents={false} touchEvents={false}> 
                        <Marker width={60} anchor={[lat, lng]} payload={1} onClick={({ event, anchor, payload }) => console.log(anchor, payload)} />
                    </Map>
                </div>

                <TextField
                onChange={event => {handleChange(event.target.value)}}
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
                    <FormControlLabel onClick={()=> setAllergy(true)} control={<Switch defaultChecked />} label="Allergy" />
                </FormGroup>
                </div>

                <div className={styles.textbox}>
                <TextField className='text-box-info'
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    defaultValue=""
                    onChange={event => {event.preventDefault(); handleChangeDesc(event.target.value)}}
                />
                </div>

                <div className={styles.submit}>
                <Button variant="contained" onClick={() => sendSmell()}>Submit</Button>
                {/* {acceptData()} */}
                </div>
            </Box>

        </div>
    );
  }