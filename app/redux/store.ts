import { configureStore } from "@reduxjs/toolkit";
import sidebarToggleReducer from "./slices/sidebarToggleSlice";
import user from "./slices/userSlice"


export const store = configureStore ({
    reducer : {
        toggleSidebar: sidebarToggleReducer,
        userSlice: user
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;