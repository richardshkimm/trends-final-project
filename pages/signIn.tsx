import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {app} from "../util/firebase";

import { setUserCookie } from "../components/userCookie";
import { mapUserData } from "../components/useUser";
import { async } from "@firebase/util";

app;

const firebaseAuthConfig = ( {signInSuccessUrl}:any) => ({
    signInFlow: "popup",
    signInOptions: [
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: false
        }, 
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl,
    credentialHelper :"none", 
    callbacks: {
        signInSuccessWithAuthResult: async( {user}:any, redirectUrl:string) => {
            const userData = await mapUserData(user);
            setUserCookie(userData);
        }
    }
});

const FirebaseAuth = () =>{
    const signInSuccessUrl = "/private"
    return (
        <div>
            <StyledFirebaseAuth
                uiConfig={firebaseAuthConfig({signInSuccessUrl})}
                firebaseAuth ={firebase.auth()}
                signInSuccessUrl={signInSuccessUrl}
            />
        </div>
    );
};

export default FirebaseAuth;