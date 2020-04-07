import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Component } from "react";
import "./App.css";

import Registration from "./components/registration/Registration";
import Login from "./components/login/Login";
import Nav from "./components/pages/Nav";
import About from "./components/pages/About";
import Home from "./components/home/Home";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: sessionStorage.getItem("username"),
            loggedIn: false,
        };

        this.updateUsername.bind(this);
    }

    logginHandle = () => {
        this.setState((prevState) => ({ loggedIn: !prevState.loggedIn }));
    };

    updateUsername = () => {
        this.setState({
            user: sessionStorage.getItem("username"),
        });
    };

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Nav
                        username={this.state}
                        updateUsername={this.updateUsername}
                        logginHandle={this.logginHandle}
                    />
                    <header className="App-header">
                        {/* <Switch> returns only one first matching route. */}
                        <Switch>
                            <Route
                                path="/"
                                exact
                                render={() => (
                                    <Login
                                        updateUsername={this.updateUsername}
                                        logginHandle={this.logginHandle}
                                    />
                                )}
                            />
                            <Route
                                path="/registration"
                                component={Registration}
                            />
                            <Route path="/about" component={About} />
                            <Route
                                path="/home"
                                render={() => (
                                    <Home logged={this.state.loggedIn} />
                                )}
                            />
                            <Route path="*" component={() => "404 Not Found"} />
                        </Switch>
                    </header>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
