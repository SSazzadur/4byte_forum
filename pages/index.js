import { useSelector } from "react-redux";

import { Skeleton, Typography } from "@mui/material";
import CategoriesSection from "../components/category/CategoriesSection";
import { Box } from "@mui/system";

export default function Home() {
    const { categories } = useSelector(state => state.dataReducers);

    if (categories.length === 0) {
        return (
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(275px, 1fr))",
                    gap: "1rem",
                    marginBlock: "2rem",
                }}
            >
                <Box sx={{ my: 2 }}>
                    <Skeleton
                        animation="wave"
                        variant="rectangular"
                        height={150}
                    />

                    <Box sx={{ pt: 0.5 }}>
                        <Skeleton animation="wave" width="60%" />
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                    </Box>
                </Box>
                <Box sx={{ my: 2 }}>
                    <Skeleton
                        animation="wave"
                        variant="rectangular"
                        height={150}
                    />

                    <Box sx={{ pt: 0.5 }}>
                        <Skeleton animation="wave" width="60%" />
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                    </Box>
                </Box>
            </div>
        );
    }

    return (
        <>
            {categories[0].noresult ? (
                <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="div"
                    color="teal"
                    sx={{
                        display: "grid",
                        placeContent: "center",
                        paddingBlock: "5rem",
                    }}
                >
                    Be the first one to create a category!
                </Typography>
            ) : (
                <CategoriesSection categories={categories} />
            )}
        </>
    );
}
