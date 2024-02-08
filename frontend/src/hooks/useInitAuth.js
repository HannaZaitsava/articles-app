import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLogInMutation } from "../redux/api/authApi";
import { setAuthDataInfo } from "../redux/slices/authDataSlice";

function useInitAuth() {
    const dispatch = useDispatch();
    const [logIn] = useLogInMutation();
    //   const { token, authUserId, userName, email } = localStorage.getItem(
    //     "postsApp_rtk"
    //   )

    const { token, authUserId } = localStorage.getItem("postsApp_rtk")
        ? JSON.parse(localStorage.getItem("postsApp_rtk"))
        : "";

    useEffect(() => {
        if (authUserId) {
            dispatch(
                setAuthDataInfo({
                    //signedIn: true,
                    token: token,
                    authUserId: authUserId,
                    //   email,
                    //   userName,
                    // showError: false,
                    // errorMessage: null,
                    registerStatus: true,
                    registerError: "",
                    loginStatus: true,
                    loginError: "",
                })
            );
        } else {
            logIn({ setAuthDataInfo, initialRender: true });
        }
    }, [dispatch, logIn, token, authUserId]); //[dispatch, logIn, token, authUserId, email, userName]);
}

export default useInitAuth;
