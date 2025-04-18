import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData; // Ensure this matches the payload structure
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    }
     }
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;