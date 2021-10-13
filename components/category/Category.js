import Link from "next/link";
import React from "react";

import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardActionArea,
} from "@mui/material";

const Category = ({ category }) => {
    return (
        <Link href="/categories/[cat_id]" as={`/categories/${category.cat_id}`}>
            <CardActionArea>
                <Card sx={{ height: "100%" }}>
                    <CardMedia
                        component="img"
                        height="150"
                        image={`https://source.unsplash.com/400x300/?coding,${category.cat_name}`}
                        alt={category.cat_name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {category.cat_name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {category.cat_desc}
                        </Typography>
                    </CardContent>
                </Card>
            </CardActionArea>
        </Link>
    );
};

export default Category;
