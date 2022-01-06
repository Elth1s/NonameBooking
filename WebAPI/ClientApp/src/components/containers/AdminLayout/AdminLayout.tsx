import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
    return (
        <>
            <Sidebar />
            <div className="container">
                <Outlet />
            </div>
        </>
    );
}

export default AdminLayout;