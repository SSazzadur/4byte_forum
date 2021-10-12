import { useEffect, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { checkUserAuth } from "../redux/actions/userActions";
import { hideSnackBar } from "../redux/actions/snackBarActions";

import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

import styles from "../styles/Home.module.css";

export default function Home() {
    const dispatch = useDispatch();
    const { snackbar } = useSelector(state => state);
    const { currentUser, isFormCompleted } = useSelector(
        state => state.userReducers
    );

    useEffect(async () => {
        if (localStorage.getItem("token") !== null) {
            const token = localStorage.getItem("token");
            dispatch(await checkUserAuth(token));
        } else {
            dispatch(await checkUserAuth(""));
        }
    }, [isFormCompleted]);

    return (
        <div>
            {currentUser.isAuth ? (
                <h1>Hello {currentUser.data.name}</h1>
            ) : (
                <h1>Hello NEXT</h1>
            )}
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
    );
}
