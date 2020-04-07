import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Post from "../post/Post";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            posts: [],
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.logged !== this.props.logged) {
            this.setState({ redirect: true });
        }
    }

    componentDidMount() {
        if (sessionStorage.getItem("username") !== null) {
            console.log("User logged in!!");
            fetch("http://localhost:8080/posts")
                .then((response) => response.json())
                .then((posts) => {
                    console.log(posts);
                    this.setState({ posts });
                })
                .catch((error) => {
                    alert("error");
                });
        } else {
            this.setState({ redirect: true });
        }
    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect to="/" />;
        }

        return (
            <div>
                {this.state.posts.map((post) => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
        );
    }
}

export default Home;
