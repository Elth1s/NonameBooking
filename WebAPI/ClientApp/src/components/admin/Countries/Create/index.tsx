import {
    Box,
    Button,
    Grid,
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
import { LoadingButton } from "@mui/lab";
import { makeStyles } from '@mui/styles';

import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import TablePaginationActions from "../../../comon/TablePaginationActions";
import { useEffect, useState } from "react";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useActions } from "../../../../hooks/useActions";
import { CountryServerError, ICountry } from "../types";
import { Form, FormikProvider, useFormik } from "formik";
import { CountrySchema } from "../validation";
import { CssTextField } from "../../../comon/CssTextField";

const CreateCountry = () => {
    const navigate = useNavigate();
    const { CreateCountry } = useActions();

    useEffect(() => {
        document.title = "Create country";
    }, []);

    const countryModel: ICountry = { name: '' };

    const formik = useFormik({
        initialValues: countryModel,
        // validationSchema: CountrySchema,
        onSubmit: async (values, { setFieldError }) => {
            try {
                await CreateCountry(values);
                navigate("/admin/countries/list");
                toast.success('Create success!', { position: "top-right" });
            }
            catch (exeption) {
                const serverErrors = exeption as CountryServerError;
                console.log(serverErrors)
                if (serverErrors.errors)
                    Object.entries(serverErrors.errors).forEach(([key, value]) => {
                        if (Array.isArray(value)) {
                            let message = "";
                            value.forEach((item) => {
                                message += `${item} `;
                            });
                            setFieldError(key.toLowerCase(), message);
                        }
                    });
                let message = "Create failed! \n";
                if (serverErrors.status === 400)
                    message += "Validation failed.";
                toast.error(message, { position: "top-right" });
            }

        }
    });

    const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;


    return (
        <>
            <Box sx={{ flexGrow: 1, m: 1, mx: 3, width: { xl: "40%", lg: "55%", md: "95%" } }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1 }}>
                    <Typography variant="h4" gutterBottom color="#55FCF1" sx={{ my: "auto" }}>
                        Create country
                    </Typography>
                    <Button variant="contained" size="large" component={Link} to={`/admin/countries/list`} style={{ backgroundColor: "#45A29E", textDecoration: 'none', color: 'white' }}>
                        Back
                    </Button>
                </Stack>
                <Box sx={{ mt: 3 }} >
                    <FormikProvider value={formik} >
                        <Form autoComplete="off" noValidate onSubmit={handleSubmit} >
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <CssTextField
                                        fullWidth
                                        autoComplete="name"
                                        type="text"
                                        label="Name"
                                        {...getFieldProps('name')}
                                        error={Boolean(touched.name && errors.name)}
                                        helperText={touched.name && errors.name}
                                    />
                                </Grid>

                                <Grid item xs={12} mt={3} display="flex" justifyContent="end" >
                                    <LoadingButton
                                        sx={{ paddingX: "35px" }}
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        loading={isSubmitting}
                                        style={{ backgroundColor: "#45A29E" }}
                                    >
                                        Create
                                    </LoadingButton>
                                </Grid>
                            </Grid>

                        </Form>
                    </FormikProvider>
                </Box>
            </Box>
        </>
    );
}

export default CreateCountry