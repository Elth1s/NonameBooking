import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const DefaultLayout = () => {
    return (
        <>
            <Header />
            <Container maxWidth="xl">
                <Outlet />
            </Container>
        </>
    );
}

export default DefaultLayout;