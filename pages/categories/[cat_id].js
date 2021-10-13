import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryThreads } from "../../redux/actions/categoryAcrtions";

import { Box } from "@mui/system";
import { Divider, Typography } from "@mui/material";
import ThreadForm from "../../components/thread/ThreadForm";
import Threads from "../../components/thread/Threads";

const category = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { cat_id } = router.query;

    useEffect(async () => {
        if (cat_id) dispatch(await fetchCategoryThreads(cat_id));
    }, [cat_id]);

    const { category } = useSelector(state => state.categoryReducers);
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
                    variant="h3"
                    component="div"
                    sx={{ textAlign: "center" }}
                >
                    {category.cat_name}
                </Typography>

                <Divider sx={{ marginBottom: "1rem" }} />

                <Typography variant="body1" component="div">
                    {category.cat_desc}
                </Typography>

                <Typography
                    variant="caption1"
                    component="div"
                    sx={{ textAlign: "right", marginTop: "1rem" }}
                >
                    Category created by:
                    <span style={{ fontWeight: "bolder" }}>
                        {category.user_name}
                    </span>
                </Typography>

                <Divider sx={{ marginBlock: "0.5rem" }} />
            </Box>

            {currentUser.isAuth ? (
                <>{category.cat_id && <ThreadForm cat_id={cat_id} />}</>
            ) : (
                <Typography variant="body1" component="div" color="teal">
                    You must be logged in to start a thread!
                </Typography>
            )}

            {category.threads && <Threads threads={category.threads} />}
        </div>
    );
};

export default category;
