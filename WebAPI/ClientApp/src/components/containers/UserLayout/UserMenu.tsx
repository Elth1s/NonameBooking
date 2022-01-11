import {
    Box,
    Divider,
    Drawer,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack
} from "@mui/material";
import MaterialLink from "@mui/material/Link"
import {
    Person,
    AccountCircleOutlined,
    ListAltOutlined
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { FC } from "react";

import { IProps } from "../types";

interface IMenuItem {
    icon: any,
    title: string,
    link: string,
    divider?: boolean
}

const menu: Array<IMenuItem> = [
    {
        icon: <Person />,
        title: 'Profile',
        link: '/user/profile',
    },
    {
        icon: <ListAltOutlined />,
        title: "Wish list",
        link: "/user/wishlist",
        divider: true

    }
];

const MenuItem: FC<IMenuItem> = ({ icon, title, link, divider }) => {
    return (
        <>
            {
                (divider !== undefined && divider) &&
                (<Divider sx={{ background: "#45A29E" }} />)
            }

            <MaterialLink style={{ textDecoration: 'none', color: 'unset' }} component={Link} to={link}>
                < ListItem button sx={{ pl: 4, my: 1 }}>
                    <ListItemIcon sx={{ color: "#66fcf1" }}>{icon}</ListItemIcon>
                    <ListItemText sx={{ color: "#f1f1f1" }} primary={title} />
                </ListItem >
            </MaterialLink>
        </>
    );
}

const UserMenu: React.FC<IProps> = ({ drawerWidth }) => {
    return (
        <>
            {/* <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", md: "block" },
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', background: "#18181b", borderColor: '#45A29E' },
                }}> */}
            <Box sx={{ width: drawerWidth, border: 1, borderRadius: 3, borderColor: '#45A29E' }}>

                {Array.from(menu).map((item, key) => (<MenuItem key={key} {...item} />))}

            </Box>
            {/* </Drawer> */}
        </>
    );
};

export default UserMenu;
