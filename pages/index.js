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
import { fetchCategories } from "../redux/actions/categoryAcrtions";

export default function Home() {
    const dispatch = useDispatch();
    const { snackbar } = useSelector(state => state);
    const { currentUser, isFormCompleted } = useSelector(
        state => state.userReducers
    );
    const { categories } = useSelector(state => state.categoryReducers);

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
        <div>
            {currentUser.isAuth ? (
                <h1>Hello {currentUser.data.name}</h1>
            ) : (
                <h1>Hello NEXT</h1>
            )}

            <ul>
                {categories &&
                    categories.map(category => (
                        <li key={category.cat_id}>
                            {category.cat_name +
                                " -> added By " +
                                category.user_name}
                        </li>
                    ))}
            </ul>
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
