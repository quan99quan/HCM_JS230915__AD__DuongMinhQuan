import { lazy } from "@/util"
import { BrowserRouter, Route, Routes } from "react-router-dom"

export const router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={lazy(() => import("@pages/home/Home"), localStorage.getItem("token") != null)()}>
                 
                    <Route path="member/list" element={lazy(() => import("@pages/member/MemberList"))()}></Route>
            
                </Route>
                <Route path="/authen" element={lazy(() => import("@pages/authen/Authen"), localStorage.getItem("token") == null, "/")()}></Route>
            </Routes>
        </BrowserRouter>
    )
}