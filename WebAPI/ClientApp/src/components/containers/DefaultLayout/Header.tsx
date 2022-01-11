import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Container,
    Avatar,
    Menu,
    MenuItem,
    Divider,
    Typography,
    Icon,
    Button
} from "@mui/material";
import { Home, Person, Login, Logout } from "@mui/icons-material";

import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { baseURL } from "../../../http_comon"

interface IMenuItem {
    label: string,
    icon: any,
    link: string,
}

const menuItems: Array<IMenuItem> = [
    {
        label: 'Home',
        icon: <Home />,
        link: '/',
    },
    {
        label: 'Profile',
        icon: <Person />,
        link: '/user/profile'
    },
    {
        label: 'Admin',
        icon: <Person />,
        link: '/admin'
    }
];

const Header = () => {
    const { user, isAuth } = useTypedSelector((state) => state.auth);
    const { LogoutUser } = useActions();

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        setAnchorEl(null);
        LogoutUser();
        navigate("/");
    }
    return (
        <Box sx={{ flexGrow: 1 }} mb={{ xs: 9, sm: 11 }}  >
            <AppBar sx={{ background: "#18181b", borderBottom: 1, borderColor: '#45A29E' }} position="fixed" >
                <Container sx={{ maxWidth: { xl: "xl", lg: "lg", md: "md" } }}>
                    <Toolbar style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <Link to="/" className="logo">
                            <svg width="250" viewBox="0 -7 369.7147805688482 80.09299075358904"><defs id="SvgjsDefs2747"></defs><g id="SvgjsG2748" transform="matrix(1.097855085962124,0,0,1.097855085962124,-11.703488933551984,-25.9500762870015)" fill="#66fcf1"><path xmlns="http://www.w3.org/2000/svg" d="M46.769,20.261c0.547,0,1.095,0.181,1.513,0.542l12.837,11.105c0.306,0.264,0.59,0.39,0.827,0.39  c0.413,0,0.686-0.381,0.686-1.082v-2.679c0-1.104,0.896-2,2-2h4.995c1.104,0,2,0.896,2,2v10.46c0,1.104,0.677,2.586,1.513,3.309  l6.235,5.394c0.836,0.723,0.617,1.309-0.487,1.309h-5.261c-1.104,0-2,0.793-2,1.771s0,1.771,0,1.771v26.289c0,1.104-0.896,2-2,2  H23.912c-1.104,0-2-0.896-2-2v-27.83c0-1.104-0.896-2-2-2h-5.261c-1.104,0-1.323-0.586-0.487-1.309l31.093-26.897  C45.674,20.441,46.222,20.261,46.769,20.261 M46.769,17.261c-1.291,0-2.525,0.452-3.475,1.272L12.201,45.432  c-2.044,1.767-1.537,3.692-1.333,4.24c0.204,0.549,1.08,2.337,3.783,2.337h4.261v26.83c0,2.757,2.243,5,5,5h45.715  c2.757,0,5-2.243,5-5V52.55v-0.541h4.261c2.703,0,3.579-1.788,3.783-2.337c0.204-0.548,0.711-2.474-1.334-4.241l-6.234-5.394  c-0.19-0.18-0.464-0.779-0.476-1.046V28.537c0-2.757-2.243-5-5-5h-4.995c-2.182,0-4.042,1.405-4.723,3.357l-9.664-8.36  C49.294,17.713,48.06,17.261,46.769,17.261L46.769,17.261z"></path></g><g id="SvgjsG2749" transform="matrix(0.815651658774302,0,0,0.815651658774302,96.71617597772479,15.538442780669795)" fill="#f1f1f1"><path d="M18.6 31.2 l0.4 0 l-0.6 -7.2 l0 -12 l5.2 0 l0 28 l-5.4 0 l-10.4 -19.2 l-0.4 0 l0.6 7.2 l0 12 l-5.2 0 l0 -28 l5.4 0 z M44.675 11.600000000000001 c4 0 6.6 2.6 6.6 6.2 l0 16.4 c0 3.6 -2.6 6.2 -6.6 6.2 l-8.8 0 c-4 0 -6.6 -2.6 -6.6 -6.2 l0 -16.4 c0 -3.6 2.6 -6.2 6.6 -6.2 l8.8 0 z M37.275000000000006 16 c-1.6 0 -2.8 1.2 -2.8 2.6 l0 14.8 c0 1.4 1.2 2.6 2.8 2.6 l6 0 c1.6 0 2.8 -1.2 2.8 -2.6 l0 -14.8 c0 -1.4 -1.2 -2.6 -2.8 -2.6 l-6 0 z M72.75 31.2 l0.4 0 l-0.6 -7.2 l0 -12 l5.2 0 l0 28 l-5.4 0 l-10.4 -19.2 l-0.4 0 l0.6 7.2 l0 12 l-5.2 0 l0 -28 l5.4 0 z M97.42500000000001 12 l8.6 25.8 l0 2.2 l-5.2 0 l-1.8 -6 l-10 0 l-1.8 6 l-5.2 0 l0 -2.2 l8.6 -25.8 l6.8 0 z M93.82500000000002 17.6 l-3.6 12 l7.6 0 l-3.6 -12 l-0.4 0 z M127.70000000000002 36.2 l-4.8 0 l-6.2 -16.2 l-0.4 0 l-2 20 l-5.4 0 l0 -2.2 l3.4 -25.8 l6.2 0 l6.6 17.2 l0.4 0 l6.6 -17.2 l6.2 0 l3.4 25.8 l0 2.2 l-5.4 0 l-2 -20 l-0.4 0 z M146.77500000000003 40 l0 -28 l19.2 0 l0 3 l-1.4 1.4 l-12.6 0 l0 7.2 l10.2 0 l0 4.4 l-10.2 0 l0 7.6 l14 0 l0 4.4 l-19.2 0 z M183.05000000000004 27.8 l-7.4 0 l0 7.8 l7.4 0 c2 0 3.2 -1.2 3.2 -2.8 l0 -2.2 c0 -1.6 -1.2 -2.8 -3.2 -2.8 z M186.65000000000003 25 l0 0.4 s4.8 0.6 4.8 5.8 l0 2.8 c0 3.2 -2.8 6 -6.8 6 l-14.2 0 l0 -28 l13 0 c4 0 6.8 2.8 6.8 6 l0 2.6 c0 3.4 -3.6 4.4 -3.6 4.4 z M181.85000000000002 16.4 l-6.2 0 l0 7 l6.2 0 c2 0 3.2 -1.2 3.2 -2.8 l0 -1.4 c0 -1.6 -1.2 -2.8 -3.2 -2.8 z M211.12500000000003 11.600000000000001 c4 0 6.6 2.6 6.6 6.2 l0 16.4 c0 3.6 -2.6 6.2 -6.6 6.2 l-8.8 0 c-4 0 -6.6 -2.6 -6.6 -6.2 l0 -16.4 c0 -3.6 2.6 -6.2 6.6 -6.2 l8.8 0 z M203.72500000000002 16 c-1.6 0 -2.8 1.2 -2.8 2.6 l0 14.8 c0 1.4 1.2 2.6 2.8 2.6 l6 0 c1.6 0 2.8 -1.2 2.8 -2.6 l0 -14.8 c0 -1.4 -1.2 -2.6 -2.8 -2.6 l-6 0 z M238.00000000000003 11.600000000000001 c4 0 6.6 2.6 6.6 6.2 l0 16.4 c0 3.6 -2.6 6.2 -6.6 6.2 l-8.8 0 c-4 0 -6.6 -2.6 -6.6 -6.2 l0 -16.4 c0 -3.6 2.6 -6.2 6.6 -6.2 l8.8 0 z M230.60000000000002 16 c-1.6 0 -2.8 1.2 -2.8 2.6 l0 14.8 c0 1.4 1.2 2.6 2.8 2.6 l6 0 c1.6 0 2.8 -1.2 2.8 -2.6 l0 -14.8 c0 -1.4 -1.2 -2.6 -2.8 -2.6 l-6 0 z M255.47500000000002 12 l0 11.6 l5 0 l5.4 -11.6 l5.2 0 l0 2.2 l-6.4 11.6 l6.8 12 l0 2.2 l-5.2 0 l-5.8 -12 l-5 0 l0 12 l-5.2 0 l0 -28 l5.2 0 z M281.15000000000003 40 l-5.2 0 l0 -28 l5.2 0 l0 28 z M303.42500000000007 31.2 l0.4 0 l-0.6 -7.2 l0 -12 l5.2 0 l0 28 l-5.4 0 l-10.4 -19.2 l-0.4 0 l0.6 7.2 l0 12 l-5.2 0 l0 -28 l5.4 0 z M319.3 19 l0 14 c0 1.4 1.2 2.6 2.8 2.6 l7.4 0 l0 -11 l5.2 0 l0 15.4 l-14 0 c-4 0 -6.6 -2.6 -6.6 -6.2 l0 -15.6 c0 -3.6 2.6 -6.2 6.6 -6.2 l13 0 l0 3 l-1.4 1.4 l-10.2 0 c-1.6 0 -2.8 1.2 -2.8 2.6 z"></path></g></svg>
                        </Link>
                        <Box sx={{ flexGrow: 1 }} />


                        {(!isAuth) ?
                            (<IconButton component={Link} to="/auth/login"
                                style={{ textDecoration: 'none', color: '#55FCF1', paddingRight: 0 }}
                                size="large"
                                color="inherit"
                            >
                                <Login />
                            </IconButton>) : (<IconButton
                                sx={{ paddingRight: 0 }}
                                onClick={handleClick}
                                size="small"
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                {(user.photo == "") ? <Avatar sx={{ width: 32, height: 32, color: "#55FCF1", border: 2, borderColor: '#45A29E' }} style={{ backgroundColor: "transparent" }}>{user.name[0]}</Avatar> : <Avatar alt="Image" sx={{ width: 32, height: 32, color: "#55FCF1", border: 2, borderColor: '#45A29E' }} src={baseURL + user.photo} />}
                            </IconButton>)}


                    </Toolbar>
                </Container>
            </AppBar>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                // onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        borderRadius: 3,
                        overflow: 'visible',
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))',
                        mt: 0.5,
                        minWidth: "200px",
                        background: "#18181b",
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        // '&:before': {
                        //     content: '""',
                        //     display: 'block',
                        //     position: 'absolute',
                        //     filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))',
                        //     top: 0,
                        //     right: 16,
                        //     width: 10,
                        //     height: 10,
                        //     bgcolor: '#18181b',
                        //     transform: 'translateY(-50%) rotate(45deg)',
                        //     zIndex: 0,
                        // },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Box sx={{ my: 0.5, mb: 1.5, px: 2.5 }}>
                    <Typography variant="subtitle1" noWrap sx={{ color: '#f1f1f1' }}>
                        {user.name} {user.surname}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#f1f1f1' }} noWrap>
                        {user.email}
                    </Typography>
                </Box>
                <Divider sx={{ my: 1, background: "#45A29E" }} />
                {menuItems.map((option) => (

                    < MenuItem
                        key={option.label}
                        to={option.link}
                        component={Link}
                        onClick={handleClose}
                        sx={{ py: 1, px: 2.5 }}
                        style={{ textDecoration: 'none', color: 'unset' }}
                    >
                        <IconButton sx={{ mr: 2, width: 24, height: 24, color: "#f1f1f1" }}>
                            {option.icon}
                        </IconButton>
                        <Typography variant="subtitle1" noWrap sx={{ color: '#f1f1f1' }}>
                            {option.label}
                        </Typography>
                    </MenuItem>
                ))}
                <Divider sx={{ my: 1, background: "#45A29E" }} />
                <MenuItem
                    onClick={handleLogOut}
                    sx={{ py: 1, px: 2.5 }}
                    style={{ textDecoration: 'none', color: 'unset' }}
                >
                    <IconButton sx={{ mr: 2, width: 24, height: 24, color: "#f1f1f1" }}>
                        <Logout />
                    </IconButton>
                    <Typography variant="subtitle1" noWrap sx={{ color: '#f1f1f1' }}>
                        Log Out
                    </Typography>
                </MenuItem>
            </Menu>
        </Box >

    );
};

export default Header;
