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
import { Form, FormikProvider, useFormik } from "formik";

import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useActions } from "../../../../hooks/useActions";
import { CountryServerError } from "../types";
import { CountrySchema } from "../validation";
import { CssTextField } from "../../../comon/CssTextField";

const UpdateCountry = () => {
    let { id } = useParams() as any;
    const { GetCountry, UpdateCountry } = useActions();
    const [loading, setLoading] = useState<boolean>(false);

    const { selectedCountry } = useTypedSelector((store) => store.country);
    const navigate = useNavigate();

    useEffect(() => {
        async function getCountry() {
            setLoading(true);
            try {
                document.title = "Update country";
                await GetCountry(id);
                setLoading(false);
            } catch (ex) {
                console.log("Problem fetch");
                setLoading(false);
            }
        }
        getCountry();
    }, []);

    const formik = useFormik({
        initialValues: selectedCountry,
        validationSchema: CountrySchema,
        enableReinitialize: true,
        onSubmit: async (values, { setFieldError }) => {
            try {
                await UpdateCountry(id, values);
                navigate("/admin/countries/list");
                toast.success('Update success!', { position: "top-right" });
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
                let message = "Update failed! \n";
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
                        Update country
                    </Typography>
                    <Button variant="contained" size="large" component={Link} to={`/admin/countries/list`} style={{ backgroundColor: "#45A29E", textDecoration: 'none', color: 'white' }}>
                        Back
                    </Button>
                </Stack>
                {loading ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress sx={{ color: "#66fcf1", mt: 3 }} />
                </Box> :
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
                                    <Grid item xs={12}>
                                        <CssTextField
                                            fullWidth
                                            autoComplete="code"
                                            type="text"
                                            label="Code"
                                            {...getFieldProps('code')}
                                            error={Boolean(touched.code && errors.code)}
                                            helperText={touched.code && errors.code}
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
                                            Update
                                        </LoadingButton>
                                    </Grid>
                                </Grid>

                            </Form>
                        </FormikProvider>
                    </Box>
                }
            </Box>
        </>
    );
}

export default UpdateCountry