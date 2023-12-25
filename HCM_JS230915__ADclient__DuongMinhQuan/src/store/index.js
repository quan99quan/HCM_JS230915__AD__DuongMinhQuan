import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "./slices/todolist.slice";
export const store = configureStore({
    reducer: {
        todoStore: todoReducer,
    }
})