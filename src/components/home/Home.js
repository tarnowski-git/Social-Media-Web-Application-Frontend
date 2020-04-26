import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import SinglePost from "../post/SinglePost";
import AddPost from "../post/AddPost";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            listOfPosts: [],
            test: [1, 2, 3],
        };
    }

    onAddItem = (post) => {
        const updatedList = [...this.state.listOfPosts, post];
        this.setState({ listOfPosts: updatedList });
    };

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
                    console.log(data);
                    data.map((post) => this.onAddItem(post));
                })
                .catch((error) => {
                    alert("error" + error);
                });
        } else {
            this.setState({ redirect: true });
        }
        // <SinglePost key={post.id} post={post} />
    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect to="/" />;
        }

        return (
            <div>
                <AddPost />
                <ul>
                    {this.state.listOfPosts.map((post) => (
                        <li key={post.id}>{post.body}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Home;
