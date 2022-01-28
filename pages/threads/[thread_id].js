import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchThreadDetails } from "../../redux/actions/dataActions";

import { Box } from "@mui/system";
import { Divider, Skeleton, Typography } from "@mui/material";

import CommentForm from "../../components/comment/CommentForm";
import Comments from "../../components/comment/Comments";
import Meta from "../../components/layout/Meta";

const Thread = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { thread_id } = router.query;

    useEffect(() => {
        const fetchThread = async () => {
            if (thread_id) dispatch(await fetchThreadDetails(thread_id));
        };

        fetchThread();
    }, [dispatch, thread_id]);

    const { thread } = useSelector(state => state.dataReducers);
    const { currentUser } = useSelector(state => state.userReducers);

    return (
        <div
            style={{
                paddingBottom: "2rem",
                maxWidth: "800px",
                margin: "0 auto",
            }}
        >
            {thread.thread_title && (
                <Meta title={thread.thread_title + " | 4BYTe Forum"} />
            )}
            <Box
                sx={{
                    width: "100%",
                    minHeight: "20vh",
                    marginBottom: "2rem",
                    padding: "2rem 1rem 1rem",
                    backgroundColor: "#eee",
                    borderRadius: "10px",
                    boxShadow: "0 10px 10px rgba(0,0,0,0.1)",
                }}
            >
                <Typography
                    variant="h5"
                    component="div"
                    sx={{ textAlign: "center" }}
                >
                    {thread.thread_title ? (
                        thread.thread_title
                    ) : (
                        <Skeleton animation="wave" />
                    )}
                </Typography>

                <Divider sx={{ margin: "0.5rem auto 1rem", width: "80%" }} />

                <Typography variant="body1" component="div">
                    {thread.thread_desc ? (
                        thread.thread_desc
                    ) : (
                        <>
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" width="80%" />
                        </>
                    )}
                </Typography>

                <Typography
                    variant="caption1"
                    component="div"
                    sx={{ textAlign: "right", marginTop: "1rem" }}
                >
                    {thread.user_name ? (
                        <>
                            Asked by:{" "}
                            <span style={{ fontWeight: "bolder" }}>
                                {thread.user_name}
                            </span>
                        </>
                    ) : (
                        <Skeleton animation="wave" />
                    )}
                </Typography>
            </Box>

            {currentUser.isAuth ? (
                <CommentForm thread_id={thread_id} />
            ) : (
                <Typography variant="body1" component="div" color="teal">
                    You must be logged in to post a comment!
                </Typography>
            )}

            {thread.comments ? (
                <Comments comments={thread.comments} />
            ) : (
                <LoadingComments />
            )}
        </div>
    );
};

export default Thread;

const LoadingComments = () => {
    return (
        <>
            <div style={{ display: "flex", marginTop: "2rem" }}>
                <Skeleton
                    animation="wave"
                    variant="circular"
                    width={45}
                    height={45}
                />
                <div style={{ width: "100%", margin: "0.5rem 1rem 0" }}>
                    <Skeleton
                        animation="wave"
                        height={12}
                        width="80%"
                        style={{ marginBottom: 6 }}
                    />
                    <Skeleton animation="wave" height={12} width="40%" />
                </div>
            </div>
            <div style={{ display: "flex", marginBlock: "1rem 2rem" }}>
                <Skeleton
                    animation="wave"
                    variant="circular"
                    width={45}
                    height={45}
                />
                <div style={{ width: "100%", margin: "0.5rem 1rem 0" }}>
                    <Skeleton
                        animation="wave"
                        height={12}
                        width="80%"
                        style={{ marginBottom: 6 }}
                    />
                    <Skeleton animation="wave" height={12} width="40%" />
                </div>
            </div>
        </>
    );
};
