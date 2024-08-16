import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Container = ({ className, children }) => {
    return (
        <div className={`flex flex-col h-svh w-screen bg-zinc-200 ${className}`}>
            <Header />
            {children}
            {/* <Footer /> */}
        </div>
    );
};

export default Container;