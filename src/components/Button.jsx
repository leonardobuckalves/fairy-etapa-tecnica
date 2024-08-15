import React from 'react';

const Button = ({ className, children, ...props }) => {
    return (
        <button
            className={`
                w-full py-2 px-4 bg-indigo-600
                text-white font-semibold rounded-md
                shadow-sm hover:bg-indigo-700 focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                ${className}
            `}
            type="submit"
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;