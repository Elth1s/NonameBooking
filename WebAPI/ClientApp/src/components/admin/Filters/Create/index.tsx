import {
    Box,
    Button,
    Grid,
    Slide,
    Stack,
    Typography,
    CircularProgress,
    Autocomplete,
    Popper
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { Form, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useActions } from "../../../../hooks/useActions";
import { CssTextField } from "../../../comon/CssTextField";
import { FilterSchema } from "../validation";
import { FilterServerError, IAdminFilter } from "../types";

import CustomPopper from "../../../comon/CustomPopper";


const CreateFilter = () => {

    const { groups } = useTypedSelector((state) => state.adminFilterGroup);
    const [loading, setLoading] = useState<boolean>(false);
    const { GetAdminFilterGroups, CreateFilter } = useActions();
    const navigate = useNavigate();

    async function getFilterGroups() {
        setLoading(true);
        try {
            await GetAdminFilterGroups();
            setLoading(false);
        } catch (ex) {
            console.log("Problem fetch");
            setLoading(false);
        }
    }
    useEffect(() => {
        document.title = "Create filter";
        getFilterGroups();
    }, []);


    const filterModel: IAdminFilter = { name: '', filterGroupId: "", filterGroupName: "" };

    const formik = useFormik({
        initialValues: filterModel,
        validationSchema: FilterSchema,
        enableReinitialize: true,
        onSubmit: async (values, { setFieldError }) => {
            try {
                await CreateFilter(values)
                navigate("/admin/filters/list");
                toast.success('Filter create successfully!');
            }
            catch (exeption) {
                const serverErrors = exeption as FilterServerError;
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
                toast.error(message);
            }

        }
    });

    const { errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

    return (
        <Box sx={{ flexGrow: 1, m: 1, mx: 3, width: { xl: "40%", lg: "55%", md: "95%" } }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1 }}>
                <Typography variant="h4" gutterBottom color="#55FCF1" sx={{ my: "auto" }}>
                    Create filter
                </Typography>
                <Button variant="contained" size="large" component={Link} to={`/admin/filters/list`} style={{ backgroundColor: "#45A29E", textDecoration: 'none', color: 'white' }}>
                    Back
                </Button>
            </Stack>
            <Box sx={{ mt: 3 }} >
                <FormikProvider value={formik} >
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit} >
                        <Grid container spacing={4} >
                            <Grid item xs={12} >
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
                                <Autocomplete
                                    options={groups}
                                    autoHighlight
                                    loading={loading}
                                    onChange={(e, value) => {
                                        if (value) {
                                            setFieldValue("filterGroupId", value?.id)
                                        }
                                        else {
                                            setFieldValue("filterGroupId", "")
                                        }
                                    }}
                                    getOptionLabel={(option) => option.name}
                                    renderOption={(props, option) => (
                                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 }, backgroundColor: "#18181b" }} {...props}>
                                            {option.name}
                                        </Box>
                                    )}
                                    renderInput={(params) => (
                                        <CssTextField
                                            {...params}
                                            {...getFieldProps('filterGroupId')}
                                            label="Group *"
                                            error={Boolean(touched.filterGroupId && errors.filterGroupId)}
                                            helperText={touched.filterGroupId && errors.filterGroupId}
                                            inputProps={{
                                                ...params.inputProps
                                            }}
                                        />
                                    )}
                                    PopperComponent={CustomPopper}
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
    )
}

export default CreateFilter;