import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   authUser: null,
// };

// export const authDataSlice = createSlice({
//   initialState,
//   name: 'authData',
//   reducers: {
//     logout: () => initialState,
//     setAuthUser: (state, action) => {
//       state.user = action.payload;
//     },
//   },
// });

// export default authDataSlice.reducer;
// export const { logout, setAuthUser } = authDataSlice.actions;

const initialState = {
    //signedIn: false,
    authUserId: null,
    // email: null,
    // userName: null,
    // showError: false,
    // errorMessage: null,
    token: null,
    validRoute: false,
    showAutoLogout: false,
    showAutoLogin: false,

    registerStatus: null,
    registerError: "",
    loginStatus: null,
    loginError: "",
  };
  const authDataSlice = createSlice({
    name: "authData",
    initialState,
    reducers: {
      setAuthDataInfo(state, action) {
        return { ...state, ...action.payload };
      },
      validRoute(state, action) {
        return { ...state, ...action.payload };
      },
    },
  });



export const { setAuthDataInfo, validRoute } = authDataSlice.actions;
export default authDataSlice.reducer;
