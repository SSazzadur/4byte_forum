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
