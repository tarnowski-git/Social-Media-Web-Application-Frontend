import React from "react";
import { Link } from "react-router-dom";
import "./Styles.css";
import logo from "./logo-uksw.jpg";

function Nav(props) {
    function logout() {
        console.log("logout clicked!!");
        sessionStorage.clear();
        props.updateUsername();
        props.logginHandle();
    }

    return (
        <nav>
            <div className="header">
                <img src={logo} alt={"logo"} />
            </div>
            <ul className="nav-links">
                <Link to="/home">
                    <li>Home</li>
                </Link>
                <Link to="/registration">
                    <li>Registration</li>
                </Link>
                <Link to="/about">
                    <li>About</li>
                </Link>
            </ul>
            <div className="user-avatar">
                {props.username.user}
                <button onClick={logout}>Logout</button>
            </div>
        </nav>
    );
}

export default Nav;
