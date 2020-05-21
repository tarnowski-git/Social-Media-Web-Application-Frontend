import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Component } from "react";
import "./App.css";

import Registration from "./components/registration/Registration";
import Login from "./components/login/Login";
import NavigationBar from "./components/NavigationBar";
import About from "./components/About";
import Home from "./components/home/Home";
import ProfileDetail from "./components/profile/ProfileDetail";

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

    componentDidMount() {
        if (sessionStorage.getItem("username") !== null) {
            this.setState({ loggedIn: true });
        }
    }

    componentWillUnmount() {
        this.setState({ loggedIn: false });
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
                    {this.state.loggedIn === true && (
                        <NavigationBar
                            username={this.state}
                            updateUsername={this.updateUsername}
                            logginHandle={this.logginHandle}
                        />
                    )}
                    {/* <Switch> returns only one first matching route. */}
                    <Switch>
                        <Route path="/" exact>
                            <Login
                                updateUsername={this.updateUsername}
                                logginHandle={this.logginHandle}
                            />
                        </Route>
                        <Route path="/registration" component={Registration} />
                        <Route path="/about" component={About} />
                        <Route path="/home" exact>
                            <Home logged={this.state.loggedIn} />
                        </Route>
                        <Route
                            path="/home/:username"
                            component={ProfileDetail}
                        />
                        <Route path="*" component={() => "404 Not Found"} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
