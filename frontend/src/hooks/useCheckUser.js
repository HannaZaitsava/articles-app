import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthDataInfo } from "../redux/slices/authDataSlice";

function useCheckUser(authUserId) {
    const dispatch = useDispatch();
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    const localStorageAuthData = localStorage.getItem("postsApp_rtk")
        ? JSON.parse(localStorage.getItem("postsApp_rtk"))
        : "";

    useEffect(() => {
        if (!localStorageAuthData?.authUserId && authUserId) {
            dispatch(setAuthDataInfo({ showAutoLogout: true }));
        }
        if (authUserId && localStorageAuthData?.authUserId === authUserId) {
            setUserLoggedIn(true);
        } else {
            setUserLoggedIn(false);
        }
    }, [authUserId, localStorageAuthData, dispatch]);
    return [userLoggedIn];
}
export default useCheckUser;
