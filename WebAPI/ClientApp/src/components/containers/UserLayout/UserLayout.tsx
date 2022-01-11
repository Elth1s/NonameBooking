import { Container, Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../DefaultLayout/Header";
import { IProps } from "../types";
import UserMenu from "./UserMenu";

const DefaultLayout = () => {

    const props: IProps = { drawerWidth: 240 };

    return (
        <>
            <Header />
            <Container sx={{ maxWidth: { xl: "xl", lg: "lg", md: "md" } }}>
                <Stack direction="row" sx={{ pt: 2 }}>
                    <UserMenu {...props} />
                    <Box sx={{ flexGrow: 1, width: { md: `calc(100% - ${props.drawerWidth}px)` } }}>
                        <Outlet />
                    </Box>
                </Stack>
            </Container>
        </>
    );
}

export default DefaultLayout;