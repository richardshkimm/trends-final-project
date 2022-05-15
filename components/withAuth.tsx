import {useEffect, useState} from "react";
import router from "next/router";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import {app} from "../util/firebase"; 
import { Router } from "react-router-dom";

app;

const auth = firebase.auth();

const withAuth= (Component:any) => (props:any) => {
    useEffect(() => {
        auth.onAuthStateChanged(authUser =>{
            if(!authUser){
                router.push('/signin');
            }
    });
}, []); 

return (
    <div>
        <Component {...props} />
    </div>
)
};

export default withAuth;