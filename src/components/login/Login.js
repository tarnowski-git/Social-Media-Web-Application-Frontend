import React, { Component } from "react";
import "./Login.css";
import { Redirect, Link } from "react-router-dom";

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

    componentDidMount() {
        if (sessionStorage.getItem("username") !== null) {
            this.setState({ redirectToHomepage: true });
        }
    }

    // Its a call to webservice
    loginUser(username, password) {
        const url = "http://localhost:8080/login";
        fetch(url, {
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
                response
                    .json()
                    .then((data) => ({ status: response.status, body: data }))
                    .then((obj) => {
                        if (obj.status === 200) {
                            // session storage
                            sessionStorage.setItem("username", username);
                            this.props.updateUsername();
                            this.props.logginHandle();
                            this.setState({ redirectToHomepage: true });
                            console.log(
                                "Login successful! You are now logged in :)"
                            );
                        } else {
                            // trick for async alerts
                            setTimeout(function () {
                                alert(
                                    "Wrong credentials! Username and/or password is wrong :("
                                );
                            }, 1);
                        }
                    });
            })
            .catch((error) => {
                alert("error: " + error);
            });
    }

    handleChange = (event) => {
        // Its for prevent reloading the page.
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleSubmit = (event) => {
        // Its for prevent reloading the page.
        event.preventDefault();

        console.log(this.state.username + "," + this.state.password);
        this.loginUser(this.state.username, this.state.password);
    };

    render() {
        const { username, password } = this.state;

        if (this.state.redirectToHomepage === true) {
            return <Redirect to={"/home"} />;
        }
        return (
            <div className="Form">
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
                        <p className="sign-link">
                            New User? <Link to="/registration">Sign Up</Link>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
