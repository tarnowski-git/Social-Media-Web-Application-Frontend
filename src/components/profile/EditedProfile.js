import React, { useState } from "react";

export default ({ changeToFalse, changeDetails }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [selected, setSelected] = useState("");
    const [avatar, setAvatar] = useState("");

    const onSubmit = () => {
        // const username = sessionStorage.getItem("username");
        console.log(firstName);
        console.log(lastName);

        changeDetails(firstName, lastName, avatar);

        // const url = "http://localhost:8080/users?username=" + username;
        // fetch(url, {
        //     method: "PUT",
        //     headers: {
        //         "Content-type": "application/json; charset=UTF-8", // Indicates the content
        //     },
        //     body: JSON.stringify({
        //         username: username,
        //         password: "",
        //         first: firstName,
        //         last: lastName,
        //     }),
        // })
        //     .then((response) => {
        //         if (response.status === 200) {
        //             setTimeout(function () {
        //                 alert("User updated.");
        //             }, 1);
        //             sessionStorage.setItem("currentUserFistName", firstName);
        //             sessionStorage.setItem("currentUserLastName", lastName);
        //         } else if (response.status === 204) {
        //             setTimeout(function () {
        //                 alert("No content.");
        //             }, 1);
        //         } else {
        //             alert("Ups, somethings went wrong :/");
        //         }
        //     })
        //     .catch((error) => {
        //         alert("error: " + error);
        //     });

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
        console.log(url);
        fetch(url, {
            method: "POST",
            body: data,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setAvatar(data.url);

                setTimeout(function () {
                    alert("Picture has been uloaded.");
                }, 1);
            })
            .catch((error) => {
                alert("error: " + error);
            });
    };

    return (
        <div>
            <button onClick={changeToFalse}>Go back</button>
            <div className="ProfilCard">
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
