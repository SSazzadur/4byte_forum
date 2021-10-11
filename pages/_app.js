import Layout from "../components/layout/Layout";
import { store } from "../redux/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default store.withRedux(MyApp);
