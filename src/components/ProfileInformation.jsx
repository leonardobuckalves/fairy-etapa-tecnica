import React from "react";

const ProfileInformation = ({ children }) => {
    return(
    <div className="flex flex-col justify-evenly h-full mx-4 basis-1/2">
        {children}
    </div>
    )
}

export default ProfileInformation;