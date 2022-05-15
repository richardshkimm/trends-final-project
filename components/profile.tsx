import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import profile from "../styles/profile.module.css"
import { deepOrange, deepPurple } from '@mui/material/colors';
import Button from '@mui/material/Button';
//import { signInWithGoogle } from "../util/firebase"
//import { userAuth } from "./AuthUserProvider"
///import { LoadingButton } from '@mui/lab';


/*const SignIn = () => {
    const { user, loading } = userAuth()
    
    return (
       <Button 
       variant = "contained"
       onClick={signInWithGoogle}
       >
           Sign In 
       </Button>
*/
   /* <Stack direction="row" spacing={2}>
      <Button 
            onClick={user ? signOut : signInWithGoogle}
            variant="contained" color="success">
         {user ? "Sign Out" : "Sign In"}
      </Button>
    </Stack>*/
    /*
      <Box px={4} shadow="base">
        <HStack justifyContent="space-between">
          <HStack h={14} as="nav" spacing={4} alignItems="center">
            {navData.map((data) => (
              <NavLink key={data.path} navData={data} />
            ))}
          </HStack>
          <Button
            _focusVisible={{ shadow: "outline" }}
            _focus={{ shadow: "none" }}
            colorScheme={"facebook"}
            onClick={user ? signOut : signInWithGoogle}
          >
            {user ? "Sign Out" : "Sign In"}
          </Button>
        </HStack>
      </Box>
    )
  }
  */
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

