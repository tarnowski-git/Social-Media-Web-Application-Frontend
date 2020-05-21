import React from "react";
import { Link } from "react-router-dom";
import "./Styles.css";
import logo from "../images/logo-uksw.png";

function NavigationBar(props) {
    function logout() {
        console.log("logout clicked!!");
        sessionStorage.clear();
        props.updateUsername();
        props.logginHandle();
    }

    return (
        <header>
            <div className="header">
                <img src={logo} alt={"logo"} />
            </div>
            <nav>
                <ul className="nav-links">
                    <Link to="/home">
                        <li>Home</li>
                    </Link>
                </ul>
            </nav>
            <div className="user-avatar">
                <button
                    onClick={logout}
                >{`Logout ${props.username.user}`}</button>
            </div>
        </header>
    );
}

export default NavigationBar;
