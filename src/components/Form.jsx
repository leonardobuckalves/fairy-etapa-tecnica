import React from "react";

const Form = ({ onSubmit, children, ...props }) => {
    return (
        <form
            onSubmit={onSubmit}
            className="flex flex-col space-y-4"
            {...props}
        >
            {children}
        </form>
    );
};

export default Form;