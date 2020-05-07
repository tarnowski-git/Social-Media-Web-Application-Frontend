import React, { Component } from "react";
import EditedProfile from "./EditedProfile";

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userFist: "",
            userLast: "",
            selectedFile: "",
            picture: "",
            editMode: false,
        };

        this.changeEditMode = this.changeEditMode.bind(this);
        this.handleFileSelected = this.handleFileSelected.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    componentDidMount() {
        const username = sessionStorage.getItem("username");
        const url = "http://localhost:8080/users/details/" + username;
        fetch(url)
            .then((res) =>
                res.json().then((data) => ({ status: res.status, body: data }))
            )
            .then((obj) => {
                if (obj.status === 200) {
                    this.setState({ userFist: obj.body.user.first });
                    this.setState({ userLast: obj.body.user.last });
                    this.setState({ picture: obj.body.user.imageUrl });
                } else {
                    alert("Something went wrong!");
                }
                // code to handle the response
            })
            .catch((err) => {
                console.error("Error: ", err);
            });
    }

    handleUpload() {
        const image = this.state.selectedFile;
        if (image === "") {
            return;
        }

        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "socialmediaApp");
        data.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
        const url = process.env.REACT_APP_CLOUD_API;
        console.log(url);
        fetch(url, {
            method: "POST",
            body: data,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                this.setState({ picture: data.url });
            })
            .catch((error) => {
                alert("error: " + error);
            });
    }

    handleFileSelected(event) {
        this.setState({ selectedFile: event.target.files[0] });
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
                        <img src={this.state.picture} alt={"profil-pic"} />
                        <h1>
                            {this.state.userFist + " " + this.state.userLast}
                        </h1>
                        <p className="title">CEO Founder, Example</p>
                        <p>About Me</p>
                        <button onClick={this.changeEditMode}>Edit Name</button>
                        <input type="file" onChange={this.handleFileSelected} />
                        <button onClick={this.handleUpload}>Upload file</button>
                    </div>
                )}
            </div>
        );
    }
}

export default Profile;
