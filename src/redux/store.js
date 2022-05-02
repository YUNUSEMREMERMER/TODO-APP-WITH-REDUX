import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./todos/todosSlice";
import userSlice from "./user/userSlice"

export const store = configureStore({
    reducer: {
        todos: todosSlice,
        user: userSlice,
    },
});