import React from "react";

const UserSection = ({ children }) => {
    return(
        <div className="flex flex-row grow items-center justify-between p-4 bg-white shadow-lg bg-gray-100">
            {children}
        </div>
    )
}

export default UserSection;