import { React, useEffect, useState } from "react";
//import { Link } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRegisterUserMutation } from "../redux/api/authApi";
import { useNavigate } from "react-router-dom";
//import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { setAuthDataInfo } from "../redux/slices/authDataSlice";
import PortalModalWindow from "./../components/UI/modalWindow/PortalModalWindow";
import Loader from "./../components/UI/loader/Loader";
import CustomInput from "./../components/UI/input/CustomInput";
import CustomButton from "./../components/UI/button/CustomButton";

const schema = yup.object().shape({
    username: yup.string().required("\"User name\" is a required field"),
    email: yup
        .string()
        .email("Incorrect format")
        .required("Email is a required field"),
    password: yup.string().required("\"Password\" is a required field"),
});

const RegisterPage = () => {
    const navigate = useNavigate();
    //const location = useLocation();

    const [isModalWindowOpen, setIsModalWindowOpen] = useState(false);

    const [registerUser, { isLoading: isRegisterLoading }] =
        useRegisterUserMutation();

    const { authUserId, token, registerStatus, registerError } = useSelector(
        (state) => state.authData
    );

    useEffect(() => {
        console.log("State: ");
        console.log("token: ", token);
        console.log("registerStatus: ", registerStatus);
        console.log("registerError: ", registerError);
        if (token) {
            setIsModalWindowOpen(false);
            // const origin = location.state?.from?.pathname || "/";
            // navigate(origin, { replace: true });
            navigate(`/users/${authUserId}`, { replace: true });
        }
        if (!isRegisterLoading && registerStatus === false) {
            setIsModalWindowOpen(true);
        }
    }, [token, authUserId, registerStatus, isRegisterLoading]);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        //TODO mock data. Use auto filled data later
        defaultValues: {
            // username: "Bret",
            // email: "Sincere@april.biz",
            // password: "0000",
        },
        mode: "onSubmit",
        resolver: yupResolver(schema),
        shouldFocusError: false,
    });


    const registerUserHandler = async (userData) => {
        // e.preventDefault();

        // const userData = {
        //     username: "Bret",
        //     email: "Sincere9@april.biz",
        //     password: "0000",
        // };

        await registerUser({ userData, setAuthDataInfo });
    };

    return (
        <>
            <PortalModalWindow
                isOpen={isModalWindowOpen}
                setIsModalWindowOpen={setIsModalWindowOpen}
                domNodeContainer={document.body}
            >
                <div>
                    {isRegisterLoading && <Loader />}
                    {!isRegisterLoading && registerStatus === false && (
                        <div className="flex justify-center text-red-600">
                            <h1>{registerError}</h1>
                        </div>
                    )}
                </div>
            </PortalModalWindow>
            <div className="flex flex-row justify-center m-auto w-full ">
                <div className="flex flex-col min-h-full py-12 px-4 sm:px-6 lg:px-8  w-full sm:max-w-2xl  bg-white justify-center">
                    <span className="text-2xl text-center">
                        CREATE NEW ACCOUNT
                    </span>

                    <form
                        className="mt-14 w-full flex flex-col"
                        onSubmit={handleSubmit(registerUserHandler)}
                        noValidate
                    >
                        <div id="usernameContainer" className="relative z-0 w-full mb-6 group">
                            <CustomInput
                                {...register("username")}
                                aria-label="UserName"
                                type="string"
                                name="username"
                                id="username"
                                className="block py-2.5 px-0 w-full text-sm sm:text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-b-gray-500 peer"
                                placeholder=" "
                                required
                                autoComplete="on"
                            />
                            <label
                                htmlFor="email"
                                className="flex flex-row justify-between w-full peer-focus:font-medium absolute text-sm sm:text-base text-gray-500 dark:text-gray-300 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-700 peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7 "
                            >
                                <span>User name:</span>
                                <span className="inline-flex text-sm sm:text-base text-red-600 align-top justify-end">
                                    {errors?.username?.message}
                                </span>
                            </label>
                        </div>

                        <div id="emailContainer" className="relative z-0 w-full mb-6 group">
                            <CustomInput
                                {...register("email")}
                                aria-label="Email"
                                type="email"
                                name="email"
                                id="email"
                                className="block py-2.5 px-0 w-full text-sm sm:text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-b-gray-500 peer"
                                placeholder=" "
                                required
                                autoComplete="on"
                            />
                            <label
                                htmlFor="email"
                                className="flex flex-row justify-between w-full peer-focus:font-medium absolute text-sm sm:text-base text-gray-500 dark:text-gray-300 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-700 peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7 "
                            >
                                <span>Email address:</span>
                                <span className="inline-flex text-sm sm:text-base text-red-600 align-top justify-end">
                                    {errors?.email?.message}
                                </span>
                            </label>
                        </div>

                        <div id="passwordContainer" className="relative z-0 w-full mb-6 group">
                            <CustomInput
                                {...register("password")}
                                aria-label="Password"
                                type="password"
                                name="password"
                                id="password"
                                className="block py-2.5 px-0 w-full text-sm sm:text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-b-gray-500 peer"
                                placeholder=" "
                                required
                                autoComplete="on"
                            />
                            <label
                                htmlFor="password"
                                className="flex flex-row justify-between w-full peer-focus:font-medium absolute text-sm sm:text-base text-gray-500 dark:text-gray-300 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-700 peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
                            >
                                <span>Password:</span>
                                <span className="inline-flex text-sm sm:text-base text-red-600 align-top justify-end">
                                    {errors?.password?.message}
                                </span>
                            </label>
                        </div>

                        <CustomButton
                            type="submit"
                            className="flex flex-row justify-center items-stretch mx-auto mt-8 py-2 w-full max-w-[300px] text-sm sm:text-base  bg-white hover:bg-gray-100 border border-gray-300  hover:border-gray-700 rounded"
                        >
                            Create
                        </CustomButton>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
