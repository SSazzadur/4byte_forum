import React, { forwardRef, useEffect } from "react";
import Nav from "../nav/Nav";

import { useDispatch, useSelector } from "react-redux";
import { checkUserAuth } from "../../redux/actions/userActions";
import { fetchCategories } from "../../redux/actions/dataActions";
import { hideSnackBar } from "../../redux/actions/snackBarActions";

import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Layout = ({ children }) => {
    const dispatch = useDispatch();
    const { snackbar } = useSelector(state => state);
    const { isFormCompleted } = useSelector(state => state.userReducers);

    useEffect(async () => {
        if (localStorage.getItem("token") !== null) {
            const token = localStorage.getItem("token");
            dispatch(await checkUserAuth(token));
        } else {
            dispatch(await checkUserAuth(""));
        }

        dispatch(await fetchCategories());
    }, [isFormCompleted]);

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
