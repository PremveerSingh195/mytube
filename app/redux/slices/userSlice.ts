import { createSlice , PayloadAction } from "@reduxjs/toolkit";

interface User {
    _id: string;
    name: string;
    email: string;
}

interface UserState {
    user: User | null;
    accessToken : string | null;
    isAuthenticated : boolean;
}

const initialState : UserState = {
    user : null,
    accessToken : null,
    isAuthenticated :  false
}

const userSlice = createSlice({
    name : "user",
    initialState ,
    reducers : {
        setUser : (state , action : PayloadAction<{user : User ; accessToken : string}>) => {
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
          state.isAuthenticated = true
        },

        clearUser : (state  ) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false
        }
    }
})

export const { setUser , clearUser} = userSlice.actions


export default userSlice.reducer