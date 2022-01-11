import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { IProps } from "../types";

const AdminLayout = () => {

    const props: IProps = { drawerWidth: 240 };

    return (
        <>
            <Sidebar {...props} />
            {/* <div className="contaier"> */}
            <Box
                component="main"
                sx={{ flexGrow: 1, width: { md: `calc(100% - ${props.drawerWidth}px)` }, ml: "auto" }}
            >
                <Outlet />
            </Box>
        </>
    );
}

export default AdminLayout;