import React, { useState } from "react";

import axios from "axios";

import {
    Button,
    CircularProgress,
    TextField,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import { Done } from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { showSnackBar } from "../../redux/actions/snackBarActions";
import { fetchThreadDetails } from "../../redux/actions/dataActions";

const CommentForm = ({ thread_id }) => {
    const dispatch = useDispatch();
    const isMobile = useMediaQuery("(max-width:600px)");
    const { currentUser, isFormCompleted } = useSelector(
        state => state.userReducers
    );

    const [comment, setComment] = useState("");

    const [isSent, setIsSent] = useState(false);

    const handleAddComment = async () => {
        if (!comment) {
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
                comment,
                thread_id,
                user_id: currentUser.data.id,
            };
            const response = await axios.post("/api/comments", comm);

            if (response.data.status === "success") {
                const data = {
                    open: true,
                    message: response.data.message,
                    variant: response.data.status,
                };
                dispatch(showSnackBar(data));
                setIsSent(false);

                // clear form
                setComment("");

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
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    rows={3}
                    multiline
                    required
                    fullWidth
                />

                <Box sx={{ position: "relative", width: "fit-content" }}>
                    <Button
                        variant="contained"
                        color="info"
                        endIcon={<Done />}
                        disabled={isSent}
                        onClick={handleAddComment}
                        sx={{ width: isMobile ? "100%" : "auto" }}
                    >
                        Submit
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
            </Box>
        </Box>
    );
};

export default CommentForm;
