import React from "react";

const Container = ({ className, children }) => {
    return (
        <div className={`flex flex-col h-svh w-screen ${className}`}>
            {children}
        </div>
    );
};

export default Container;