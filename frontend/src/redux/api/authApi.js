//import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
//import { LoginInput } from '../../pages/login.page';
//import { RegisterInput } from '../../pages/register.page';
//import { IGenericResponse } from './types';
//import { userApi } from './userApi';
import { api } from "./api";
//const AUTH = process.env.REACT_APP_SERVER_ENDPOINT as string;
import { AUTH } from "./apiConsts";
import { SERVER_PATH } from "./apiConsts";

let initial = {
    //signedIn: false,
    authUserId: null,
    // email: null,
    // userName: null,
    // showError: false,
    // errorMessage: null,
    loginStatus: null,
    loginError: "",
    registerStatus: null,
    registerError: "",
    token: null,
};

// export const authApi = api.injectEndpoints({
//     reducerPath: "authApi",
// //    tagTypes: ["AUTH"],
// //   reducerPath: 'authApi',
// //   baseQuery: fetchBaseQuery({
// //     baseUrl: `${AUTH}/api/auth/`, //${BASE_URL}/api/auth/
// //   }),
//   endpoints: (builder) => ({
//     registerUser: builder.mutation({//<IGenericResponse, RegisterInput>({
//       query(data) {
//         return {
//             url: '/api/auth/register',
//           //url: `${AUTH}/register`,
//           method: 'POST',
//           body: data,
//         };
//       },
//     }),
//     loginUser: builder.mutation
//     // <
//     //   { access_token: string; status: string },
//     //   LoginInput
//     // >
//     ({
//       query(data) {
//         return {
//           url: '/api/auth/login',
//           //url: `${AUTH}/login`,
//           method: 'POST',
//           body: data,
//           credentials: 'include',
//         };
//       },
//     //   async onQueryStarted(args, { dispatch, queryFulfilled }) {
//     //     try {
//     //       await queryFulfilled;
//     //       await dispatch(usersApi.endpoints.getUser({id: "rRC7RZKAN5OLoGN_d_YMH"}));//(userApi.endpoints.getMe.initiate(null));
//     //     } catch (error) {
//     //         console.log("dispatch getUser error: ", error);
//     //     }
//     //   },
//     }),
//     // verifyEmail: builder.mutation<
//     //   IGenericResponse,
//     //   { verificationCode: string }
//     // >({
//     //   query({ verificationCode }) {
//     //     return {
//     //       url: `verifyemail/${verificationCode}`,
//     //       method: 'GET',
//     //     };
//     //   },
//     // }),
//     logoutUser: builder.mutation
//     // <void, void>
//     ({
//       query() {
//         return {
//           //url: '/api/auth/logout',
//           url: `${AUTH}/logout`,
//           credentials: 'include',
//         };
//       },
//     }),
//   }),
// });

export const authApi = api.injectEndpoints({
    reducerPath: "authApi",
    //    tagTypes: ["AUTH"],
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            queryFn: async ({ userData, setAuthDataInfo }, { dispatch }) => {
                if (!!userData) {
                    try {
                        const newUserData = {...userData, registrationDate: new Date().toISOString()};
                        //userData.registrationDate = new Date().toISOString();
                        const registerUserResponse = await fetch(
                            `${SERVER_PATH}${AUTH}/register`,
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(newUserData),
                                // credentials: "include",
                            }
                        );
                        console.log(
                            "registerUserResponse: ",
                            registerUserResponse
                        );
                        if (registerUserResponse?.status === 200) {
                            const authUserData =
                                await registerUserResponse.json();
                            localStorage.setItem(
                                "postsApp_rtk",
                                JSON.stringify(authUserData)
                            );
                            dispatch(
                                authApi.endpoints.autoLogin.initiate({
                                    setAuthDataInfo,
                                    userData: authUserData,
                                    registerStatus: true,
                                })
                            );
                        } else {
                            const { message } =
                                await registerUserResponse.json();
                            dispatch(
                                setAuthDataInfo({
                                    ...initial,
                                    ...{
                                        // showError: true,
                                        // errorMessage: message,
                                        registerStatus: false,
                                        registerError: message,
                                    },
                                })
                            );
                        }
                    } catch (error) {
                        dispatch(
                            setAuthDataInfo({
                                ...initial,
                                ...{
                                    // showError: true,
                                    // errorMessage: error.message,
                                    registerStatus: false,
                                    registerError: error.message,
                                },
                            })
                        );
                    }
                }
                return {};
            },
        }),

        logIn: builder.mutation({
            queryFn: async (
                { userData, setAuthDataInfo, initialRender = false },
                { dispatch, getState }
            ) => {
                const localStorageAuthData = localStorage.getItem(
                    "postsApp_rtk"
                )
                    ? JSON.parse(localStorage.getItem("postsApp_rtk"))
                    : "";
                if (localStorageAuthData?.authUserId) {
                    ///TODO расшифровать токен и получить пользователя
                    dispatch(
                        authApi.endpoints.autoLogin.initiate({
                            setAuthDataInfo,
                            userData: localStorageAuthData,
                        })
                    );
                } else if (!!userData) {
                    try {
                        console.log(`${SERVER_PATH}${AUTH}/login`);
                        const loginResponse = await fetch(
                            `${SERVER_PATH}${AUTH}/login`,
                            {
                                method: "POST",
                                // //body: userData,
                                // body: {
                                //     email: userData.email,
                                //     password: userData.password,
                                // },
                                // // credentials: "include",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(userData),
                            }
                        );

                        if (loginResponse?.status === 200) {
                            const authUserData = await loginResponse.json();
                            localStorage.setItem(
                                "postsApp_rtk",
                                // JSON.stringify({
                                //     token: access_token,
                                //     // authUserId: userData.id, //profileData.id,
                                //     // email: userData.email, //profileData.email,
                                //     // userName: userData.username, //profileData.name,
                                // })
                                JSON.stringify(authUserData)
                            );
                            dispatch(
                                setAuthDataInfo({
                                    ...initial,
                                    ...{
                                        //signedIn: true,
                                        token: authUserData.access_token,
                                        authUserId: authUserData.authUserId, //profileData.id,
                                        // email: userData.email, //profileData.email,
                                        // userName: userData.username, //profileData.name,
                                        loginStatus: true,
                                    },
                                })
                            );
                        } else {
                            const { message } =
                                await loginResponse.json();
                            dispatch(
                                setAuthDataInfo({
                                    ...initial,
                                    ...{
                                        // showError: true,
                                        // errorMessage: message,
                                        loginStatus: false,
                                        loginError: message,
                                    },
                                })
                            );
                        }
                    } catch (error) {
                        dispatch(
                            setAuthDataInfo({
                                ...initial,
                                ...{
                                    // loginStatus: true,
                                    // loginError: error.message,
                                    loginStatus: false,
                                    loginError: error.message,
                                },
                            })
                        );
                    }
                }

                return {};
            },
        }),
        getToken: builder.mutation({
            // const token = await fetch(
            //     "http://localhost:3001/api/auth/login", //`${AUTH}/login`,
            //     {
            //         method: "POST",
            //         body: userData,
            //     }
            // );
            query(userData) {
                return {
                    //url: "/api/auth/login",
                    url: `${AUTH}/login`,
                    method: "POST",
                    body: userData,
                };
            },
        }),
        // authByToken: builder.mutation({
        //     queryFn: async ({ access_token, setAuthDataInfo }, { dispatch }) => {
        //         const localStorageAuthData = localStorage.getItem("postsApp_rtk")
        //             ? JSON.parse(localStorage.getItem("postsApp_rtk"))
        //             : "";
        //         if (localStorageAuthData?.authUserId) {
        //             dispatch(
        //                 authApi.endpoints.autoLogin.initiate({
        //                     setAuthDataInfo,
        //                     localStorageAuthData,
        //                 })
        //             );
        //         }
        //         //   else {
        //         //     try {
        //         //       const profile = await fetch(
        //         //         "https://www.googleapis.com/oauth2/v1/userinfo",
        //         //         {
        //         //           method: "GET",
        //         //           headers: {
        //         //             Authorization: `Bearer ${access_token}`,
        //         //           },
        //         //         }
        //         //       );
        //         //       const profileData = await profile.json();
        //         //       localStorage.setItem(
        //         //         "postsApp_rtk",
        //         //         JSON.stringify({
        //         //           token: access_token,
        //         //           authUserId: profileData.id,
        //         //           email: profileData.email,
        //         //           userName: profileData.name,
        //         //         })
        //         //       );
        //         //       dispatch(
        //         //         setAuthDataInfo({
        //         //           ...initial,
        //         //           ...{
        //         //             signedIn: true,
        //         //             token: access_token,
        //         //             authUserId: profileData.id,
        //         //             email: profileData.email,
        //         //             userName: profileData.name,
        //         //           },
        //         //         })
        //         //       );
        //         //     } catch (error) {
        //         //       dispatch(
        //         //         setAuthDataInfo({
        //         //           ...initial,
        //         //           ...{
        //         //             loginStatus: false,
        //         //             loginError: error.message,
        //         //           },
        //         //         })
        //         //       );
        //         //     }
        //         //   }
        //         return {};
        //     },
        // }),
        logOut: builder.mutation({
            queryFn: async ({ setAuthDataInfo }, { dispatch, getState }) => {
                localStorage.removeItem("postsApp_rtk");
                // const revokeFn = getState().authData.token
                //     ? window.google.accounts.oauth2.revoke
                //     : window.google.accounts.id.revoke;
                // const revokeId = getState().authData.token
                //     ? getState().authData.token
                //     : getState().authData.authUserId;
                //revokeFn(revokeId, () => dispatch(setAuthDataInfo(initial)));
                dispatch(setAuthDataInfo(initial));
                return {};
            },
        }),
        autoLogin: builder.mutation({
            queryFn: async ({ setAuthDataInfo, userData }, { dispatch }) => {
                dispatch(
                    setAuthDataInfo({
                        signedIn: true,
                        token: userData?.access_token,
                        authUserId: userData?.authUserId,
                        // email: localStorageAuthData?.email,
                        // userName: localStorageAuthData?.userName,
                        // showError: false,
                        // errorMessage: null,
                        registerStatus: true,
                        registerError: null,
                        loginStatus: true,
                        loginError: null,
                        showAutoLogin: true,
                    })
                );
                return {};
            },
        }),
    }),
});

// export const {
//    useLogInMutation,
//     useRegisterMutation,
//    useLogOutMutation,
//     useVerifyEmailMutation,
// } = authApi;

export const { useLogInMutation, useLogOutMutation, useRegisterUserMutation } =
    authApi;
