import React, { Component } from "react";
import Comment from "./Comment";
import CommentAdd from "./CommentAdd";
import "./Comment.css";

class CommentGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: [],
        };
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }

    componentDidMount() {
        const url = "http://localhost:8080/comments/all";
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
                        alert("Comments fetched");
                    }, 1);
                    this.setState({ comments: obj.body });
                } else {
                    alert("Sorry, something went wrong :/");
                }
            })
            .catch((error) => {
                alert("error: " + error);
            });
    }

    handleCommentSubmit(comment) {
        const userId = 4;
        const userName = "Ola";
        const postId = 90;
        const url = `http://localhost:8080/posts/${postId}/comments`;
        fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: {
                    id: userId,
                    username: userName,
                },
                content: comment,
            }),
        })
            .then((response) =>
                response
                    .json()
                    .then((data) => ({ status: response.status, body: data }))
            )
            .then((obj) => {
                if (obj.status === 200) {
                    setTimeout(function () {
                        alert("Comment Added");
                    }, 1);
                    let updatedArray = this.state.comments;
                    updatedArray.push(obj.body);
                    this.setState({ comments: updatedArray });
                } else {
                    alert("Sorry, something went wrong :/");
                }
            })
            .catch((error) => {
                alert("error: " + error);
            });
    }

    handleCommentDelete(commentId, event) {
        event.preventDefault();
        console.log(`${commentId}`);

        const postId = 90;
        const url = `http://localhost:8080/posts/${postId}/comments/${commentId}`;
        fetch(url, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.status === 200) {
                    setTimeout(function () {
                        alert("Comment has been deleted.");
                    }, 1);
                    const comments = Object.assign([], this.state.comments);
                    const filteredComments = comments.filter((comment) => {
                        return comment.id !== commentId;
                    });
                    this.setState({ comments: filteredComments }); //replacing data
                } else {
                    alert("Something went wrong with post deleting.");
                }
            })
            .catch((error) => console.log("error", error));
    }

    renderComments() {
        const { comments } = this.state;
        // const { postId } = this.props;

        return comments.map((comment) => {
            const { id, content, user, createdAt } = comment;
            const { first, last, imageUrl, username } = user;

            return (
                <Comment
                    key={id}
                    body={content}
                    name={first + " " + last}
                    img={imageUrl}
                    createdAt={createdAt}
                    commentUsername={username}
                    handleCommentDelete={this.handleCommentDelete.bind(
                        this,
                        id
                    )}
                />
            );
        });
    }

    render() {
        return (
            <div>
                {this.renderComments()}
                <CommentAdd handleCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
}

export default CommentGroup;
