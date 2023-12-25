import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { memberReducer } from "./slices/member.slice";
import { logReducer } from "./slices/log.slice";
import { categoryReducer } from "./slices/category.slice";
const RootReducer = combineReducers({
    memberStore: memberReducer,
    logStore: logReducer,
    categoryStore: categoryReducer
})

export type Store = ReturnType<typeof RootReducer>;

export const store = configureStore({
    reducer: RootReducer
})