import React, { Component } from "react";
import Post from "./Post";
import PostAdd from "./PostAdd";

class PostGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
        };
    }

    componentDidMount() {
        const url = "http://localhost:8080/posts/all";
        fetch(url, {
            method: "GET",
        })
            .then((response) =>
                response
                    .json()
                    .then((data) => ({ status: response.status, body: data }))
            )
            .then((obj) => {
                if (obj.status === 200) {
                    setTimeout(function () {
                        alert("Posts has been fetched");
                    }, 1);
                    obj.body.reverse();
                    this.setState({ posts: obj.body });
                } else {
                    alert("Sorry, something went wrong :/");
                }
            })
            .catch((error) => {
                alert("error: " + error);
            });
    }

    handlePostSubmit(postBody) {
        const username = sessionStorage.getItem("username");
        const url = "http://localhost:8080/posts";
        fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                username: username,
            },
            body: postBody,
        })
            .then((response) =>
                response
                    .json()
                    .then((data) => ({ status: response.status, body: data }))
            )
            .then((obj) => {
                if (obj.status === 200) {
                    setTimeout(function () {
                        alert("Post has been added.");
                    }, 1);
                    let updatedArray = this.state.posts;
                    updatedArray.unshift(obj.body);
                    this.setState({ posts: updatedArray });
                } else {
                    alert(`Ups, somethings went wrong :/ ${obj.status}`);
                }
            })
            .catch((error) => {
                alert("error: " + error);
            });
    }

    handlePostUpdate(postId, bodyPost) {
        const url = `http://localhost:8080/posts?id=${postId}`;
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8", // Indicates the content
            },
            body: bodyPost,
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
                // switch old value with new value from DB
                let postCopy = [...this.state.posts]; // create the copy of state array
                let index = postCopy.findIndex((post) => post.id === postId);
                postCopy[index] = obj.body; //new value
                this.setState({ posts: postCopy }); //update the value
            })
            .catch((error) => {
                alert("error: " + error);
            });
    }

    handlePostDelete(postId, event) {
        event.preventDefault();
        console.log(`postId = ${postId}`);

        const url = `http://localhost:8080/posts?id=${postId}`;
        fetch(url, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.status === 200) {
                    setTimeout(function () {
                        alert("Post has beem deleted.");
                    }, 1);
                    const posts = Object.assign([], this.state.listOfPosts);
                    const filteredPost = posts.filter((post) => {
                        return post.id !== postId;
                    });
                    this.setState({ posts: filteredPost }); //replacing data
                } else {
                    alert(
                        `Ups, something went wrong with post deleting. ${response.status}`
                    );
                }
            })
            .catch((error) => console.log("error", error));
    }

    renderPosts() {
        const { posts } = this.state;

        return posts.map((post) => {
            const { id, body, createdAt, updatedAt, user } = post;
            const { username, first, last, imageUrl } = user;

            return (
                <Post
                    key={id}
                    postId={id}
                    postBody={body}
                    postUsername={username}
                    postOwnerName={`${first} ${last}`}
                    userAvatar={imageUrl}
                    createdAt={createdAt}
                    updatedAt={updatedAt}
                    handlePostUpdate={this.handlePostUpdate.bind(this, id)}
                    handlePostDelete={this.handlePostDelete.bind(this, id)}
                />
            );
        });
    }

    render() {
        return (
            <div>
                <PostAdd handlePostSubmit={this.handlePostSubmit.bind(this)} />
                {this.renderPosts()}{" "}
            </div>
        );
    }
}

export default PostGroup;
