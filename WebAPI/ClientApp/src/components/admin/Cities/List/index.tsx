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
    Delete,
    Edit,
    KeyboardArrowDown
} from "@mui/icons-material";
import { makeStyles } from '@mui/styles';
import { baseURL } from "../../../../http_comon"
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

import TablePaginationActions from "../../../comon/TablePaginationActions";
import { useEffect, useState } from "react";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useActions } from "../../../../hooks/useActions";
import { CityServerError } from "../types";

const CitiesList = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const { cities } = useTypedSelector((state) => state.adminCity);
    const { GetCities, DeleteCity } = useActions();

    async function getCities() {
        setLoading(true);
        try {
            await GetCities();
            setLoading(false);
        } catch (ex) {
            console.log("Problem fetch");
            setLoading(false);
        }
    }
    useEffect(() => {
        document.title = "Cities";
        getCities();
    }, []);

    const DeleteCityHandle = async (id: number) => {
        setLoading(true);
        try {
            await DeleteCity(id);
            await GetCities();
            setLoading(false);
            toast.success('City deleted successfully.', { position: "top-right" });
        }
        catch (exeption) {
            setLoading(false);
            const serverErrors = exeption as CityServerError;
            toast.error(serverErrors.title, { position: "top-right" });
        }
    }


    const handleChangePage = (event: any, newPage: number) => {
        setPage(newPage)
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <Box sx={{ flexGrow: 1, m: 1, mx: 3, width: { lg: "60%", md: "95%" } }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1 }}>
                    <Typography variant="h4" gutterBottom color="#55FCF1" sx={{ my: "auto" }}>
                        Cities
                    </Typography>
                    <Button variant="contained" size="large" component={Link} to={`/admin/cities/create`} style={{ backgroundColor: "#45A29E", textDecoration: 'none', color: 'white' }}>
                        Create city
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
                                    <TableCell sx={{ width: 70 }}>
                                        Image
                                    </TableCell>
                                    <TableCell align="center">
                                        Name
                                    </TableCell>
                                    <TableCell align="center">
                                        Country name
                                    </TableCell>
                                    <TableCell align="right">
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? cities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : cities
                                ).map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell scope="row" sx={{ width: 70 }} align="center" >
                                            {row.id}.
                                        </TableCell>
                                        <TableCell sx={{ width: 70 }}>
                                            <Avatar
                                                src={baseURL + row.image}
                                                alt="Image"
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.countryName}
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton aria-label="edit" sx={{ color: "#ffb74d" }} component={Link} to={`/admin/cities/update/${row.id}`} style={{ textDecoration: 'none', color: '#ffb74d' }}>
                                                <Edit />
                                            </IconButton>
                                            <IconButton aria-label="delete" sx={{ color: "#d32f2f" }} onClick={() => DeleteCityHandle(row.id)}>
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
                                        colSpan={3}
                                        count={cities.length}
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

export default CitiesList