import {
    Box,
    Button,
    Grid,
    Slide,
    Stack,
    Typography,
    CircularProgress,
    Autocomplete,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { Form, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useActions } from "../../../../hooks/useActions";
import { CssTextField } from "../../../comon/CssTextField";
import { FilterSchema } from "../validation";
import { FilterServerError } from "../types";
import CustomPopper from "../../../comon/CustomPopper";

const UpdateFilter = () => {
    const { groups } = useTypedSelector((state) => state.adminFilterGroup);
    const { selectedFilter } = useTypedSelector((store) => store.adminFilter);
    const [loading, setLoading] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>();
    const { GetAdminFilterGroups, GetFilter, UpdateFilter } = useActions();
    let { id } = useParams() as any;
    const navigate = useNavigate();

    async function getFilterGroups() {
        setLoading(true);
        try {
            await GetAdminFilterGroups();
            setLoading(false);
        } catch (ex) {
            toast.error("Loading filter groups failed.");
            setLoading(false);
        }
    }
    async function getFilter() {
        setLoading(true);
        try {
            await GetFilter(id);

            setLoading(false);
        } catch (ex) {
            toast.error("Loading filter failed.");
            setLoading(false);
        }
    }
    useEffect(() => {
        document.title = "Update filter";
        if (selectedFilter.name == "") {
            getFilter();
        }
        getFilterGroups();

    }, [selectedFilter]);

    const formik = useFormik({
        initialValues: selectedFilter,
        validationSchema: FilterSchema,
        enableReinitialize: true,
        onSubmit: async (values, { setFieldError }) => {
            try {
                await UpdateFilter(id, values)
                navigate("/admin/filters/list");
                toast.success('Filter update successfully!');
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
                let message = "Failed to update filter!\n";
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
                    Update filter
                </Typography>
                <Button variant="contained" size="large" component={Link} to={`/admin/filters/list`} style={{ backgroundColor: "#45A29E", textDecoration: 'none', color: 'white' }}>
                    Back
                </Button>
            </Stack>
            {loading ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                < CircularProgress sx={{ color: "#66fcf1", mt: 3 }} />
            </Box> :
                <>
                    <Box sx={{ mt: 3 }} >
                        <FormikProvider value={formik} >
                            <Form autoComplete="off" noValidate onSubmit={handleSubmit} >
                                <Grid container spacing={4}>
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
                                            defaultValue={{ id: selectedFilter.filterGroupId, name: selectedFilter.filterGroupName }}
                                            onChange={(e, value) => {
                                                if (value) {
                                                    setFieldValue("filterGroupId", value?.id)
                                                }
                                                else {
                                                    setFieldValue("filterGroupId", "")
                                                }
                                            }}
                                            getOptionLabel={(option) => option.name}
                                            isOptionEqualToValue={(option, value) => option.id == value.id && option.name == value.name}
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
                                            Update
                                        </LoadingButton>
                                    </Grid>
                                </Grid>
                            </Form>
                        </FormikProvider>
                    </Box>
                </>
            }
        </Box >
    )
}

export default UpdateFilter;