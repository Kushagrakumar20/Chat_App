import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        authUser: null,
        otherUsers: null,
        selectedUser: null,
        onlineUsers: null,
    },
    reducers:{
        setAuthUser: (state, action) => {
            state.authUser = action.payload;
        },
        setOtherUsers: (state, action) => {
            state.otherUsers = action.payload;
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        setOnlineUser: (state, action) => {
            state.onlineUsers = action.payload;
        }
    }
});

export const {setAuthUser, setOtherUsers, setSelectedUser, setOnlineUser} = userSlice.actions;
export default userSlice.reducer;