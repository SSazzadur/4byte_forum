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

export const fetchThreadDetails = async thread_id => {
    let res = {};

    try {
        res = await axios.get(`/api/threads/${thread_id}`);
    } catch (error) {}

    return {
        type: types.GET_THREAD_DETAILS,
        payload: { thread: res.data.thread, comments: res.data.comments },
    };
};

export const openEdit = (comment_text, comment_id) => {
    return {
        type: types.OPEN_EDIT,
        payload: { comment_text, comment_id },
    };
};
export const closeEdit = () => {
    return {
        type: types.CLOSE_EDIT,
    };
};
export const clearCategoryThreads = () => {
    return {
        type: types.CLEAR_CATEGORY_THREADS,
    };
};
export const clearThreadDetails = () => {
    return {
        type: types.CLEAR_THREAD_DETAILS,
    };
};

export const clearCategories = () => {
    return {
        type: types.CLEAR_CATEGORIES,
    };
};
