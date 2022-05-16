// npm install firebase
import { initializeApp, getApps, getApp, FirebaseError} from "firebase/app"
import { getFirestore } from "firebase/firestore"
import {
  query,
  getDocs,
  collection,
  where,
  addDoc,
}
from "firebase/firestore";
import withFirebaseAuth from "react-with-firebase-auth"
import "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBTau5mXiVX0iIXRab31-dk7Vk6bT42wEg",
  authDomain: "aromap-42052.firebaseapp.com",
  projectId: "aromap-42052",
  storageBucket: "aromap-42052.appspot.com",
  messagingSenderId: "442786158561",
  appId: "1:442786158561:web:0ba1da5f1f7444619724a0"
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

const db = getFirestore(app)

/*const auth = getAuth(app)

const providers = {
  googleProvider: new GoogleAuthProvider(),
}

const createComponentWithAuth = withFirebaseAuth({
  providers, 
  firebaseAppAuth: auth, 
})

const signInWithGoogle = () => {
  signInWithPopup(auth, providers.googleProvider)
  /*try{
    const recieve = await signInWithPopup(auth, providers.googleProvider)
    const user = recieve.user; 
    const queue = query(collection(db, "owners"), where ("owners", "==", user.uid)); 
    const docs = await getDocs(queue); 
    if(docs.docs.length == 0){
      await addDoc(collection(db,"users"), {
        uid: user.uid, 
        name : user.displayName, 
        authProvider: "google",
        email: user.email,
      });
    }
  }
  catch(err : any){
    console.error(err)
    alert(err.message); 

  }*/


/*const logInWith = async (email: string, password: string) =>{
  try {
    await signInWithEmailAndPassword(auth,email,password);
  }
  catch(err:any){
    alert(err.message);
  }
};*/

/*const register = async (name:string, email: string, password: string) => {
  try {
    const recieve = await signInWithPopup(auth, providers.googleProvider)
    const user = recieve.user; 
    await addDoc(collection(db,"users"), {
      uid: user.uid, 
      name : user.displayName, 
      authProvider: "google",
      email: user.email,
    });
  }
  catch(err : any){
    console.error(err)
    alert(err.message); 
  }
};*/

/*const signOutFirebase = () => {
  signOut(auth)
}*/

export { 
  app,
  db, 
  //auth, 
  /*createComponentWithAuth, 
  signInWithGoogle,
  signOutFirebase as signOut*/
}