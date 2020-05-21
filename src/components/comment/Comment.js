import React, { Component } from "react";
import { Link } from "react-router-dom";

class Comment extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
    }

    diffTime(date) {
        const pastDate = new Date(date);
        const delta = Math.round((+new Date() - pastDate) / 1000);

        const minute = 60,
            hour = minute * 60,
            day = hour * 24;
        // week = day * 7;

        var fuzzy;

        if (delta < 30) {
            fuzzy = "Just then.";
        } else if (delta < minute) {
            fuzzy = delta + "Seconds ago.";
        } else if (delta < 2 * minute) {
            fuzzy = "A minute ago.";
        } else if (delta < hour) {
            fuzzy = Math.floor(delta / minute) + " minutes ago.";
        } else if (Math.floor(delta / hour) === 1) {
            fuzzy = "1 hour ago.";
        } else if (delta < day) {
            fuzzy = Math.floor(delta / hour) + " hours ago.";
        } else if (delta < day * 2) {
            fuzzy = "Yesterday.";
        } else {
            fuzzy = Math.floor(delta / day) + " days ago.";
        }
        return fuzzy;
    }

    render() {
        const { body, name, img, createdAt, commentUsername } = this.props;

        const { handleCommentDelete } = this.props;

        const currentUser = sessionStorage.getItem("username");

        return (
            <div className="comment-box">
                <div className="comment-avatar">
                    <img src={img} alt={"Avatar"} />
                </div>
                <div className="TopBar-comment">
                    <div className="comment-info-1">
                        <strong>
                            <Link to={`/home/${commentUsername}`}>{name}</Link>
                        </strong>
                        <p>{this.diffTime(createdAt)}</p>
                    </div>
                    {commentUsername === currentUser && (
                        <div className="dropdown">
                            <button className="dropbtn">...</button>
                            <div className="dropdown-content">
                                <a href="/home" onClick={handleCommentDelete}>
                                    Delete
                                </a>
                            </div>
                        </div>
                    )}
                    <div className="comment-info-2">
                        <p>{body}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Comment;
