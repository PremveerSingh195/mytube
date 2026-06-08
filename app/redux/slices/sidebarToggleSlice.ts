import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSidebarOpen : true
}

const sidebarToggleSlice = createSlice({
    name : "sidebarToggle",
    initialState ,
    reducers : {
        toggleSideBar : (state) => {
            state.isSidebarOpen = !state.isSidebarOpen
        },
    }
}) 

export const {toggleSideBar} = sidebarToggleSlice.actions

export default sidebarToggleSlice.reducer