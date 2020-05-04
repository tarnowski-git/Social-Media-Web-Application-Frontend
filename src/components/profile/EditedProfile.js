import React, { useState } from "react";

export default ({ changeToFalse }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const onSubmit = () => {
        const username = sessionStorage.getItem("username");
        console.log(firstName);
        console.log(lastName);

        const url = "http://localhost:8080/users?username=" + username;
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
            }),
        })
            .then((response) => {
                if (response.status === 200) {
                    setTimeout(function () {
                        alert("User updated.");
                    }, 1);
                    sessionStorage.setItem("currentUserFistName", firstName);
                    sessionStorage.setItem("currentUserLastName", lastName);
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

    return (
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
            <button onClick={onSubmit}>Submit</button>
        </div>
    );
};
