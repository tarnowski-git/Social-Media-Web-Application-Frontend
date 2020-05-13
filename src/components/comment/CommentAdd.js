import React, { useState } from "react";

function CommentAdd(props) {
    const { handleCommentSubmit } = props;
    const [comment, setComment] = useState("");

    return (
        <div>
            <div className="add-comment">
                <div className="comment-header">
                    <strong>Comments</strong>
                </div>
                <div className="comment-body">
                    <textarea
                        className="form-control"
                        value={comment}
                        placeholder="Add a new comment"
                        onChange={(event) => setComment(event.target.value)}
                    ></textarea>
                </div>
                <button
                    className="btn-comment"
                    onClick={() => {
                        handleCommentSubmit(comment);
                        setComment("");
                    }}
                >
                    Comment
                </button>
            </div>
        </div>
    );
}

export default CommentAdd;
