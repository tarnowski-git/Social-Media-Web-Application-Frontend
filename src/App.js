import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Component } from "react";
import "./App.css";

import Registration from "./components/registration/Registration";
import Login from "./components/login/Login";
import NavigationBar from "./components/NavigationBar";
import About from "./components/About";
import Home from "./components/home/Home";
import Footer from "./components/Footer";
import ProfilePage from "./components/profile/ProfilePage";

require("dotenv").config();

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: sessionStorage.getItem("username"),
            loggedIn: false,
        };

        this.updateUsername = this.updateUsername.bind(this);
        this.logginHandle = this.logginHandle.bind(this);
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
                    <NavigationBar
                        username={this.state}
                        updateUsername={this.updateUsername}
                        logginHandle={this.logginHandle}
                    />
                    {/* <Switch> returns only one first matching route. */}
                    <Switch>
                        <Route exact path="/">
                            <Login
                                updateUsername={this.updateUsername}
                                logginHandle={this.logginHandle}
                            />
                        </Route>
                        <Route exact path="/registration">
                            <Registration />
                        </Route>
                        <Route exact path="/about">
                            <About />
                        </Route>
                        <Route exact path="/home">
                            <Home logged={this.state.loggedIn} />
                        </Route>
                        <Route path="/:userId">
                            <ProfilePage />
                        </Route>
                        <Route path="*" component={() => "404 Not Found"} />
                    </Switch>
                    <Footer />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
