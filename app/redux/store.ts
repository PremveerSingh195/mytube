import { configureStore } from "@reduxjs/toolkit";
import sidebarToggleReducer from "./slices/sidebarToggleSlice";

export const store = configureStore ({
    reducer : {
        toggleSidebar : sidebarToggleReducer
    }
})