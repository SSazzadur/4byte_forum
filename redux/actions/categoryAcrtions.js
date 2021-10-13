import axios from "axios";
import * as types from "../types";

export const fetchCategories = async () => {
    let res = [];
    try {
        res = await axios.get("/api/categories");
    } catch (error) {}
    return {
        type: types.FETCH_CATEGORIES,
        payload: res.data,
    };
};

export const fetchCategoryThreads = async cat_id => {
    let res = {};
    try {
        res = await axios.get(`/api/categories/${cat_id}`);
    } catch (error) {}

    return {
        type: types.GET_CATEGORY_THREADS,
        payload: { category: res.data.category, threads: res.data.threads },
    };
};
