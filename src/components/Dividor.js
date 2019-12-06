import React from "react";

const Dividor = props => {
    return (
        <div className="dividor">
            <span>{props.children || "Or"}</span>
        </div>
    );
};

export default Dividor;
