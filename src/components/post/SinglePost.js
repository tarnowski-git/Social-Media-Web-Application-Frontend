import React, { Component } from "react";
import avatar from "../../images/no-img.png";
import "../home/Home.css";

class SinglePost extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div>
                <div className="PostFrame">
                    <div className="avatar">
                        <img src={avatar} alt={"avatar"} />
                    </div>
                    <span className="name">
                        {this.props.post.user.username}
                    </span>
                    <span className="time">Time</span>
                    <p>{this.props.post.body}</p>
                </div>
            </div>
        );
    }
}

export default SinglePost;
