import React, { useState } from "react";

export default ({ changeToFalse, changeDetails, currentAvatar }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [selected, setSelected] = useState("");
    const [avatar, setAvatar] = useState("");

    const onSubmit = () => {
        const username = sessionStorage.getItem("username");
        if (firstName === "" || lastName === "") {
            setTimeout(function () {
                alert(
                    "Please complete all fields." + firstName + ", " + lastName
                );
            }, 1);
            return;
        }
        // if avatar didnt changed, then set previous imgage
        if (avatar === "") {
            setAvatar(currentAvatar);
        }

        const url = "http://localhost:8080/users/" + username;
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8", // Indicates the content
            },
            body: JSON.stringify({
                username: username,
                password: "",
                first: firstName,
                last: lastName,
                imageUrl: avatar,
            }),
        })
            .then((response) => {
                if (response.status === 200) {
                    // update profiles info
                    changeDetails(firstName, lastName, avatar);

                    setTimeout(function () {
                        alert("User updated.");
                    }, 1);
                } else if (response.status === 204) {
                    setTimeout(function () {
                        alert("No content.");
                    }, 1);
                } else {
                    alert("Ups, somethings went wrong :/");
                }
            })
            .catch((error) => {
                alert("error: " + error);
            });

        setFirstName("");
        setLastName("");
    };

    const handleUpload = () => {
        const image = selected;
        if (image === "") {
            setTimeout(function () {
                alert("Image is not selected!");
            }, 1);
            return;
        }

        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "socialmediaApp");
        data.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);

        const url = process.env.REACT_APP_CLOUD_API;
        fetch(url, {
            method: "POST",
            body: data,
        })
            .then((response) => response.json())
            .then((data) => {
                setAvatar(data.url);

                setTimeout(function () {
                    alert("Picture has been loaded.");
                }, 1);
            })
            .catch((error) => {
                alert("error: " + error);
            });
    };

    return (
        <div>
            <div className="ProfilCard">
                <button onClick={changeToFalse}>Go back</button>
                <input
                    type="text"
                    placeholder="first name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="last name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                />
                <div className="custom-file-upload">
                    <input
                        type="file"
                        onChange={(event) => setSelected(event.target.files[0])}
                    />
                    <button onClick={handleUpload}>Upload file</button>
                </div>
                <button onClick={onSubmit}>Submit</button>
            </div>
        </div>
    );
};
