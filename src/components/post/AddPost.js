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

        console.log(this.state.textareaValue);
        // for funtion to
    };

    render() {
        return (
            <div>
                <p>Your post...</p>
                <form>
                    <textarea
                        rows={10}
                        cols={30}
                        value={this.state.textareaValue}
                        onChange={this.handleChange}
                    ></textarea>
                </form>
                <input type="submit" value="Post" />
            </div>
        );
    }
}

export default AddPost;
