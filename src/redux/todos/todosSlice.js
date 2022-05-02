import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodosAsync = createAsyncThunk("todos/getTodosAsync", async () => {
    const res = await (await axios("http://localhost:8080/api/todos/getall")).data;
    return res.data;
});

export const addTodoAsync = createAsyncThunk("todos/addTodoAsync", async (title) => {
    const todo = {
        "id":nanoid(),
        "completed":false,
        "title":title,
    }
    
    const res = await axios.post("http://localhost:8080/api/todos/add",todo);
    return res.data.data;
});

export const todosSlice = createSlice({
    name: "todos",
    initialState: {
        items: [],
        activeFilter:"all"
    },
    reducers:{
        toggle: (state, action) => {
            const {id} = action.payload;
            const item = state.items.find(item => item.id === id)
            item.completed = !item.completed;
        },
        destroy: (state, action) => {
            const id = action.payload;
            const items = state.items.filter(item => item.id !== id);
            state.items = items;
        },
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload;
        },
        clearCompleted: (state) => {
            const filtered = state.items.filter(item => item.completed === false);
            state.items = filtered
        }
    },
    extraReducers: {
        [getTodosAsync.fulfilled]: (state, action) => {
            state.items = action.payload;
        },

        [addTodoAsync.fulfilled]: (state, action) => {
            state.items.push(action.payload);
        }
    }
});

export const selectFilteredTodos = (state) => {
    if(state.todos.activeFilter === "all"){
        return state.todos.items;
    }

    return state.todos.items.filter((todo) => state.todos.activeFilter === "active" ? todo.completed === false : todo.completed === true )
}

export const selectTodos = (state) => state.todos.items;
export const { toggle, destroy, changeActiveFilter, clearCompleted} = todosSlice.actions
export default todosSlice.reducer;