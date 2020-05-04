import React, { Component } from "react";
import avatar from "../../images/no-img.png";
import "../home/Home.css";

class SinglePost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            onlyReadMode: true,
            textareaValue: "",
            created: "",
            edited: "",
        };

        this.onEditMode = this.onEditMode.bind(this);
        this.onSaveChanges = this.onSaveChanges.bind(this);
        this.onCancelChanges = this.onCancelChanges.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.diffTime = this.diffTime.bind(this);
        this.isPostUpdated = this.isPostUpdated.bind(this);
    }

    componentDidMount() {
        this.setState({ textareaValue: this.props.children });
        this.isPostUpdated(this.props.createdAt, this.props.updatedAt);
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

    isPostUpdated(createdAt, updatedAt) {
        if (createdAt === updatedAt) {
            this.setState({ edited: "" });
        } else {
            this.setState({ edited: " (edited)" });
        }
    }

    onEditMode(event) {
        event.preventDefault();
        this.setState({ onlyReadMode: false });
    }

    onSaveChanges(event) {
        event.preventDefault();
        this.setState({ onlyReadMode: true });
        this.setState({ edited: "(edited)" });
        this.props.updateEvent(this.state.textareaValue);
    }

    onCancelChanges(event) {
        event.preventDefault();
        this.setState({ onlyReadMode: true });
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
                        <span className="time">
                            {this.diffTime(this.props.createdAt) +
                                " " +
                                this.state.edited}
                        </span>
                    </div>
                    {this.props.postUsername === currentUser && (
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
                    <React.Fragment>
                        <button onClick={this.onSaveChanges}>Save</button>
                        <button onClick={this.onCancelChanges}>Cancel</button>
                    </React.Fragment>
                )}
            </div>
        );
    }
}

export default SinglePost;
