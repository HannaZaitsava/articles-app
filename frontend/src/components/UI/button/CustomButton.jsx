import React from "react";

const CustomButton = ({ children, ...props }) => {
    return (
        <button {...props} className={props.className}>
            {!!props.img && <div>{props.img}</div>}
            {children}
        </button>
    );
};

export default CustomButton;
