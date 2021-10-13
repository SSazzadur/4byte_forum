import React from "react";
import Category from "./Category";

const CategoriesSection = ({ categories }) => {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(275px, 1fr))",
                gap: "1rem",
                marginBlock: "2rem",
            }}
        >
            {categories.map(category => (
                <Category category={category} key={category.cat_id} />
            ))}
        </div>
    );
};

export default CategoriesSection;
