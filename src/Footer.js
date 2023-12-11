import React from "react";

import "./App.css"
function Footer() {
    return (
        <div className="footer">
            <div className="row mx-0 ">
                <div className="col-md-4 my-5 ">
                    <label><b>Logo</b></label>
                    <p className="mt-2">Sub line</p>
                </div>

                <div className="col-md-2 my-5">
                    <label><b>pages</b></label>
                    <p className="mt-2">Abour Us</p>
                    <p className="mt-2">Our Expertise</p>
                    <p className="mt-2">Testimonials</p>
                    <p className="mt-2">Skin & Hair</p>
                    <p className="mt-2">Shop</p>
                </div>
                <div className="col-md-2 my-5">
                    <label><b>Legal and help</b></label>
                    <p className="mt-2">FAQs</p>
                    <p className="mt-2">Terms of use</p>
                    <p className="mt-2">Privacy policy</p>
                </div>
                <div className="col-md-2 my-5">
                    <label><b>Contact us</b></label>
                    <p className="mt-2"><span><i class="fa-solid fa-location-dot h4"></i></span>&nbsp; Address</p>
                    <p className="mt-2"><span><i class="fa-solid fa-phone h4"></i></span>&nbsp; Phone numbers</p>
                    <p className="mt-2"><span><i class="fa-regular fa-envelope h4"></i></span>&nbsp; mail id</p>
                </div>
                <div className="col-md-2 my-5">
                    <label><b>Social links</b></label>
                    <p class="mt-2">
                        <span class="pr-3">
                            <i class="fa-brands fa-facebook h4"></i>
                        </span>
                        <span class="px-3">
                            <i class="fa-brands fa-twitter h4"></i>
                        </span>
                        <span class="px-3">
                            <i class="fa-brands fa-linkedin h4"></i>
                        </span>
                        <span class="px-3">
                            <i class="fa-brands fa-youtube h4"></i>
                        </span>
                    </p>
                    <p>
                        <i class="fa-brands fa-google-play h4"></i> Google Play
                    </p>
                    <p>
                        <i class="fa-brands fa-apple h4"></i> Apple Store
                    </p>

                </div>
            </div>
        </div>
    )
}
export default Footer;