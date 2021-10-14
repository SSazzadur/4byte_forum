import React from "react";

import { Typography } from "@mui/material";

import Comment from "./Comment";

const Comments = ({ comments }) => {
    return (
        <div style={{ marginTop: "2rem" }}>
            <Typography variant="h4" component="div">
                Comments
            </Typography>

            {comments.length === 0 && (
                <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    color="teal"
                >
                    Be the first one to post a comment!
                </Typography>
            )}

            {comments.map(comment => (
                <Comment key={comment.comm_id} comment={comment} />
            ))}
        </div>
    );
};

export default Comments;
