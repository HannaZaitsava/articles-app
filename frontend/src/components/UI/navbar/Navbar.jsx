import { React, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MenuOptionsButton from "../button/MenuOptionsButton";
import CreateNewPostButton from "../button/CreateNewPostButton";
import navigationOptions from './../../consts/navigation/navigationOptions';
import { useLocation } from "react-router-dom";
import classes from "./Navbar.module.css";
import NavBarAdditionalFunctions from "./NavBarAdditionalFunctions";
//import ModalWindow from "../modalWindow/ModalWindow";
import PostForm from "../../model/posts/PostForm";
import PortalModalWindow from "../modalWindow/PortalModalWindow";
// import { Ripple, initTE } from "tw-elements";
import { useSelector } from "react-redux/es/hooks/useSelector";
import useCheckUser from './../../../hooks/useCheckUser';
import useOutsideClick from './../../../hooks/useOutsideClick';
import useEscapeKey from './../../../hooks/useEscapeKey';

const Navbar = ({ id }) => {

    const { authUserId } = useSelector((state) => state.authData);
    const [userLoggedIn] = useCheckUser(authUserId);

    const location = useLocation();

    const [isDropdownMenuOpened, setIsDropdownMenuOpeneded] = useState(false);
    const [isModalWindowOpen, setIsModalWindowOpen] = useState(false);

    const dropdownMenuRef = useRef(null);
    useOutsideClick(() => setIsDropdownMenuOpeneded(false), dropdownMenuRef);
    useEscapeKey(() => setIsDropdownMenuOpeneded(false));

    return (
        <div className="relative">
            <PortalModalWindow
                isOpen={isModalWindowOpen}
                setIsModalWindowOpen={setIsModalWindowOpen}
                domNodeContainer={document.body}
            >
                <PostForm
                    setIsModalWindowOpen={setIsModalWindowOpen}
                    postDefaultValues={{}}
                ></PostForm>
            </PortalModalWindow>

            <div className={classes.navbar}>
                <div className={classes.navbar_links}>
                    {/* left part */}
                    {navigationOptions.map((item) => {
                        return (!item.authNeeded ||
                            //(item.authNeeded && !!authUser)) &&
                            (item.authNeeded && userLoggedIn)) &&
                            item.showInMainNavbar ? (
                            <Link
                                to={item.href}
                                key={item.name}
                                className={classes.navbar_element}
                                data-te-toggle="tooltip"
                                data-te-placement="bottom"
                                data-te-ripple-init
                                data-te-ripple-color="light"
                                title={item.tooltipTitle}
                            >
                                {!!item.imgSource ? (
                                    <item.imgSource className="h-6 w-6" />
                                ) : (
                                    item.name
                                )}
                            </Link>
                        ) : null;
                    })}
                </div>

                {/* right part */}
                <div className={`${classes.navbar_links}`}>
                    {/* {!!authUser ? ( */}
                    {userLoggedIn ? (
                        <div
                            data-te-toggle="tooltip"
                            data-te-placement="bottom"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            title="Create new article"
                        >
                            <CreateNewPostButton
                                className={classes.navbar_element}
                                onClickHandler={() =>
                                    setIsModalWindowOpen(true)
                                }
                            ></CreateNewPostButton>
                        </div>
                    ) : null}

                    {/* {!!authUser ? ( */}
                    {userLoggedIn ? (
                        <div
                            data-te-toggle="tooltip"
                            data-te-placement="bottom"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            title="Menu"
                        >
                            <MenuOptionsButton
                                open={isDropdownMenuOpened}
                                setOpen={setIsDropdownMenuOpeneded}
                                className={classes.navbar_element}
                            ></MenuOptionsButton>
                        </div>
                    ) : (
                        <Link
                            to="/auth/login"
                            state={{ from: location }}
                            className={`${classes.navbar_element} hover:underline font-semibold`}
                        >
                            Log In
                        </Link>
                    )}
                </div>
            </div>

            {/* <div id="navBarAdditionalFunctionsContainer" ref={dropdownMenuRef} className="hidden fixed inset-0 bg-gray-800 bg-opacity-70 pointer-events-none z-10 w-screen h-screen "></div> */}

            <NavBarAdditionalFunctions
                isOpened={isDropdownMenuOpened}
                setOpen={setIsDropdownMenuOpeneded}
                navbarPosition={id}
                navbarOptions={navigationOptions.filter(
                    (item) => !item.showInMainNavbar
                )}
            ></NavBarAdditionalFunctions>
        </div>
    );
};

export default Navbar;
