import * as types from "../types";

export const showSnackBar = data => ({
    type: types.SHOW_SNACKBAR,
    payload: {
        open: data.open,
        message: data.message,
        variant: data.variant,
    },
});

export const hideSnackBar = () => ({
    type: types.HIDE_SNACKBAR,
});
