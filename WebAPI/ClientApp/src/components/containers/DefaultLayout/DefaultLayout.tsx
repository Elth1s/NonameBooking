import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const DefaultLayout = () => {
    return (
        <>
            <Header />
            <Container sx={{ maxWidth: { xl: "xl", lg: "lg", md: "md" } }} >
                <Outlet />
            </Container>
        </>
    );
}

export default DefaultLayout;