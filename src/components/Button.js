import React from "react";

const Button = props => {
    const { type, onClick, className, children } = props;
    return (
        <button
            type={type || "button"}
            onClick={onClick || (e => null)}
            className={className}
        >
            {children}
        </button>
    );
};

export default Button;
