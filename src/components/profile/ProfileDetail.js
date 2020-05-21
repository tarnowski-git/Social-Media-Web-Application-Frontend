import React, { Component } from "react";
import "../Styles.css";
import "font-awesome/css/font-awesome.min.css";

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
                <h4>
                    <span>
                        <i className="fa fa-venus-mars" aria-hidden="true"></i>
                        {sex === "F" ? " Female" : " Male"}
                    </span>
                    <span>
                        <i className="fa fa-clock-o" aria-hidden="true"></i>
                        {` ${age}`}
                    </span>
                    <span>
                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                        {` ${city}, ${country}`}
                    </span>
                </h4>
                <h2 className="title">About Me</h2>
                <p>{description}</p>
            </div>
        );
    }
}

export default ProfileDetail;
