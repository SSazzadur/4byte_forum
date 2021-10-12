import React from "react";
import Nav from "../nav/Nav";

const Layout = ({ children }) => {
    return (
        <>
            <Nav />
            <div style={{ width: "90%", margin: "0 auto" }}>{children}</div>
        </>
    );
};

export default Layout;
