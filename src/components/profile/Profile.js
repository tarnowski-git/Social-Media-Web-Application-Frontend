import React, { Component } from "react";
import pic from "../../images/no-img.png";

class Profile extends Component {
    render() {
        return (
            <div>
                <div className="ProfilCard">
                    <img src={pic} alt={"pic"} />
                    <h1>John Doe</h1>
                    <p className="title">CEO Founder, Example</p>
                    <p>Harvard University</p>
                </div>
            </div>
        );
    }
}

export default Profile;
