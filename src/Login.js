import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import firebase from "firebase/app"; // Import only the base Firebase module
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Import authentication modules


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);  // for hide/show password function 
  const navigate = useNavigate()

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  // for hide/show password function 
  const togglePasswordVisibility = () => { 
    setShowPassword(!showPassword);
  };

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



  const handleLogin = (e) => {
    e.preventDefault();
    const signInPromise = signInWithEmailAndPassword(auth, email, password)

    const fetchPromise = fetch("https://onlineshopping-api.onrender.com/Registration")
      .then((resp) => resp.json())
      .then((res) => {
        const user = res.find((user) => user.email === email && user.password === password);
        if (user) {
          alert("Login Successful in Local Server....!");
          navigate("/home");
        } else {
          alert("Invalid Email or Password");
        }
      })
      .catch((error) => {
        alert("Error: " + error);
      });

    Promise.all([signInPromise, fetchPromise])
      .then((results) => {
        const [signInResult] = results;
        alert("Logged Successfully in Firebase..!");
        navigate("/home");
      })
      .catch((errors) => {
        console.error(errors);
      });
  };



  return (
    <div className="bgimg2 d-flex justify-content-center align-items-center">
      <div className="card px-3 mt-5 w-50">
        <div className="card-title text-center">
          <h3>Signin</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input value={email} onChange={changeEmail} type="email" className="form-control" placeholder="Enter Your Email" />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="password">Password</label>
              {/* <input value={password} onChange={changePassword} type="password" className="form-control" placeholder="Enter Your Password"/> */}
              
              <div className="input-group"> {/* for hide/show password start */}
                <input value={password} onChange={changePassword} type={showPassword ? "text" : "password"} className="form-control"
                  placeholder="Enter Your Password"/>
                <button className="btn border" type="button" onClick={togglePasswordVisibility} >
                  {showPassword ? <i class="fa-regular fa-eye-slash"></i> : <i class="fa-regular fa-eye"></i>}
                </button>
              </div> {/* for hide/show password end  */}
            </div>
            <br />
            <input type="submit" className="btn btn-primary mx-1 px-4 " value="Login" />
            <label className="float-end">Click the link to<Link to="/" className="mx-2 ">Sign-up</Link></label>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
