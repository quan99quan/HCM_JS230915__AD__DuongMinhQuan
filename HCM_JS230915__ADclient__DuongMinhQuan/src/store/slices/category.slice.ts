import { createSlice } from "@reduxjs/toolkit";
type AvailableStatus = 'active' | 'inactive';
export type category = {
    id: number,
    title: string,
    status: AvailableStatus,
    courses: []
}
interface InitialState {
    category: category[] | null,
}
let initialState: InitialState = {
    category: null,
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setList: (state, action) => {
            state.category = action.payload
        },
        addCategory: (state, action) => {
            state.category?.push(action.payload)
        },
        update: (state, action) => {
            state.category = state.category?.map(item => {
                if (item.id == action.payload.id) {
                    return action.payload
                } else {
                    return item
                }
            }) || null
        }

    }
})

export const categoryReducer = categorySlice.reducer;
export const categoryAction = categorySlice.actions;