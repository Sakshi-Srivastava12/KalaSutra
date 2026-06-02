import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import "./Navbar.css";

function Navbar(){

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();

    // 🔥 NEW STATES
    const [cartCount, setCartCount] = useState(0);
    const [wishCount, setWishCount] = useState(0);

    // 🔥 Load user + counts
    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser && storedUser.trim() !== "") {
            setUser(storedUser);
        } else {
            setUser(null);
        }

        // 🛒 CART COUNT
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartCount(cart.length);

        // ❤️ WISHLIST COUNT
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishCount(wishlist.length);

    }, []);

    // 🔥 Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // 🔥 Logout
    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");   // JWT bhi remove
        setUser(null);
        alert("Logged out ❌");
        window.location.href = "/login";
    };

    return(
        <nav className="navbar">

            {/* LOGO */}
            <h2 className="logo">
                <span className="kala">Kala</span>
                <span className="sutra">सूत्र</span>
            </h2>

            {/* LEFT SIDE */}
            <ul className="nav-left">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Products</Link></li>

                {!user && (
                    <li>
                        <Link to="/login" className="login-link">
                            Login
                        </Link>
                    </li>
                )}
            </ul>

            {/* RIGHT SIDE */}
            <div className="nav-right">

                {/* ❤️ WISHLIST */}
                <div className="icon-wrapper" onClick={() => navigate("/wishlist")}>
                    <FaHeart className="icon" />
                    {wishCount > 0 && <span className="badge">{wishCount}</span>}
                </div>

                {/* 🛒 CART */}
                <div className="icon-wrapper" onClick={() => navigate("/cart")}>
                    <FaShoppingCart className="icon" />
                    {cartCount > 0 && <span className="badge">{cartCount}</span>}
                </div>

                {/* USER SECTION */}
                {user && (
                    <div className="user-container" ref={dropdownRef}>

                        {/* USER ICON */}
                        <div
                            className="user-icon"
                            onClick={() => setOpen(!open)}
                        >
                            👤
                        </div>

                        {/* DROPDOWN */}
                        {open && (
                            <div className="dropdown">

                                <p className="user-email">{user}</p>

                                <hr />

                                <p
                                    className="menu-item"
                                    onClick={() => {
                                        navigate("/profile");
                                        setOpen(false);
                                    }}
                                >
                                    My Profile
                                </p>

                                <p
                                    className="menu-item"
                                    onClick={() => {
                                        navigate("/orders");
                                        setOpen(false);
                                    }}
                                >
                                    Orders
                                </p>

                                <p
                                    className="menu-item"
                                    onClick={() => {
                                        navigate("/contact");
                                        setOpen(false);
                                    }}
                                >
                                    Contact
                                </p>

                                <hr />

                                <p className="logout" onClick={handleLogout}>
                                    Logout
                                </p>

                            </div>
                        )}

                    </div>
                )}

            </div>

        </nav>
    );
}

export default Navbar;