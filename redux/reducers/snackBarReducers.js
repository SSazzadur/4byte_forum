import * as types from "../types";

const initState = {
    open: false,
    message: "",
    variant: "",
};

const snackBarReducers = (state = initState, action) => {
    switch (action.type) {
        case types.SHOW_SNACKBAR:
            return {
                ...state,
                open: action.payload.open,
                message: action.payload.message,
                variant: action.payload.variant,
            };
        case types.HIDE_SNACKBAR:
            return {
                ...state,
                open: false,
            };
        default:
            return state;
    }
};

export default snackBarReducers;
