import { Outlet } from "react-router-dom";
import Header from "./Header";

const DefaultLayout = () => {
    return (
        <>
            <Header />
            <div className="container">
                <Outlet />
            </div>
        </>
    );
}

export default DefaultLayout;