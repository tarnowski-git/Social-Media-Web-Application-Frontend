import React, { Component } from "react";
import avatar from "../../images/no-img.png";
import "../home/Home.css";

class SinglePost extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        const currentUser = sessionStorage.getItem("username");

        return (
            <div>
                <div className="PostFrame">
                    <div className="TopBar">
                        <div className="avatar">
                            <img src={avatar} alt={"avatar"} />
                        </div>
                        <div className="name-time">
                            <span className="name">
                                {this.props.postOwnerName}
                                {this.props.postId}
                            </span>
                            <span className="time">Time</span>
                        </div>

                        {this.props.postOwnerName === currentUser && (
                            <div className="dropdown">
                                <button className="dropbtn">...</button>
                                <div className="dropdown-content">
                                    <a href="/home">Edit</a>
                                    <a
                                        href="/home"
                                        onClick={this.props.deleteEvent}
                                    >
                                        Delete
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                    <textarea
                        value={this.props.children}
                        readOnly={true}
                        className="bodyPost"
                    />
                </div>
            </div>
        );
    }
}

export default SinglePost;
