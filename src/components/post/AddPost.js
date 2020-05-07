import React, { Component } from "react";

export class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textareaValue: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addPost(username, post) {
        console.log(username);
        console.log(post);
        const url = "http://localhost:8080/posts";
        fetch(url, {
            method: "POST",
            redirect: "follow",
            headers: {
                "Content-Type": "application/json",
                username: username,
                Accept: "application/json",
            },
            body: post,
        })
            .then((response) =>
                response
                    .json()
                    .then((data) => ({ status: response.status, body: data }))
            )
            .then((obj) => {
                if (obj.status === 200) {
                    setTimeout(function () {
                        alert("Post added.");
                    }, 1);
                    this.props.onAddItem(obj.body);
                } else {
                    alert("Ups, somethings went wrong :/");
                }
                console.log(obj);
            })
            .catch((error) => {
                alert("error: " + error);
            });
        // cleaning a textarea
        this.setState({ textareaValue: "" });
    }

    handleChange = (event) => {
        // Its for prevent reloading the page.
        event.preventDefault();

        this.setState({
            textareaValue: event.target.value,
        });
    };

    handleSubmit = (event) => {
        // Its for prevent reloading the page.
        event.preventDefault();

        const post = this.state.textareaValue;
        const activeUser = sessionStorage.getItem("username");

        if (activeUser !== null) {
            this.addPost(activeUser, post);
        }
    };

    render() {
        return (
            <div className="AddPostForm">
                <h1 className="AddPostHeader">Add post</h1>
                <form onSubmit={this.handleSubmit}>
                    <textarea
                        rows={3}
                        cols={30}
                        value={this.state.textareaValue}
                        onChange={this.handleChange}
                        placeholder="write here..."
                        maxLength={120}
                    ></textarea>
                    <button type="submit" value="Submit">
                        Post
                    </button>
                </form>
            </div>
        );
    }
}

export default AddPost;
