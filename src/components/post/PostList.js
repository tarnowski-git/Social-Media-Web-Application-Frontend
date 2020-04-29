import React from "react";

function PostList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getAllThePosts = () => {
            if (sessionStorage.getItem("username") !== null) {
                const url = "http://localhost:8080/posts";
                fetch(url)
                    .then((response) => response.json()) // Transform the data into json
                    .then((data) => {
                        let post = data;
                        setPosts([post]);
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

export default PostList;
