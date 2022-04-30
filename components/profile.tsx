import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import profile from "../styles/profile.module.css"
import { deepOrange, deepPurple } from '@mui/material/colors';
import Button from '@mui/material/Button';


export default function LetterAvatars() {
  return (
    
    <div className={profile.container}>
        <Stack spacing={2} direction="row">
        <div className={profile.avatar}>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>N

            </Avatar>
         </div>    

        </Stack>
        <div className={profile.details}>
            <div className={profile.posts}>
                <h1>
                    28   
                    <small> Posts</small>
                </h1>
            </div>
            <div className={profile.Followers}>
                <h1>
                    10
                    <small> Followers </small>
                </h1>
            </div>
            <h1>
                29
                <small> Following</small>
            </h1>

        </div>    
        <div className = {profile.follow}>
            <Button variant="contained" disableElevation>
                
                Follow    
        </Button>
        </div>
    </div>

    
  );
}