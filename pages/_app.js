import { store } from "../redux/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default store.withRedux(MyApp);
