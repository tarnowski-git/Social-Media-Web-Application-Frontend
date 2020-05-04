import React, { Component } from "react";
import pic from "../../images/no-img.png";
import EditedProfile from "./EditedProfile";

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userFist: "",
            userLast: "",
            editMode: false,
        };

        this.changeEditMode = this.changeEditMode.bind(this);
    }

    componentDidMount() {
        // const username = sessionStorage.getItem("username");
        const first = sessionStorage.getItem("currentUserFistName");
        const last = sessionStorage.getItem("currentUserLastName");

        this.setState({ userFist: first });
        this.setState({ userLast: last });

        // if (username !== null) {
        //     const url = "http://localhost:8080/posts/all";
        // }
    }

    changeEditMode() {
        let newEditMode = !this.state.editMode;
        this.setState({ editMode: newEditMode });
    }

    render() {
        return (
            <div>
                {this.state.editMode ? (
                    <EditedProfile
                        changeToFalse={this.changeEditMode.bind(this)}
                    />
                ) : (
                    <div className="ProfilCard">
                        <img src={pic} alt={"pic"} />
                        <h1>
                            {this.state.userFist + " " + this.state.userLast}
                        </h1>
                        <p className="title">CEO Founder, Example</p>
                        <p>About Me</p>
                        <button onClick={this.changeEditMode}>Edit Name</button>
                    </div>
                )}
            </div>
        );
    }
}

export default Profile;
