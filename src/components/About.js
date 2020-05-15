import React from "react";
import PostGroup from "./post/PostGroup";
// import CommentGroup from "./comment/CommentGroup";

function About() {
    return (
        // "fragment" its a ghost DOM element
        <div>
            {/* <CommentGroup /> */}
            <PostGroup />
        </div>
    );
}

export default About;
