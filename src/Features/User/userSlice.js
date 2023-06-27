import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user:false,
    userData:{}
};

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers : {
        setUser : (state,action)=>{
            console.log(action.payload);
            state.user = true;
            state.userData = action.payload;
        },
        deleteUser : (state)=>{
            state.user = false;
            state.userData = {};
        }
    }
});

export const {setUser,deleteUser} = userSlice.actions;

export default userSlice.reducer;