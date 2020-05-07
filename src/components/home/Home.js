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
        const updatedList = [post, ...this.state.listOfPosts];
        this.setState({ listOfPosts: updatedList });
    };

    // event its need to be the last argument
    onDeleteItem = (postId, event) => {
        event.preventDefault();
        // copy an array in State to new object
        const url = "http://localhost:8080/posts?id=" + postId;
        fetch(url, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.status === 200) {
                    setTimeout(function () {
                        alert("Post deleted.");
                    }, 1);
                    const posts = Object.assign([], this.state.listOfPosts);
                    const filteredPost = posts.filter((post) => {
                        return post.id !== postId;
                    });
                    this.setState({ listOfPosts: filteredPost }); //replacing data
                } else {
                    alert("Something went wrong with post deleting.");
                }
            })
            .catch((error) => console.log("error", error));
    };

    onUpdateItem = (postId, updatedPostContent) => {
        const url = "http://localhost:8080/posts?id=" + postId;
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8", // Indicates the content
            },
            body: updatedPostContent,
        })
            .then((response) =>
                response
                    .json()
                    .then((data) => ({ status: response.status, body: data }))
            )
            .then((obj) => {
                if (obj.status === 200) {
                    setTimeout(function () {
                        alert("Post updated.");
                    }, 1);
                } else {
                    alert("Ups, somethings went wrong :/");
                }
                console.log(obj);
            })
            .catch((error) => {
                alert("error: " + error);
            });
    };

    componentDidUpdate(prevProps) {
        if (prevProps.logged !== this.props.logged) {
            this.setState({ redirect: true });
        }
    }

    componentDidMount() {
        if (sessionStorage.getItem("username") !== null) {
            const url = "http://localhost:8080/posts/all";
            fetch(url)
                .then((response) => response.json()) // Transform the data into json
                .then((data) => {
                    console.log(data);
                    data.map((post) => this.onAddItem(post));
                })
                .catch((error) => {
                    alert("error: " + error);
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
                <div className="column">
                    <div className="left">
                        <Profile />
                    </div>
                    <div className="right">
                        <AddPost onAddItem={this.onAddItem} />
                        {this.state.listOfPosts.map((post) => (
                            <SinglePost
                                key={post.id}
                                postId={post.id}
                                createdAt={post.createdAt}
                                updatedAt={post.updatedAt}
                                postUsername={post.user.username}
                                userAvatar={post.user.imageUrl}
                                postOwnerName={
                                    post.user.first + " " + post.user.last
                                }
                                deleteEvent={this.onDeleteItem.bind(
                                    this,
                                    post.id
                                )}
                                updateEvent={this.onUpdateItem.bind(
                                    this,
                                    post.id
                                )}
                            >
                                {post.body}
                            </SinglePost>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
