import React, { Fragment, useRef } from "react";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import useOutsideClick from "./../../../hooks/useOutsideClick";
import classes from "./NavBarAdditionalFunctions.module.css";
import { useLogOutMutation } from "../../../redux/api/authApi";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { setAuthDataInfo } from "../../../redux/slices/authDataSlice";

function NavBarAdditionalFunctions({
    isOpened,
    setOpen,
    navbarPosition,
    navbarOptions,
}) {
    const [logOut] = useLogOutMutation();
    const dropdownMenuRef = useRef(null);
    useOutsideClick(() => setOpen(false), dropdownMenuRef);
    //const state = useSelector((state) => state.authData);
    const { authUserId } = useSelector(
        (state) => state.authData
    );

    const handleLogout = () => {
        logOut({ setAuthDataInfo });
        setOpen(false);
        //console.log(state);
    };

    const dropDownMenuStyles = [classes.dropDownMenuOverlayBaseStyle];
    if (isOpened) dropDownMenuStyles.push(classes.dropDownMenuOverlayIsActive);

    return (
        <div
            id={
                navbarPosition === "top"
                    ? "navBarAdditionalFunctionsContainerTop"
                    : "navBarAdditionalFunctionsContainerBottom"
            }
            className={dropDownMenuStyles.join(" ")}
        >
            <Transition
                as={Fragment}
                show={Boolean(isOpened)}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <div
                    id="additionalFunctions"
                    className={
                        navbarPosition === "top"
                            ? classes.positionTopStyle
                            : classes.positionBottomStyle
                    }
                    ref={dropdownMenuRef}
                >
                    {navbarOptions.map((item) => {
                        return !item.authNeeded ||
                            (item.authNeeded && !!authUserId) ? (
                            <Link
                                to={item.href}
                                key={item.name}
                                className={classes.navBarLinks}
                            >
                                {item.name}
                            </Link>
                        ) : null;
                    })}

                    <hr className="border-t-[1px] border-gray-300"></hr>

                    <Link
                        onClick={handleLogout}
                        to="#"
                        className={classes.navBarLinks}
                    >
                        Log out
                    </Link>
                </div>
            </Transition>
        </div>
    );
}

export default NavBarAdditionalFunctions;
