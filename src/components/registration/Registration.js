import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Registration.css";

class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            first: "",
            last: "",
        };

        // This binding is necessary to make `this` work in the callback
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // Its a call to webservice
    registerUser(username, password, firstName, lastName) {
        const url = "http://localhost:8080/users";
        fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
                first: firstName,
                last: lastName,
            }),
        })
            .then((response) => {
                if (response.status === 200) {
                    alert("Register Compleated.");
                } else if (response.status === 422) {
                    alert("User already exists!");
                } else {
                    alert("Ups, somethings went wrong :/");
                }
            })
            .catch((error) => {
                alert("error: " + error);
            });
    }

    handleChange = (event) => {
        // Its for prevent reloading the page.
        event.preventDefault();

        console.log("change");
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        // Its for prevent reloading the page.
        event.preventDefault();

        this.registerUser(
            this.state.username,
            this.state.password,
            this.state.first,
            this.state.last
        );
        this.setState({
            username: "",
            password: "",
            first: "",
            last: "",
        });
    };

    render() {
        const { username, password, first, last } = this.state;

        return (
            <div className="Register">
                <h1 className="RegisterHeader">Register</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        onChange={this.handleChange}
                        name="first"
                        value={first}
                        placeholder="first name"
                    />
                    <input
                        type="text"
                        onChange={this.handleChange}
                        name="last"
                        value={last}
                        placeholder="last name"
                    />
                    <input
                        type="text"
                        onChange={this.handleChange}
                        name="username"
                        value={username}
                        placeholder="login"
                    />
                    <input
                        type="password"
                        onChange={this.handleChange}
                        name="password"
                        value={password}
                        placeholder="password"
                    />
                    <input type="submit" value="Submit" />
                    <p className="sign-link">
                        Already have an account? <Link to="/">Sign In</Link>
                    </p>
                </form>
            </div>
        );
    }
}

export default Registration;
