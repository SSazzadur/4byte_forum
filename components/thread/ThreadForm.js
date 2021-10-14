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
import { fetchCategoryThreads } from "../../redux/actions/dataActions";

const ThreadForm = ({ cat_id }) => {
    const dispatch = useDispatch();
    const isMobile = useMediaQuery("(max-width:600px)");
    const { currentUser } = useSelector(state => state.userReducers);

    const [threadTitle, setThreadTitle] = useState("");
    const [threadDesc, setThreadDesc] = useState("");

    const [isSent, setIsSent] = useState(false);

    const handleAddThread = async () => {
        if (!threadTitle || !threadDesc) {
            const data = {
                open: true,
                message: "Please fill all the fields...",
                variant: "warning",
            };
            dispatch(showSnackBar(data));
            return;
        }

        setIsSent(true);
        try {
            const thread = {
                thread_title: threadTitle,
                thread_desc: threadDesc,
                cat_id: cat_id,
                user_id: currentUser.data.id,
            };
            const response = await axios.post("/api/threads", thread);

            if (response.data.status === "success") {
                const data = {
                    open: true,
                    message: response.data.message,
                    variant: response.data.status,
                };
                dispatch(showSnackBar(data));
                setIsSent(false);

                // clear form
                setThreadTitle("");
                setThreadDesc("");

                dispatch(await fetchCategoryThreads(cat_id));
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
                Start a new thread
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
                    label="Thread Title"
                    type="text"
                    variant="standard"
                    value={threadTitle}
                    onChange={e => setThreadTitle(e.target.value)}
                    required
                    fullWidth
                />
                <TextField
                    label="Thread Description"
                    type="text"
                    variant="standard"
                    value={threadDesc}
                    onChange={e => setThreadDesc(e.target.value)}
                    rows={4}
                    multiline
                    required
                    fullWidth
                />

                <Box sx={{ position: "relative" }}>
                    <Button
                        variant="contained"
                        color="info"
                        endIcon={<Done />}
                        disabled={isSent}
                        onClick={handleAddThread}
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

export default ThreadForm;
