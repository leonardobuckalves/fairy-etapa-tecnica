import React from 'react';

const Button = ({ className, children, ...props }) => {
    return (
        <button
            className={`
                w-full py-2 px-4 bg-lime-500
                text-white font-semibold rounded-md
                shadow-sm hover:bg-lime-700 focus:outline-none
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