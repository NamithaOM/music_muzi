import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Home.css';

export default function Head() {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("userdata")));

    const logout = () => {
        localStorage.clear();
        setTimeout(() => {
            navigate('/');
            window.location.reload();
        }, 100);
    }

    

    return (
        <header className="header">
            <div className="container">
                <div className="row">
                    <div className="col-lg-2 col-md-2">
                        <div className="header__logo">
                            <h1 style={{ fontFamily: "Lucida Handwriting", fontSize: '3rem', color: 'wheat' }}>MUzi</h1>
                        </div>
                    </div>
                    <div className="col-lg-10 col-md-10">
                        <div className="header__nav">
                            <nav className="header__menu mobile-menu">
                                {auth?.payment === 0 ? (
                                    <ul>
                                        <li className="active"><a href="/">Home</a></li>
                                        <li><a href="/payment">Subscribe</a></li>
                                        <li><a href="/profile">Profile</a></li>
                                        {/* <li><a href="/favorites">Favorites</a></li> */}
                                        <li><a href="/newevent">Events</a></li>
                                        <li><a href="/share">Shared list</a></li>
                                        <li><a href="/" onClick={logout}>Logout</a></li>
                                    </ul>
                                ) : (
                                    <ul>
                                        <li className="active"><a href="/">Home</a></li>
                                        <li><a href="/profile">Profile</a></li>
                                        <li><a href="/share">Shared list</a></li>
                                        <li><a href="/favorites">Favorites</a></li>
                                        <li><a href="/newevent">Events</a></li>
                                        <li><a href="/" onClick={logout}>Logout</a></li>
                                    </ul>
                                )}
                            </nav>
                        </div>
                    </div>
                </div>
                <div id="mobile-menu-wrap"></div>
            </div>
        </header>
    );
}
