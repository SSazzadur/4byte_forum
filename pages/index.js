import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { checkUserAuth } from "../redux/actions/userActions";
import { fetchCategories } from "../redux/actions/categoryAcrtions";

import CategoriesSection from "../components/category/CategoriesSection";

export default function Home() {
    const dispatch = useDispatch();
    const { isFormCompleted } = useSelector(state => state.userReducers);
    const { categories } = useSelector(state => state.categoryReducers);

    useEffect(async () => {
        if (localStorage.getItem("token") !== null) {
            const token = localStorage.getItem("token");
            dispatch(await checkUserAuth(token));
        } else {
            dispatch(await checkUserAuth(""));
        }

        dispatch(await fetchCategories());
    }, [isFormCompleted]);

    return <>{categories && <CategoriesSection categories={categories} />}</>;
}
