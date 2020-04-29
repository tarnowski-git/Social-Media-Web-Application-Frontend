import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./Home.css";
import AddPost from "../post/AddPost";
import Profile from "../profile/Profile";
import SinglePost from "../post/SinglePost";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            listOfPosts: [],
        };

        this.onAddItem = this.onAddItem.bind(this);
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
                <div className="column">
                    <div className="left">
                        <Profile />
                    </div>
                    <div className="right">
                        <AddPost onAddItem={this.onAddItem} />
                        {this.state.listOfPosts.map((post) => (
                            <SinglePost key={post.id} post={post} />
                        ))}
                        {/* <ul>
                            {this.state.listOfPosts.map((post) => (
                                <li key={post.id}>{post.body}</li>
                            ))}
                        </ul> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
