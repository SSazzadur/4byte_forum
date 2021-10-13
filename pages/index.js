import { useSelector } from "react-redux";

import CategoriesSection from "../components/category/CategoriesSection";

export default function Home() {
    const { categories } = useSelector(state => state.categoryReducers);

    return <>{categories && <CategoriesSection categories={categories} />}</>;
}
