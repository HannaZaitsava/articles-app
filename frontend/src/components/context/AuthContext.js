import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AuthContext = React.createContext(null);

const useAuth = () => React.useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [authToken, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("postsApp_rtk");
    if (token) setToken(token);
  }, []);

  //TODO: Do I need to save authToken in state or saving it at localStorage is enought?
  useEffect(() => {
    if (authToken != null) {
      localStorage.setItem("postsApp_rtk", authToken);
      //TODO: get user data from API by encoding authToken?
      setUser({
        // mock data
        id: "rRC7RZKAN5OLoGN_d_YMH",
        username: "Bret",
        email: "Sincere@april.biz",
        // permissions: ["edit"],
        // roles: ["user"], //['admin']
      });
    } else {
      localStorage.removeItem("postsApp_rtk");
      setUser(null);
    }
  }, [authToken]);


  //TODO: connent to JWT server and get JWT token
  const fakeAuth = async (data) => {
    // mock token for now
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve(
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMSJ9LCJpYXQiOjE2MzA2Njk1OTZ9._SIEfcriHqyLdyKdNscuJ20HJ0norujmi_irYQWGSzs"
          ),
        250
      );
    });
  };

  const handleLogin = async (data) => {
    const authToken = await fakeAuth(data);

    // if there is no a server error save token to state
    if (authToken != null) {
      setToken(authToken);

      const origin = location.state?.from?.pathname || "/";
      navigate(origin, { replace: true });
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("postsApp_rtk");
    setToken(null);
  };

  const value = {
    authToken,
    onLogin: handleLogin,
    onLogout: handleLogout,
    authUser: user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
