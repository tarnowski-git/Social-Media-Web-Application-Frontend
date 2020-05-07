import React from "react";
import { useParams } from "react-router-dom";
import "../Styles.css";

export default () => {
    // We can use the useParams hook here to access
    // the dynamic pieces of the URL
    const { userId } = useParams();

    return <div className="userprofile">{userId}</div>;
};
