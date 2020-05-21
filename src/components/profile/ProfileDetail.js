import React, { Component } from "react";
import "../Styles.css";

class ProfileDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: [],
            user: [],
        };
    }

    componentDidMount() {
        const username = this.props.match.params.username;
        const url = `http://localhost:8080/users/details/${username}`;
        fetch(url, {
            method: "GET",
        })
            .then((res) =>
                res.json().then((data) => ({ status: res.status, body: data }))
            )
            .then((obj) => {
                if (obj.status === 200) {
                    console.log(obj.body);
                    this.setState({ details: obj.body });
                    this.setState({ user: obj.body.user });
                } else {
                    alert("Something went wrong!");
                }
            })
            .catch((err) => {
                console.error("Error: ", err);
            });
    }

    render() {
        const { age, city, country, description, sex } = this.state.details;
        const { first, last, imageUrl } = this.state.user;

        return (
            <div className="ProfilCard">
                <img src={imageUrl} alt={"profil-pic"} />
                <h1>{`${first} ${last}`}</h1>
                <p className="title">{description}</p>
                <p>Sex: {sex === "F" ? "Female" : "Male"}</p>
                <p>Age: {age}</p>
                <p>From: {city + ", " + country}</p>
            </div>
        );
    }
}

export default ProfileDetail;
