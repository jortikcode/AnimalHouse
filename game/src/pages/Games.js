import { Outlet } from "react-router-dom";

export default function Games(){
    return (
        <>
            <h2>Games</h2>
            <Outlet />
        </>
    );
}