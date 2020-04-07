import React, { Component } from "react";
import "./Registration.css";

class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
        };

        // This binding is necessary to make `this` work in the callback
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // Its a call to webservice
    registerUser(username, password) {
        fetch("http://localhost:8080/users", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
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
                alert("error");
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

        console.log("submmit!");
        console.log(this.state.username + "," + this.state.password);
        this.registerUser(this.state.username, this.state.password);
    };

    render() {
        const { username, password } = this.state;

        return (
            <div className="Register">
                <h1 className="RegisterHeader">Register</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        onChange={this.handleChange}
                        name="username"
                        value={username}
                        placeholder="name"
                    />
                    <input
                        type="password"
                        onChange={this.handleChange}
                        name="password"
                        value={password}
                        placeholder="password"
                    />
                    <input type="submit" value="Register" />
                </form>
            </div>
        );
    }
}

export default Registration;
