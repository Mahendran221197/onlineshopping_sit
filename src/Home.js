import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Currentuser from "./Currentuser";
import Pagination from "./Pagination";
import Footer from "./Footer";

import "./App.css"

import axios from "axios";

function ShopData() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [value, setValue] = useState("")
    const [sort, setSort] = useState("")
    const [cart, setCart] = useState([]);
    const [cartCount, setCartCount] = useState(0); // State variable for cart count


    let currentUser = Currentuser()
    let options = ['name', 'price']

    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage, setCardPerPage] = useState(8);

    const indexOfLastCard = currentPage * cardsPerPage;  // last recor = 4
    const indexOfFirstCard = indexOfLastCard - cardsPerPage; // fisrt record = 0
    const currentCards = data.slice(indexOfFirstCard, indexOfLastCard);

    const npage = Math.ceil(data.length / cardsPerPage) /// NEW one on 14.11.2023
    const number = [...Array(npage + 1).keys()].slice(1)  /// NEW one on 14.11.2023


    // const [active, setActive] = useState(1);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    // const prev = () => {
    //     if (currentPage !== 1) {
    //         setCurrentPage(currentPage - 1);
    //         setActive(active - 1);
    //     }
    // };
    // const next = () => {
    //     if (currentPage !== npage) {
    //         setCurrentPage(currentPage + 1)
    //     }
    // }

    function Prepage() { /// NEW one on 14.11.2023
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    function Nextpage() { /// NEW one on 14.11.2023
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1)
        }
    }


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
                setCartCount(response.data.length);
            })
            .catch((error) => {
                console.error("Error fetching cart data:", error);
            });

    }, []);

    const addToCart = async (itemId) => {
        // Find the item with the specified ID in your product data
        const itemToAdd = data.find(item => item.id === itemId);

        if (!itemToAdd) {
            console.error("Item not found.");
            return;
        }

        // Check if the item is already in the cart
        const isItemInCart = cart.some(cartItem => cartItem.id === itemId);
        console.log(cart.id)

        if (!isItemInCart) {
            // Update the cart count and setCart


            // Send a POST request to add the item to the cart on your local server
            axios.post("https://onlineshopping-api.onrender.com/Cart", itemToAdd)
                .then((response) => {
                    console.log("Product added to cart on the server.");
                    setCartCount(cartCount + 1);
                    setCart([...cart, itemToAdd]);
                })
                .catch((error) => {
                    console.error("Error adding product to cart:", error);
                });
        }
    };



    const handleSearch = () => {
        if (value.trim() === "") {
            // Empty search box, reset to normal display
            fetch(`https://onlineshopping-api.onrender.com/Products?_order=asc`)
                .then((res) => res.json())
                .then((resp) => {
                    setData(resp);
                })
                .catch((err) => {
                    console.log("Error: ", err);
                });
        } else {
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

    const handleInputChange = (e) => {
        setValue(e.target.value);
        handleSearch();
    };

    const handleInputChangeKeyPress = (e) => {
        // if (e.key === "Enter") {
        handleSearch();
        // }
    };

    const sortData = async (e) => {
        e.preventDefault();
        let value = e.target.value;
        setSort(value);
        return await axios.get(`https://onlineshopping-api.onrender.com/Products?_sort=${value}&_order=asc`) //desc
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const logout = () => {
        alert("Successfully Logout...!");
        navigate("/login");
    };

    const carts = () => {
        navigate("/cart");
    };

    return (
        <div class="">

            <div className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link to="/home">
                        <img src="/Image/Logo/Logo.png" width="50" height="50" className="d-inline-block align-top" alt="" />
                        <span class="mx-5"></span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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


            <br />
            <div class="row mx-2 ">
                {/* Left side */}
                <div class="col-md-3 my-2 p-1 ">
                    <div className="card px-3 card-table mb-2 shadow-sm p-3 mb-5 bg-white rounded rbg">
                        <div className="card-body">
                            <div>
                                <select className="form-select p-2 mb-2 bg-light">
                                    <option>Shop by Concern</option>
                                    <option>Shop by Concern</option>
                                </select>
                            </div>
                            <div>
                                <select className="form-select p-2 mb-2 bg-light">
                                    <option>Shop by Category</option>
                                    <option>Shop by Category</option>
                                </select>
                            </div>
                            <div>
                                <select className="form-select p-2 mb-2 bg-light">
                                    <option>Shop by Product</option>
                                    <option>Shop by Product</option>
                                </select>
                            </div>
                            <div>
                                <select className="form-select p-2 mb-2 bg-light ">
                                    <option>Shop All</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="card card-table border-0 w-100">
                        <div className="card-body p-0 ">
                            <select value={sort} onChange={sortData} className="form-select shadow-lg p-3 mb-5 bg-light rounded ">
                                <option>Short All</option>
                                {options.map((item) => (
                                    <option>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="card px-3 card-table mb-2 shadow-sm p-3 mb-5 bg-white rounded rbg">
                        <div className="card-body">
                            <div>
                                <input type="range" class="form-range" min="0" max="100" step="1" />
                                <label for="customRange3" class="form-label">Price</label>
                            </div>
                            <div>
                                <input type="range" class="form-range" min="0" max="100" step="1" />
                                <label for="customRange3" class="form-label">Offers %</label>
                            </div>
                        </div>
                    </div>
                </div>



                {/* right side */}
                <div className=" col-md-9 container-fluid-md my-2 p-1">
                    <div className="card px-3 card-table border-0">
                        <div className="card-body pt-0">
                            {/* Create card for data */}
                            <div className="row my-3">
                                {currentCards.length === 0 ? (
                                    <div className="col-12 text-center">No data found</div>
                                ) : (
                                    currentCards.map((item) => (
                                        <div className="col-sm-3  mb-3" >
                                            <div className="card h-100 " key={item.id}>
                                                <div className="card-body">
                                                    <img src={item.image} width="100%" class="mb-2" height="200px" alt="Product Image" />
                                                    <div className="card-text">
                                                        <p className="h6 mb-3">{item.name}</p>
                                                        <p className="h4"> &#8360;. {item.price}</p>
                                                    </div>
                                                </div>
                                                <div class="mb-3 mx-3 d-flex justify-content-center">
                                                    <button className="btn btn-outline-success float-end" onClick={() => addToCart(item.id)}>Add to Cart &nbsp;<i class="fa-solid fa-bag-shopping "></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>


                            {/* Pagination buttons */}
                            <nav aria-label="Page navigation example" className="d-flex justify-content-center">
                                {/* <Pagination total={data.length} records={cardsPerPage} update={paginate} next={Nextpage} prev={Prepage} activePage={currentPage} /> */}
                                <Pagination records={npage} update={paginate} next={Nextpage} prev={Prepage} activePage={currentPage} /> 
                                {/* the above one is new one on 14.11.2023*/}
                            </nav>


                        </div>
                    </div>
                </div>
            </div>

            <div>
                <Footer />
            </div>
        </div>
    );
}

export default ShopData;
