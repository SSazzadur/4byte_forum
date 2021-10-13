import React, { forwardRef } from "react";
import Nav from "../nav/Nav";

import { hideSnackBar } from "../../redux/actions/snackBarActions";

import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Layout = ({ children }) => {
    const dispatch = useDispatch();
    const { snackbar } = useSelector(state => state);
    return (
        <>
            <Nav />
            <div style={{ width: "90%", margin: "0 auto" }}>
                {children}
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
            </div>
        </>
    );
};

export default Layout;
