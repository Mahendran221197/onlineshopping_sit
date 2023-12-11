import firebase from "firebase/app"; // Import only the base Firebase module
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";


    
const firebaseConfig = {
    apiKey: "AIzaSyDvkI81yngIf1s3bJcpv7M6Y6scrJ-siLk",
    authDomain: "onlinshopping-1d868.firebaseapp.com",
    projectId: "onlinshopping-1d868",
    storageBucket: "onlinshopping-1d868.appspot.com",
    messagingSenderId: "354224780167",
    appId: "1:354224780167:web:7d57797256ee9286b4d922",
    measurementId: "G-KCEBZG27MB"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth()

function Currentuser(){
    const [user,setUser]=useState()
    useEffect(()=>{
        let x = onAuthStateChanged(auth,Cuser=>setUser(Cuser))
        return x
    },[])
    // console.log("Current user:",user)
    return user
}
export default Currentuser;