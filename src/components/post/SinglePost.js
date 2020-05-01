import React, { Component } from "react";
import avatar from "../../images/no-img.png";
import "../home/Home.css";

class SinglePost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            onlyReadMode: true,
            textareaValue: "",
        };

        this.onEditMode = this.onEditMode.bind(this);
        this.onSaveChanges = this.onSaveChanges.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({ textareaValue: this.props.children });
    }

    onEditMode(event) {
        console.log("edit mode: " + this.state.onlyReadMode);
        event.preventDefault();
        this.setState({ onlyReadMode: false });
    }

    onSaveChanges(event) {
        console.log("edit mode: " + this.state.onlyReadMode);
        event.preventDefault();
        this.setState({ onlyReadMode: true });
        this.props.updateEvent(this.state.textareaValue);
    }

    handleChange(event) {
        // Its for prevent reloading the page.
        event.preventDefault();

        this.setState({
            textareaValue: event.target.value,
        });
    }

    render() {
        const currentUser = sessionStorage.getItem("username");

        return (
            <div className="PostFrame">
                <div className="TopBar">
                    <div className="avatar">
                        <img src={avatar} alt={"avatar"} />
                    </div>
                    <div className="name-time">
                        <span className="name">{this.props.postOwnerName}</span>
                        <span className="time">Time {this.props.postId}</span>
                    </div>
                    {this.props.postOwnerName === currentUser && (
                        <div className="dropdown">
                            <button className="dropbtn">...</button>
                            <div className="dropdown-content">
                                <a href="/home" onClick={this.onEditMode}>
                                    Edit
                                </a>
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
                    className="bodyPost"
                    value={this.state.textareaValue}
                    readOnly={this.state.onlyReadMode}
                    onChange={this.handleChange}
                />
                {this.state.onlyReadMode === false && (
                    <button onClick={this.onSaveChanges}>Save</button>
                )}
            </div>
        );
    }
}

export default SinglePost;
