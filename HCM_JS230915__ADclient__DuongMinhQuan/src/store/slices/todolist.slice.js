import { createSlice } from "@reduxjs/toolkit";
const todoSlice = createSlice({
    name: "todolist",
    initialState: {
        data: null,
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload
        },

        addTodo: (state, action) => {
            state.data.push(action.payload)
        },
        delete: (state, action) => {
            state.data = state.data.filter(todo => todo.id != action.payload);
        },

        updateTodo: (state, action) => {
            state.data = state.data.map((todo) => {
                if (todo.id == action.payload.id) {
                    return { ...todo, ...action.payload.data };
                }
                return todo;
            });
        }

    }
})

export const todoReducer = todoSlice.reducer;
export const todoAction = todoSlice.actions;