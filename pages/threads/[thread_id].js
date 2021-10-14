import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchThreadDetails } from "../../redux/actions/dataActions";

import { Box } from "@mui/system";
import { Divider, Typography } from "@mui/material";

import CommentForm from "../../components/comment/CommentForm";
import Comments from "../../components/comment/Comments";

const thread = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { thread_id } = router.query;

    useEffect(async () => {
        if (thread_id) dispatch(await fetchThreadDetails(thread_id));
    }, [thread_id]);

    const { thread } = useSelector(state => state.dataReducers);
    const { currentUser } = useSelector(state => state.userReducers);

    return (
        <div style={{ paddingBlock: "2rem" }}>
            <Box
                sx={{
                    width: "100%",
                    minHeight: "20vh",
                    marginBottom: "2rem",
                }}
            >
                <Typography
                    variant="h4"
                    component="div"
                    sx={{ textAlign: "center" }}
                >
                    {thread.thread_title}
                </Typography>

                <Divider sx={{ marginBottom: "1rem" }} />

                <Typography variant="body1" component="div">
                    {thread.thread_desc}
                </Typography>

                <Typography
                    variant="caption1"
                    component="div"
                    sx={{ textAlign: "right", marginTop: "1rem" }}
                >
                    Asked by:{" "}
                    <span style={{ fontWeight: "bolder" }}>
                        {thread.user_name}
                    </span>
                </Typography>

                <Divider sx={{ marginBlock: "0.5rem" }} />
            </Box>

            {currentUser.isAuth ? (
                <CommentForm thread_id={thread_id} />
            ) : (
                <Typography variant="body1" component="div" color="teal">
                    You must be logged in to post a comment!
                </Typography>
            )}

            {thread.comments && <Comments comments={thread.comments} />}
        </div>
    );
};

export default thread;
