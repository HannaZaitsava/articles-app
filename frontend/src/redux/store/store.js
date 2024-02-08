import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from "./../api/api";

import authDataReducer from '../slices/authDataSlice';

export const store = configureStore({
    reducer: {
        authData: authDataReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddlware) =>
        getDefaultMiddlware().concat(api.middleware),
});

// It's needed for refetchOnFocus/refetchOnReconnect behaviour
setupListeners(store.dispatch)
