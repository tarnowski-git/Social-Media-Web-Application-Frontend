import React, { Component } from "react";
import "./Login.css";
import { Redirect } from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            redirectToHomepage: false,
        };

        // This binding is necessary to make `this` work in the callback
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // Its a call to webservice
    loginUser(username, password) {
        fetch("http://localhost:8080/login", {
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
                    alert("Login successful! You are now logged in :)");
                    // local storage
                    sessionStorage.setItem("username", username);
                    this.props.updateUsername();
                    this.props.logginHandle();
                    this.setState({ redirectToHomepage: true });
                } else {
                    alert(
                        "Wrong credentials! Username and/or password is wrong :("
                    );
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
        this.loginUser(this.state.username, this.state.password);

        // // Start test
        // sessionStorage.setItem("username", this.state.username);
        // this.props.updateUsername();
        // this.props.logginHandle();
        // this.setState({ redirectToHomepage: true });
        // // end test
    };

    render() {
        const { username, password } = this.state;

        if (this.state.redirectToHomepage === true) {
            return <Redirect to={"/home"} />;
        }

        return (
            <div className="Login">
                <h1 className="LoginHeader">Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        placeholder="login"
                        onChange={this.handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="password"
                        onChange={this.handleChange}
                    />
                    <input type="submit" value="Login" />
                </form>
            </div>
        );
    }
}

export default Login;
