import React from "react";

const TitleSection = ({ children }) => {
    return (
        <div className='flex flex-col items-center'>
            <h2 className="text-4xl font-bold text-gray-800 my-6">{children}</h2>
        </div>
    );
};

export default TitleSection;