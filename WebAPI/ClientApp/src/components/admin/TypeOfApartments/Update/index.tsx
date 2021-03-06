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
import { TypeOfApartmentServerError } from "../types";
import { TypeOfApartmentSchema } from "../validation";
import { CssTextField } from "../../../comon/CssTextField";

const UpdateTypeOfApartment = () => {
    let { id } = useParams() as any;
    const { GetAdminTypeOfApartment, UpdateTypeOfApartment } = useActions();
    const [loading, setLoading] = useState<boolean>(false);

    const { selectedType } = useTypedSelector((store) => store.adminTypeOfApartment);
    const navigate = useNavigate();

    useEffect(() => {
        async function getTypeOfApartment() {
            setLoading(true);
            try {
                document.title = "Update type of apartment";
                await GetAdminTypeOfApartment(id);
                setLoading(false);
            } catch (ex) {
                toast.error("Loading type of apartment failed.");
                setLoading(false);
            }
        }
        getTypeOfApartment();
    }, []);

    const formik = useFormik({
        initialValues: selectedType,
        validationSchema: TypeOfApartmentSchema,
        enableReinitialize: true,
        onSubmit: async (values, { setFieldError }) => {
            try {
                await UpdateTypeOfApartment(id, values);
                navigate("/admin/typeOfApartments/list");
                toast.success('Update success!', { position: "top-right" });
            }
            catch (exeption) {
                const serverErrors = exeption as TypeOfApartmentServerError;
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
                        Update type of apartment
                    </Typography>
                    <Button variant="contained" size="large" component={Link} to={`/admin/typeOfApartments/list`} style={{ backgroundColor: "#45A29E", textDecoration: 'none', color: 'white' }}>
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

export default UpdateTypeOfApartment