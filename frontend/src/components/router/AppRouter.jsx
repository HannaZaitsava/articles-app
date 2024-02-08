import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import CalendarPage from "../../pages/CalendarPage";
import LoginPage from "../../pages/LoginPage";
import PostIdPage from "../../pages/PostIdPage";
import PostsPage from "../../pages/PostsPage";
import UserIdPage from "../../pages/UserIdPage";

import { useSelector } from 'react-redux/es/hooks/useSelector';
import PageNotFoundPage from "../../pages/PageNotFoundPage";
import UsersPage from "../../pages/UsersPage";
import RegisterPage from "./../../pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import { useLocation } from "react-router-dom";

const AppRouter = () => {
    const { authUserId, loginStatus } = useSelector((state) => state.authData);
    const location = useLocation();
    const origin = location.state?.from?.pathname || "/";

    return (
        <Routes>
            <Route index element={<PostsPage />} />
            <Route path="/home" index element={<Navigate to="/posts" />} />
            <Route path="/posts">
                <Route index element={<PostsPage />} />
                <Route path=":id" element={<PostIdPage />} />
                <Route path="*" element={<PageNotFoundPage />} />
            </Route>
            <Route path="/myprofile" element={loginStatus ? <Navigate to={`/users/${authUserId}`} /> : <LoginPage />} />

            <Route path="/users">
                <Route index element={<UsersPage />} />
                <Route path=":id" element={<UserIdPage text="" />} />
                <Route path="*" element={<PageNotFoundPage />} />
            </Route>

            <Route element={<ProtectedRoute isAllowed={!!authUserId} />}>
                <Route path="/subscriptions" element={<UsersPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="*" element={<PageNotFoundPage />} />
            </Route>

            <Route element={<ProtectedRoute isAllowed={!!authUserId} />}></Route>

            <Route path="/auth/login" element={loginStatus ? <Navigate to={origin} /> : <LoginPage />} />
            {/* <Route path="/auth/register" element={loginStatus ? <Navigate to={origin} /> : <RegisterPage />} /> */}
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="*" element={<PageNotFoundPage />} />
        </Routes>
    );
};

export default AppRouter;
