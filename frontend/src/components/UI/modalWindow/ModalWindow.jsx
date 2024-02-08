import React, { useRef } from "react";
import classes from "./ModalWindow.module.css";
import useOutsideClick from "./../../../hooks/useOutsideClick";
import useEscapeKey from "./../../../hooks/useEscapeKey";

function ModalWindow({ children, isOpen, setIsModalWindowOpen }) {
    const rootClasses = [classes.modalWindow];
    if (isOpen) rootClasses.push(classes.modalWindowActive);
    useEscapeKey(() => setIsModalWindowOpen(false));
    const ref = useRef(null);
    useOutsideClick(() => setIsModalWindowOpen(false), ref);

    return (
        <div id="modalWindow" className={rootClasses.join(" ")}>
            <div
                id="modalWindowContainer"
                className={classes.modalWindowContainer}
                ref={ref}
            >
                {children}
            </div>
        </div>
    );
}

export default ModalWindow;
