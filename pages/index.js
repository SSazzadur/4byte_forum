import { useSelector } from "react-redux";

import { Typography } from "@mui/material";
import CategoriesSection from "../components/category/CategoriesSection";

export default function Home() {
    const { categories } = useSelector(state => state.dataReducers);

    return (
        <>
            {categories.length === 0 ? (
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
