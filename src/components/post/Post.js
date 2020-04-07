import React, { Component } from "react";

class Post extends Component {
    render() {
        return (
            <div>
                <p>-----------------------</p>
                {/* <p>{JSON.stringify(this.props.post)}</p> */}
                <p>{this.props.post.user.username}</p>
                <p>{this.props.post.body}</p>
            </div>
        );
    }
}

export default Post;
