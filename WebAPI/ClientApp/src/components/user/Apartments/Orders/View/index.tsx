import {
    Box,
    Button,
    Grid,
    Stack,
    Typography,
    CircularProgress
} from "@mui/material";

import { LoadingButton } from "@mui/lab";
import { toast } from 'react-toastify';

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useTypedSelector } from "../../../../../hooks/useTypedSelector";
import { useActions } from "../../../../../hooks/useActions";

import { CssTextField } from "../../../../comon/CssTextField";

const ApartmentViewOrder = () => {
    let { id } = useParams() as any;
    const { GetApartmentSelectedOrderByIdAction } = useActions();
    const [loading, setLoading] = useState<boolean>(false);

    const { selectedOrder } = useTypedSelector((store) => store.currentUserApartment);
    const navigate = useNavigate();

    useEffect(() => {
        async function getOrder() {
            setLoading(true);
            try {
                document.title = "Order";
                await GetApartmentSelectedOrderByIdAction(id);
                setLoading(false);
            } catch (ex) {
                toast.error("Loading order failed.");
                setLoading(false);
            }
        }
        getOrder();
    }, []);



    return (
        <>
            <Box sx={{ flexGrow: 1, m: 1, mx: 3, width: { lg: "55%", md: "95%" } }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1 }}>
                    <Typography variant="h4" gutterBottom color="#55FCF1" sx={{ my: "auto" }}>
                        Order
                    </Typography>
                    <Button variant="contained" size="large" component={Link} to={`/user/apartments/orders/list/${selectedOrder.apartmentId}`} style={{ backgroundColor: "#45A29E", textDecoration: 'none', color: 'white' }}>
                        Back
                    </Button>
                </Stack>
                {loading ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress sx={{ color: "#66fcf1", mt: 3 }} />
                </Box> :
                    <Box sx={{ mt: 3 }} >
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <CssTextField
                                    fullWidth
                                    type="text"
                                    label="Id"
                                    value={id}
                                    inputProps={
                                        { readOnly: true, }
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CssTextField
                                    fullWidth
                                    type="text"
                                    label="Apartment"
                                    value={selectedOrder.apartmentName}
                                    inputProps={
                                        { readOnly: true, }
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CssTextField
                                    fullWidth
                                    type="text"
                                    label="Full name"
                                    value={selectedOrder.userFullName}
                                    inputProps={
                                        { readOnly: true, }
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <CssTextField
                                    fullWidth
                                    type="text"
                                    label="Start"
                                    value={new Date(selectedOrder.start).toLocaleDateString('en-GB')}
                                    inputProps={
                                        { readOnly: true, }
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <CssTextField
                                    fullWidth
                                    type="text"
                                    label="End"
                                    value={new Date(selectedOrder.end).toLocaleDateString('en-GB')}
                                    inputProps={
                                        { readOnly: true, }
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CssTextField
                                    fullWidth
                                    type="text"
                                    label="Total"
                                    value={`${selectedOrder.total} $`}
                                    inputProps={
                                        { readOnly: true, }
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CssTextField
                                    fullWidth
                                    type="text"
                                    label="Status"
                                    value={selectedOrder.orderStatusName}
                                    inputProps={
                                        { readOnly: true, }
                                    }
                                />
                            </Grid>

                        </Grid>
                    </Box>
                }
            </Box>
        </>
    );
}
export default ApartmentViewOrder;