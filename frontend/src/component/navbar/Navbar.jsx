import React from 'react';
import '../navbar/Navbar.css'
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const handelLogout = () => {
        const token = localStorage.getItem("loginToken");
        // console.log(token);
        axios.post("http://localhost:8080/logout", { token: token })
            .then((res) => {
                // console.log(res.status);
                if (res.status === 200) {
                    localStorage.removeItem("loginToken");
                    window.alert("Log Out sucessfully");
                    navigate("/login");
                }
            })
            .catch((err) => {
                console.log(err);
                window.alert("You are not logged in");
            })
    }
    const handelOffer = () => {
        const token = localStorage.getItem("loginToken");
        console.log(token);
        token && axios.post("http://localhost:8080/offer", { token: token })
            .then((res) => {
                console.log(res.status);
                if (res.status === 200) {
                    window.alert("You are Admin.You Can Create Offer")
                    navigate("/offer")
                } else {
                    window.alert("authentication err")
                }
            }).catch((err) => {
                console.log(err);
                window.alert("You are not a Admin");
            })
        !token && window.alert("You are not a Admin")
    }
    return (
        <div>
            <nav>
                <div className="company-name">ABC</div>
                <div>
                    <Link to="/">Home</Link>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                    <Link onClick={handelLogout}>LogOut</Link>
                    <button onClick={handelOffer}>Offer</button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
