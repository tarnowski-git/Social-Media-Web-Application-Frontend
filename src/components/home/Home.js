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
            const url = "http://localhost:8080/posts";
            fetch(url)
                .then((response) => response.json()) // Transform the data into json
                .then((data) => {
                    let post = data;
                    console.log(post);
                    this.setState({ post });
                })
                .catch((error) => {
                    alert("error" + error);
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
