import React, { useRef } from "react";
import ReactDOM from "react-dom";
import useEscapeKey from "./../../../hooks/useEscapeKey";
import useOutsideClick from "./../../../hooks/useOutsideClick";
import classes from "./ModalWindow.module.css";

function PortalModalWindow({
    message,
    isOpen,
    setIsModalWindowOpen,
    children,
    domNodeContainer,
}) {
    const rootClasses = [classes.modalWindow];
    if (isOpen) rootClasses.push(classes.modalWindowActive);

    const ref = useRef(null);
    useOutsideClick(() => setIsModalWindowOpen(false), ref);
    useEscapeKey(() => setIsModalWindowOpen(false));

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div id="portalModalWindow" className={rootClasses.join(" ")}>
            <div
                id="portalModalWindowContainer"
                className={classes.modalWindowContainer}
                ref={ref}
            >
                {children}
            </div>
        </div>,
        domNodeContainer
    );
}

export default PortalModalWindow;
