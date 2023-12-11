import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"

import firebase from "firebase/app"; // Import only the base Firebase module
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; // Import authentication modules

import "./App.css"


function Registration() {
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [password, setPassword] = useState("")
    const [conformpassword, setConformpassword] = useState("")
    const [passwordMatchError, setPasswordMatchError] = useState("");
    const [passwordcharacters, setPasswordcharacters] = useState("");

    const navigate = useNavigate()

    const changeName = (e) => {
        setName(e.target.value)
    }
    const changeEmail = (e) => {
        setEmail(e.target.value)
    }
    const changeMobile = (e) => {
        setMobile(e.target.value)
    }
    const changePassword = (e) => {
        setPassword(e.target.value)
    }
    const changeConformpassword = (e) => {
        setConformpassword(e.target.value)
    }

    useEffect(() => {
        if (password.length < 6) {
            setPasswordcharacters("Minimum 6 characters needed for Passwords");
        } else {
            setPasswordcharacters("  ");
        }
    }, [password]);

    useEffect(() => {
        if (password === conformpassword) {
            setPasswordMatchError("");
        } else {
            setPasswordMatchError("Passwords do not match");
        }
    }, [password, conformpassword]);

    const firebaseConfig = {
        apiKey: "AIzaSyDvkI81yngIf1s3bJcpv7M6Y6scrJ-siLk",
        authDomain: "onlinshopping-1d868.firebaseapp.com",
        projectId: "onlinshopping-1d868",
        storageBucket: "onlinshopping-1d868.appspot.com",
        messagingSenderId: "354224780167",
        appId: "1:354224780167:web:7d57797256ee9286b4d922",
        measurementId: "G-KCEBZG27MB"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app); // Pass the app instance to getAuth      


    const formSubmit = (e) => {
        e.preventDefault();
        let data = { id, name, email, mobile, password, conformpassword };

        if (password === conformpassword) {
            // Create a new user with Firebase Authentication
            const createUserPromise = createUserWithEmailAndPassword(auth, email, password)

            // Send data to the local server
            const sendDataToServerPromise = fetch("https://onlineshopping-api.onrender.com/Registration", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(data)
            })
                .then((resp) => {
                    alert("Data Registered Successfully in Backend.....");
                    console.log("Test :", resp);
                    setName('');
                    setEmail('');
                    setMobile('');
                    setPassword('');
                    setConformpassword('');
                })
                .catch((err) => {
                    alert("Error: " + err);
                });


            // Use Promise.all to wait for both promises to complete
            Promise.all([createUserPromise, sendDataToServerPromise])
                .then((results) => {
                    // Additional actions after both promises have completed
                    const [signInResult] = results;
                    alert("Logged Successfully in Firebase..!");
                    navigate("/login");
                })
                .catch((errors) => {
                    // Handle errors if needed
                    console.error(errors);
                });
        } else {
            setPasswordMatchError("Passwords do not match");
        }
    };



    return (
        <div className="container-fluid bgimg g-0 ">
            <div className="row m-0 d-flex justify-content-center align-items-center">
                <div className="col-sm-6 col-md-8 w-50 mt-5 hidecard">
                    <img src="./Image/img/mobile.gif" className="m-5 h-75 w-75" alt="" />
                </div>
                <div className="col-sm-6 col-md-4">
                    <div className="card w-100 my-5">
                        <div className="card-title text-center">
                            <h3>Signup</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={formSubmit}>
                                <div className="form-group">
                                    {/* <label for="exampleInputPassword1">Name</label> */}
                                    <input value={name} onChange={changeName} type="text" className="form-control " placeholder="Enter Name" required />
                                </div><br />
                                <div className="form-group">
                                    {/* <label for="exampleInputPassword1">Email ID</label> */}
                                    <input value={email} onChange={changeEmail} type="email" className="form-control" placeholder="Enter Email ID" required />
                                </div><br />
                                <div className="form-group">
                                    {/* <label for="exampleInputPassword1">Mobile No</label> */}
                                    <input value={mobile} onChange={changeMobile} type="number" className="form-control" placeholder="Enter Mobile No" required />
                                </div><br />
                                <div className="form-group">
                                    {/* <label for="exampleInputPassword1">Password</label> */}
                                    <input value={password} onChange={changePassword} type="password" className="form-control" placeholder="Enter Password" required />
                                    <p><small className="text-danger">{passwordcharacters}</small></p>
                                </div>
                                <div className="form-group">
                                    {/* <label>Conform Password</label> */}
                                    <input value={conformpassword} onChange={changeConformpassword} type="password" className="form-control" placeholder="Enter Conform Password" required />
                                </div><p className="text-danger">{passwordMatchError}</p>
                                <br />
                                <div >
                                    <span >
                                        <input type="submit" className="btn btn-primary mx-1" value="Submit" />
                                    </span>
                                    <span className="float">
                                        <Link to="/login" className="btn btn-outline-success mx-1 px-3 m-1">Sign-in</Link>
                                    </span>
                                </div>


                            </form>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Registration;