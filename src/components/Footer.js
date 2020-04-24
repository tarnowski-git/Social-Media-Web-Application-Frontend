import React, { Component } from "react";

export class Footer extends Component {
    render() {
        let fullYear = new Date().getFullYear();

        return (
            <footer style={footStyle}>
                <p>{fullYear} &copy; All Rights Reserved by Konrad Tarnowski</p>
            </footer>
        );
    }
}

// CSSX styles are CSS-in-JS
const footStyle = {
    // position: "fixed",
    display: "flex",
    padding: "0px",
    // bottom: "0px",
    width: "100%",
    backgroundColor: "black",
    color: "white",
    alignItems: "center",
    textAlign: "center",
};

export default Footer;
