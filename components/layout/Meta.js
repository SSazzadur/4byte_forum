import Head from "next/head";

const Meta = ({ title, keywords, description, author }) => {
    return (
        <Head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
            <meta name="keywords" content={keywords} />
            <meta name="description" content={description} />
            <meta name="author" content={author} />
            <link rel="icon" href="/favicon.ico" />
            <title>{title}</title>
        </Head>
    );
};

Meta.defaultProps = {
    title: "4BYTe Forum",
    keywords: "Forum. online forum, coding, programming, programming forum",
    description:
        "Forum to help you with your doubts. Ask your doubts by starting a thread, and let other solve your problem by commenting on your thread.",
    author: "4BYTe",
};
export default Meta;
