import { Button, TextField, Typography, FormGroup, FormControlLabel, Switch } from '@mui/material';
import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
//import StarIcon from '@mui/icons-material/Star';

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

    return (
        <div>
            <h1>This is the add smell canvas</h1>
            <TextField id="outlined-basic" label="Title of Smell" variant="outlined" />
            <TextField id="outlined-basic" label="Smell Category" variant="outlined" />
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
            <FormGroup>
                <FormControlLabel control={<Switch defaultChecked />} label="Allergy" />
            </FormGroup>
        </div>
    );
  }