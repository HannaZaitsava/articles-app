import React from "react";
import {
    Navigate,
    Outlet,
    useLocation
} from "react-router-dom";

const ProtectedRoute = ({
  children,
  isAllowed = false,
  redirectPath = '/auth/login',
}) => {
  const location = useLocation();

  if (!isAllowed) {
    //if user is not logged in so redirect to login page with the return url
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
