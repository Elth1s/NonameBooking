import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from "@mui/material";
import {
    KeyboardArrowDown,
    VisibilityOutlined,
    Edit,
    Delete
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { ApartmentServerError } from "../types";
import TablePaginationActions from "../../../comon/TablePaginationActions";
import { useEffect, useState } from "react";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useActions } from "../../../../hooks/useActions";

const UserApartmentsList = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const { apartments } = useTypedSelector((state) => state.currentUserApartment);
    const { GetUserApartments, DeleteApartment } = useActions();
    const userId = useTypedSelector((store) => store.auth.user.id);

    async function getUserApartments() {
        setLoading(true);
        try {
            await GetUserApartments(userId);
            setLoading(false);
        } catch (ex) {
            console.log("Problem fetch");
            setLoading(false);
        }
    }

    useEffect(() => {
        document.title = "Apartments";
        getUserApartments();
    }, []);


    const handleChangePage = (event: any, newPage: number) => {
        setPage(newPage)
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const DeleteApartmentHandle = async (id: number) => {
        setLoading(true);
        try {
            await DeleteApartment(id);
            await GetUserApartments(userId);
            setLoading(false);
            toast.success('Apartment deleted successfully.', { position: "top-right" });
        }
        catch (exeption) {
            setLoading(false);
            const serverErrors = exeption as ApartmentServerError;
            toast.error(serverErrors.title, { position: "top-right" });
        }
    }

    return (
        <>
            <Box sx={{ flexGrow: 1, m: 1, mx: 3, width: { lg: "75%", md: "95%" } }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1 }}>
                    <Typography variant="h4" gutterBottom color="#55FCF1" sx={{ my: "auto" }}>
                        Your apartments
                    </Typography>
                    <Button variant="contained" size="large" component={Link} to={`/user/apartments/create`} style={{ backgroundColor: "#45A29E", textDecoration: 'none', color: 'white' }}>
                        Create apartment
                    </Button>
                </Stack>
                {loading ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress sx={{ color: "#66fcf1", mt: 3 }} />
                </Box> :
                    <TableContainer component={Paper} sx={{ mt: 3, border: "1px solid #55FCF1", borderRadius: '7px' }}>
                        <Table aria-label="custom pagination table">
                            <TableHead>
                                <TableRow>
                                    <TableCell component="th" scope="row" sx={{ width: 70 }} align="center" >
                                        Id
                                    </TableCell>
                                    <TableCell align="center">
                                        Name
                                    </TableCell>
                                    <TableCell align="center">
                                        City
                                    </TableCell>
                                    <TableCell align="center">
                                        Type
                                    </TableCell>
                                    <TableCell align="center">
                                        Price/night
                                    </TableCell>
                                    <TableCell align="right" sx={{ width: 120 }}>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? apartments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : apartments
                                ).map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell scope="row" sx={{ width: 70 }} align="center" >
                                            {row.id}.
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.cityName}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.typeOfApartmentName}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.price} $
                                        </TableCell>
                                        <TableCell align="right" sx={{ width: 120 }}>
                                            <IconButton aria-label="view" sx={{ color: "#0288d1" }} component={Link} to={`/apartment?id=${row.id}`} style={{ textDecoration: 'none' }}>
                                                <VisibilityOutlined />
                                            </IconButton>
                                            <IconButton aria-label="edit" sx={{ color: "#ffb74d" }} component={Link} to={`/user/apartments/update/${row.id}`} style={{ textDecoration: 'none', color: '#ffb74d' }}>
                                                <Edit />
                                            </IconButton>
                                            <IconButton aria-label="delete" sx={{ color: "#d32f2f" }} onClick={() => DeleteApartmentHandle(row.id)}>
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}


                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination sx={{ border: 0, color: "#55FCF1" }}
                                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                        colSpan={6}
                                        count={apartments.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            IconComponent: KeyboardArrowDown,
                                            inputProps: {
                                                'aria-label': 'rows per page',
                                            },
                                            native: true,
                                        }}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActions}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                }
            </Box>
        </>
    );
}

export default UserApartmentsList