import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy } from "../utils"
export default function RouteIndex() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={lazy.lazyFn(() => import("../user/Authen"))()}></Route>
                <Route path="/register" element={lazy.lazyFn(() => import("../user/register.jsx"))()}></Route>
                <Route path="/task" element={lazy.lazyFn(() => import("../user/create/Task.jsx"))()}></Route>
            </Routes>
        </BrowserRouter>
    );
}
