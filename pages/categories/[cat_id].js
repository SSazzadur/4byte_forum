import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryThreads } from "../../redux/actions/dataActions";

import { Box } from "@mui/system";
import { Divider, Skeleton, Typography } from "@mui/material";

import ThreadForm from "../../components/thread/ThreadForm";
import Threads from "../../components/thread/Threads";
import Meta from "../../components/layout/Meta";

const Category = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { cat_id } = router.query;

    useEffect(async () => {
        const fetchData = async () => {
            if (cat_id) dispatch(await fetchCategoryThreads(cat_id));
        };

        fetchData();
    }, [cat_id]);

    const { category } = useSelector(state => state.dataReducers);
    const { currentUser } = useSelector(state => state.userReducers);

    return (
        <div style={{ paddingBottom: "2rem" }}>
            {category.cat_name && (
                <Meta title={category.cat_name + " | 4BYTe Forum"} />
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
                    variant="h3"
                    component="div"
                    sx={{ textAlign: "center" }}
                >
                    {category.cat_name ? (
                        category.cat_name
                    ) : (
                        <Skeleton animation="wave" />
                    )}
                </Typography>

                <Divider sx={{ margin: "0.5rem auto 1rem", width: "80%" }} />

                <Typography variant="body1" component="div">
                    {category.cat_desc ? (
                        category.cat_desc
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
                    {category.user_name ? (
                        <>
                            Category created by:{" "}
                            <span style={{ fontWeight: "bolder" }}>
                                {category.user_name}
                            </span>
                        </>
                    ) : (
                        <Skeleton animation="wave" />
                    )}
                </Typography>
            </Box>

            {currentUser.isAuth ? (
                <ThreadForm cat_id={cat_id} />
            ) : (
                <Typography variant="body1" component="div" color="teal">
                    You must be logged in to start a thread!
                </Typography>
            )}

            {category.threads ? (
                <Threads threads={category.threads} />
            ) : (
                <LoadingThreads />
            )}
        </div>
    );
};

export default Category;

const LoadingThreads = () => {
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
