import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "../redux/actions/userActions";

import styles from "../styles/Home.module.css";

export default function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser());
    }, []);

    return (
        <div className={styles.container}>
            <h1>Hello NEXT</h1>
        </div>
    );
}
