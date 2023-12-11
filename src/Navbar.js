// Navbar.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Currentuser from "./Currentuser";
import "./App.css"

import axios from "axios";

function Navbar({handleInputChange, value }) {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    // const [value, setValue] = useState("")
    const [sort, setSort] = useState("")
    const [cart, setCart] = useState([]);
    const [cartCount, setCartCount] = useState(0); // State variable for cart count

    let currentUser = Currentuser();
    useEffect(() => {
        fetch(`https://onlineshopping-api.onrender.com/Products?_order=asc`)
            .then((res) => res.json())
            .then((resp) => {
                setData(resp);
            })
            .catch((err) => {
                console.log("Error: ", err);
            });

        axios.get("https://onlineshopping-api.onrender.com/Cart")
            .then((response) => {
                setCart(response.data);
                setCartCount(response.data.length);
            })
            .catch((error) => {
                console.error("Error fetching cart data:", error);
            });

            

    }, []);

     const handleSearch = () => {
        if (value.trim() === " ") {
            // Empty search box, reset to normal display
            fetch(`https://onlineshopping-api.onrender.com/Products?_order=asc`)
                .then((res) => res.json())
                .then((resp) => {
                    setData(resp);
                })
                .catch((err) => {
                    console.log("Error: ", err);
                });
        }else {
            axios
                .get(`https://onlineshopping-api.onrender.com/Products?q=${value}`)
                .then((res) => {
                    setData(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    // const handleInputChange = (e) => {
    //     setValue(e.target.value);
    //     handleSearch();
    // };

    const handleInputChangeKeyPress = (e) => {
        // if (e.key === "Enter") {
        handleSearch();
        // }
    };
    const carts = () => {
        navigate("/cart");
    };

    const logout = () => {
        alert("Successfully Logout...!");
        navigate("/login");
    };

    return (
        <div className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link to="/home">
                    <img
                        src="/Image/Logo/Logo.png"
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                        alt=""
                    />
                    <span className="mx-5"></span>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="input-group mb-3 mt-2 mx-sm-3" align="center">
                        <span className="input-group-text"><i className="fa-solid fa-magnifying-glass"></i></span>
                        <input type="text" className="form-control form-control-sm" value={value} onChange={handleInputChange} onKeyPress={handleInputChangeKeyPress} placeholder="Filter Records..." />
                    </div>
                    <div>
                        {/* Display the cart count in a badge */}
                        <span className="position-relative">
                            <button class="rounded-circle mx-2" onClick={carts}>
                                <i class="fa-regular fa-bell"></i>
                                {cartCount > 0 && (
                                    <span className="badge bg-danger rounded-circle position-absolute top-0 start-100 translate-middle">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </span>
                    </div>

                    <div class="rounded-circle mx-2 d-flex">
                        <div class="btn-group mx-2">
                            <button class="btn btn-light btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-regular fa-circle-user mt-1 mx-2"></i>
                                {currentUser?.email}
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li>
                                    <a class="dropdown-item " href="#" onClick={logout}>Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
