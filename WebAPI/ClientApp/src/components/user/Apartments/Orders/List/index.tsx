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
    VisibilityOutlined,
    KeyboardArrowDown,
    AssignmentTurnedInOutlined
} from "@mui/icons-material";
import { makeStyles } from '@mui/styles';
import { Link, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { ApartmentServerError } from "../../types";
import TablePaginationActions from "../../../../comon/TablePaginationActions";
import { useEffect, useState } from "react";
import { useTypedSelector } from "../../../../../hooks/useTypedSelector";
import { useActions } from "../../../../../hooks/useActions";

const ApartmentOrdersList = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const { orders } = useTypedSelector((state) => state.currentUserApartment);
    const { GetApartmentOrdersById, BookedOrder } = useActions();
    let { id } = useParams() as any;

    async function getOrders() {
        setLoading(true);
        try {
            await GetApartmentOrdersById(id);
            setLoading(false);
        } catch (ex) {
            toast.error("Loading orders failed.");
            setLoading(false);
        }
    }
    useEffect(() => {
        document.title = "Apartment orders";
        getOrders();
    }, []);


    const handleChangePage = (event: any, newPage: number) => {
        setPage(newPage)
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const BookedOrderHandle = async (orderId: string) => {
        setLoading(true);
        try {
            await BookedOrder(orderId);
            await GetApartmentOrdersById(id);
            setLoading(false);
            toast.success('Status of order changed to booked.', { position: "top-right" });
        }
        catch (exeption) {
            setLoading(false);
            const serverErrors = exeption as ApartmentServerError;
            toast.error(serverErrors.title, { position: "top-right" });
        }
    }

    return (
        <>
            <Box sx={{ flexGrow: 1, m: 1, mx: 3, width: { lg: "85%", md: "95%" } }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1 }}>
                    <Typography variant="h4" gutterBottom color="#55FCF1" sx={{ my: "auto" }}>
                        Apartment orders
                    </Typography>
                    <Button variant="contained" size="large" component={Link} to={`/user/apartments/list`} style={{ backgroundColor: "#45A29E", textDecoration: 'none', color: 'white' }}>
                        Back
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
                                        Start
                                    </TableCell>
                                    <TableCell align="center">
                                        End
                                    </TableCell>
                                    <TableCell align="center">
                                        Total
                                    </TableCell>
                                    <TableCell align="center">
                                        Status
                                    </TableCell>
                                    <TableCell align="right" sx={{ width: 80 }}>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : orders
                                ).map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell scope="row" sx={{ width: 70 }} align="center" >
                                            <Typography noWrap style={{ wordWrap: "break-word", width: "110px" }}> {row.id}</Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography>{new Date(row.start).toLocaleDateString('en-GB')}</Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography>{new Date(row.end).toLocaleDateString('en-GB')}</Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.total} $
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.orderStatusName}
                                        </TableCell>
                                        <TableCell align="left" sx={{ width: 80 }}>
                                            <IconButton aria-label="view" sx={{ color: "#0288d1" }} component={Link} to={`/user/apartments/orders/view/${row.id}`} style={{ textDecoration: 'none' }}>
                                                <VisibilityOutlined />
                                            </IconButton>
                                            <IconButton style={{ display: row.orderStatusName != "Processing" ? 'none' : 'inline-flex' }} aria-label="cancel" sx={{ color: "#52b202" }} onClick={() => BookedOrderHandle(row.id)}>
                                                <AssignmentTurnedInOutlined />
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
                                        count={orders.length}
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

export default ApartmentOrdersList