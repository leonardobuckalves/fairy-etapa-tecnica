import React from 'react';

const Input = ({ ...props }) => {
    return (
        <input
            className="
                mt-1 block w-full p-2 border
                border-gray-300 rounded-md shadow-sm
                focus:ring-indigo-500 focus:border-indigo-500
            "
            {...props}
        />
    );
};

export default Input;