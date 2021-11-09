import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { checkUserAuth } from "../../redux/actions/userActions";
import { fetchCategories } from "../../redux/actions/dataActions";

import SnackBar from "../alert/SnackBar";
import Nav from "../nav/Nav";
import Meta from "./Meta";

const Layout = ({ children }) => {
    const dispatch = useDispatch();
    const { isFormCompleted } = useSelector(state => state.userReducers);

    useEffect(() => {
        const asyncFunc = async () => {
            if (localStorage.getItem("token") !== null) {
                const token = localStorage.getItem("token");
                dispatch(await checkUserAuth(token));
            } else {
                dispatch(await checkUserAuth(""));
            }

            dispatch(await fetchCategories());
        };

        asyncFunc();
    }, [isFormCompleted]);

    return (
        <>
            <Meta />
            <Nav />
            <div style={{ width: "90%", margin: "0 auto" }}>
                {children}
                <SnackBar />
            </div>
        </>
    );
};

export default Layout;
