import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserAsync = createAsyncThunk("todos/getUserAsync", async (data) => {
    const email = data.email;
    const res = await axios(`http://localhost:8080/api/users/getbyemail?email=${email}`);
    return res.data.data;
});

export const addUserAsync = createAsyncThunk("todos/addUserAsync", async (user) => {
    const res = await axios.post("http://localhost:8080/api/users/add",user);
    return res.data.data;
   
});
export const removeUserAsync = createAsyncThunk("todos/removeUserAsync", async (id) => {
    
    const res = await axios.post(`http://localhost:8080/api/users/remove?id=${id}`);
    
});

export const userSlice = createSlice({
    name: "user",
    initialState: {
        item:{},
        isAuthenticated:false, 
            
    },
    reducers:{
        auth: (state, action) => {
            state.isAuthenticated = false;
        },
    },
    extraReducers: {
        [addUserAsync.fulfilled]: (state, action) => {
            state.item = action.payload;
            state.isAuthenticated = true;
        },
        
        [getUserAsync.fulfilled]: (state, action) => {
            if(action.payload == null){
                state.isAuthenticated = false;
            }else{
                state.item = action.payload;
                state.isAuthenticated = true;
            }
            
        },
        [removeUserAsync.fulfilled]: (state, action) => {
            state.item = null;
            state.isAuthenticated = false;
        },
        
    }
});

export const userSelector = (state) => state.user.item;
export const { auth } = userSlice.actions
export const isAuthenticatedSelector = (state) => state.user.isAuthenticated;
export default userSlice.reducer;