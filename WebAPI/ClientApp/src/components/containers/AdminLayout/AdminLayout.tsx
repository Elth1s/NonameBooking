import { Box, IconButton } from "@mui/material";
import { ArrowUpward } from '@mui/icons-material';
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { IProps } from "../types";
import { useState, useEffect } from "react";

const AdminLayout = () => {

    const props: IProps = { drawerWidth: 240 };
    const [showButton, setShowButton] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        });
    }, []);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // for smoothly scrolling
        });
    };
    return (
        <>
            <Sidebar {...props} />
            {/* <div className="contaier"> */}
            <Box
                component="main"
                sx={{ flexGrow: 1, width: { md: `calc(100% - ${props.drawerWidth}px)` }, ml: "auto", mb: 3 }}
            >
                <Outlet />
                {showButton && (
                    <IconButton aria-label="edit" sx={{ border: 2, borderColor: "#45A29E", borderRadius: 3, color: "#f1f1f1" }} onClick={scrollToTop} style={{ position: "fixed", bottom: "20px", right: "20px" }}>
                        <ArrowUpward fontSize="large" />
                    </IconButton>
                )}
            </Box>
        </>
    );
}

export default AdminLayout;