import React from "react";

export default function PostList() {
    useEffect(() => {
        const getAllThePosts = () => {
            if (sessionStorage.getItem("username") !== null) {
                const url = "http://localhost:8080/posts";
                fetch(url)
                    .then((response) => response.json()) // Transform the data into json
                    .then((data) => {
                        let post = data;
                        console.log(post);
                        this.setState({ post });
                    })
                    .catch((error) => {
                        alert("error" + error);
                    });
            } else {
                console.log("Not authorized");
            }
        };
        getAllThePosts();

        return () => {
            console.log("unmounting...");
        };
    }, []);

    return <div></div>;
}
