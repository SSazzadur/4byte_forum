import React, { useEffect, useState } from "react";

import axios from "axios";

import {
    Button,
    CircularProgress,
    TextField,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import { Cancel, Done } from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { showSnackBar } from "../../redux/actions/snackBarActions";
import { closeEdit, fetchThreadDetails } from "../../redux/actions/dataActions";

const CommentForm = ({ thread_id }) => {
    const dispatch = useDispatch();
    const isMobile = useMediaQuery("(max-width:600px)");
    const { currentUser } = useSelector(state => state.userReducers);
    const { comment } = useSelector(state => state.dataReducers);

    const [commentText, setCommentText] = useState("");

    const [isSent, setIsSent] = useState(false);

    useEffect(() => {
        setCommentText(comment.text);
    }, [comment.edit]);

    const handleAddComment = async () => {
        if (!commentText) {
            const data = {
                open: true,
                message: "Please write a comment post...",
                variant: "warning",
            };
            dispatch(showSnackBar(data));
            return;
        }

        setIsSent(true);

        try {
            const comm = {
                commentText,
                thread_id,
                user_id: currentUser.data.id,
            };

            let response = {};
            if (comment.edit)
                response = await axios.put(`/api/comments/${comment.id}`, comm);
            else response = await axios.post("/api/comments", comm);

            if (response.data.status === "success") {
                const data = {
                    open: true,
                    message: response.data.message,
                    variant: response.data.status,
                };
                dispatch(showSnackBar(data));
                setIsSent(false);

                // clear form
                setCommentText("");

                if (comment.edit) dispatch(closeEdit());

                dispatch(await fetchThreadDetails(thread_id));
            } else {
                const data = {
                    open: true,
                    message: response.data.message,
                    variant: response.data.status,
                };
                dispatch(showSnackBar(data));
                setIsSent(false);
            }
        } catch (error) {
            const data = {
                open: true,
                message: "Something went wrong...",
                variant: "error",
            };
            dispatch(showSnackBar(data));
            setIsSent(false);
        }
    };

    return (
        <Box>
            <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                color="teal"
            >
                Post a comment
            </Typography>
            <Box
                component="form"
                sx={{
                    width: "100%",
                    "& > :not(style)": {
                        marginBlock: "0 0.5rem",
                    },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    label="Write a comment"
                    type="text"
                    variant="standard"
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    rows={3}
                    multiline
                    required
                    fullWidth
                />

                <Box
                    sx={{
                        display: "flex",
                        gap: "1rem",
                        flexWrap: "wrap",
                    }}
                >
                    <Box sx={{ position: "relative", width: "fit-content" }}>
                        <Button
                            variant="contained"
                            color="info"
                            endIcon={<Done />}
                            disabled={isSent}
                            onClick={handleAddComment}
                            sx={{ width: isMobile ? "100%" : "auto" }}
                        >
                            Post
                        </Button>
                        {isSent && (
                            <CircularProgress
                                size={24}
                                sx={{
                                    color: "green",
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    marginTop: "-12px",
                                    marginLeft: "-12px",
                                }}
                            />
                        )}
                    </Box>
                    {comment.edit && (
                        <Button
                            variant="contained"
                            color="warning"
                            endIcon={<Cancel />}
                            onClick={() => dispatch(closeEdit())}
                        >
                            Cancel
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default CommentForm;
