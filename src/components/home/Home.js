import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./Home.css";
import PostAdd from "../post/PostAdd";
import Profile from "../profile/Profile";
import Post from "../post/Post";
import Footer from "../Footer";
import PostGroup from "../post/PostGroup";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.logged !== this.props.logged) {
            this.setState({ redirect: true });
        }
    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect to="/" />;
        }

        return (
            <div>
                <div className="column">
                    <div className="left">
                        <Profile />
                    </div>
                    <div className="right">
                        <PostGroup />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Home;
