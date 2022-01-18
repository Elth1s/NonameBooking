import { Container, Box, Stack, IconButton } from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react"
import Header from "../DefaultLayout/Header";
import { IProps } from "../types";
import UserMenu from "./UserMenu";

const DefaultLayout = () => {

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
            <Header />
            <Container sx={{ maxWidth: { xl: "xl", lg: "lg", md: "md" }, mb: 3 }}>
                <Stack direction="row" sx={{ pt: 2 }}>
                    <UserMenu {...props} />
                    <Box sx={{ flexGrow: 1, width: { md: `calc(100% - ${props.drawerWidth}px)` } }}>
                        <Outlet />
                        {showButton && (
                            <IconButton aria-label="edit" sx={{ border: 2, borderColor: "#45A29E", borderRadius: 3, color: "#f1f1f1" }} onClick={scrollToTop} style={{ position: "fixed", bottom: "20px", right: "20px" }}>
                                <ArrowUpward fontSize="large" />
                            </IconButton>
                        )}
                    </Box>
                </Stack>
            </Container>
        </>
    );
}

export default DefaultLayout;