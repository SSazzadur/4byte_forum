import React, { forwardRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { hideSnackBar } from "../../redux/actions/snackBarActions";

import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBar = () => {
    const dispatch = useDispatch();
    const { snackbar } = useSelector(state => state);

    return (
        <Snackbar
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={() => dispatch(hideSnackBar())}
        >
            <Alert
                onClose={() => dispatch(hideSnackBar())}
                severity={snackbar.variant}
                sx={{ width: "100%" }}
            >
                {snackbar.message}
            </Alert>
        </Snackbar>
    );
};

export default SnackBar;
