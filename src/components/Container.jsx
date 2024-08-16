import React from "react";
import Header from "./Header";

const Container = ({ className, children }) => {
    return (
        <div className={`flex flex-col h-svh w-screen bg-zinc-200 ${className}`}>
            <Header />
            {children}
        </div>
    );
};

export default Container;