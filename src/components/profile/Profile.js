import React, { Component } from "react";
import EditedProfile from "./EditedProfile";

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userFirst: "",
            userLast: "",
            picture: "",
            userDetail: [],
            editMode: false,
        };

        this.changeEditMode = this.changeEditMode.bind(this);
        this.changeDetails = this.changeDetails.bind(this);
    }

    componentDidMount() {
        const username = sessionStorage.getItem("username");
        const url = `http://localhost:8080/users/details/${username}`;
        fetch(url, {
            method: "GET",
        })
            .then((res) =>
                res.json().then((data) => ({ status: res.status, body: data }))
            )
            .then((obj) => {
                if (obj.status === 200) {
                    this.setState({ userDetail: obj.body });
                    this.setState({ userFirst: obj.body.user.first });
                    this.setState({ userLast: obj.body.user.last });
                    this.setState({ picture: obj.body.user.imageUrl });
                } else {
                    alert("Something went wrong!");
                }
            })
            .catch((err) => {
                console.error("Error: ", err);
            });
    }

    componentWillUnmount() {
        this.setState({ userDetail: [] });
        this.setState({ userFirst: "" });
        this.setState({ userLast: "" });
        this.setState({ picture: "" });
    }

    changeEditMode() {
        let newEditMode = !this.state.editMode;
        this.setState({ editMode: newEditMode });
    }

    changeDetails(first, last, pic) {
        if (pic === "") {
            pic = this.state.picture;
        }
        this.setState({ userFirst: first, userLast: last, picture: pic });
    }

    render() {
        const { age, city, country, description, sex } = this.state.userDetail;
        const { userFirst, userLast } = this.state;

        return (
            <div>
                {this.state.editMode ? (
                    <EditedProfile
                        changeToFalse={this.changeEditMode.bind(this)}
                        changeDetails={this.changeDetails.bind(this)}
                        currentAvatar={this.state.picture}
                    />
                ) : (
                    <div className="ProfilCard">
                        <img src={this.state.picture} alt={"profil-pic"} />
                        <h1>{`${userFirst} ${userLast}`}</h1>
                        <p className="title">{description}</p>
                        <p>
                            <i
                                className="fa fa-venus-mars"
                                aria-hidden="true"
                            ></i>{" "}
                            {sex === "F" ? "Female" : "Male"}
                        </p>
                        <p>
                            <i className="fa fa-clock-o" aria-hidden="true"></i>{" "}
                            {age}
                        </p>
                        <p>
                            <i
                                className="fa fa-map-marker"
                                aria-hidden="true"
                            ></i>{" "}
                            {city + ", " + country}
                        </p>
                        <button onClick={this.changeEditMode}>Edit</button>
                    </div>
                )}
            </div>
        );
    }
}

export default Profile;
