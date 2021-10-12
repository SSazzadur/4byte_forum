import axios from "axios";
import * as types from "../types";

export const checkUserAuth = async token => {
    let res = [];
    try {
        res = await axios.get("/api/user/userauth", {
            headers: {
                Authorization: token,
            },
        });
    } catch (error) {}

    return {
        type: types.CHECK_USER_AUTH,
        payload: res.data,
    };
};

export const checkIsFormCompleted = data => {
    return {
        type: types.IS_FORM_COMPLETED,
        payload: data,
    };
};
