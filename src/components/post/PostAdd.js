import React, { Component } from "react";

class PostAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textareaValue: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        // Its for prevent reloading the page.
        event.preventDefault();

        this.setState({
            textareaValue: event.target.value,
        });
    }

    handleSubmit(event) {
        // Its for prevent reloading the page.
        event.preventDefault();

        this.props.handlePostSubmit(this.state.textareaValue);
        this.setState({
            textareaValue: "",
        });
    }

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

export default PostAdd;
