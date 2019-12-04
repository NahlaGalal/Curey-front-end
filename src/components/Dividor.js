import React from "react";
import "../sass/components/_dividor.scss";

const Dividor = props => {
    return (
        <div className="dividor">
            <span>{props.children || "Or"}</span>
        </div>
    );
};

export default Dividor;
