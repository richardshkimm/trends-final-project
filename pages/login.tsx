/*import React from "react";
//import "./login.css"
import { signInWithGoogle } from "../util/firebase";
import {useAuth} from "../components/AuthUserProvider";
import Button from '@mui/material/Button';

import NextLink from "next/link";
import { useRouter } from "next/router";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

const SignIn = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    if(loading) {
        return <CircularProgress/>
    }
    else if (user){
        navigate("/dashboard");
    }
    return (
        <div className = "login">
            <Button 
                variant = "contained"
                onClick={signInWithGoogle}
            >
            Sign In 
            </Button>
        </div>
    );
}

export default SignIn;
*/