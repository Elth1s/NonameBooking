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
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useActions } from "../../../../hooks/useActions";
import { CssTextField } from "../../../comon/CssTextField";
import { ApartmentSchema } from "../validation";
import { ApartmentServerError, IApartment } from "../types";
import CustomPopper from "../../../comon/CustomPopper";
import { base64ImageToBlob } from "../../../comon/CropperDialog/actions";
import defaultImage from "../../../../images/download-photo.png"


const CreateApartment = () => {
    const [fileSelected, setFileSelected] = React.useState<string>(defaultImage)
    const [value, setValue] = useState<any>(null);
    const { countries, cities } = useTypedSelector((state) => state.home);
    const { types } = useTypedSelector((state) => state.adminTypeOfApartment);
    const [loading, setLoading] = useState<boolean>(false);
    const userId = useTypedSelector((store) => store.auth.user.id);
    const { GetCountries, GetCitiesByCountryId, GetAdminTypeOfApartments, CreateApartment } = useActions();
    const navigate = useNavigate();

    async function getCountries() {
        setLoading(true);
        try {
            await GetCountries();
            setLoading(false);
        } catch (ex) {
            console.log("Problem fetch countries");
            setLoading(false);
        }
    }
    async function getCitiesByCountryId(id: number) {
        setLoading(true);
        try {
            await GetCitiesByCountryId(id);
            setLoading(false);
        } catch (ex) {
            console.log("Problem fetch cities");
            setLoading(false);
        }
    }
    async function getTypeOfApartments() {
        setLoading(true);
        try {
            await GetAdminTypeOfApartments();
            setLoading(false);
        } catch (ex) {
            console.log("Problem fetch types");
            setLoading(false);
        }
    }
    useEffect(() => {
        document.title = "Create apartment";
        getCountries();
        getTypeOfApartments();
    }, []);


    const apartmantModel: IApartment = {
        name: '', countryId: 0, countryName: '', cityId: 0, cityName: '',
        description: '', ownerId: userId, ownerFullName: '', bathrooms: 1, bedrooms: 1, beds: 1,
        images: [],
        typeOfApartmentId: 0,
        typeOfApartmentName: '',
        price: 1, address: '', filterGroupWithFilters: []
    };

    const formik = useFormik({
        initialValues: apartmantModel,
        // validationSchema: ApartmentSchema,
        enableReinitialize: true,
        onSubmit: async (values, { setFieldError }) => {
            try {
                console.log(values)
                await CreateApartment(values, null)
                navigate("/user/apartments/list");
                toast.success('Apartment create successfully!');
            }
            catch (exeption) {
                const serverErrors = exeption as ApartmentServerError;
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
                toast.error(message);
            }

        }
    });


    const handleImageChange = async function (e: React.ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files;
        // if (!fileList || fileList.length === 0) return;

        // await selectImage(URL.createObjectURL(fileList[0]));
    };


    const { errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;


    return (
        <Box sx={{ flexGrow: 1, m: 1, mx: 3, width: { lg: "75%", md: "95%" } }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1 }}>
                <Typography variant="h4" gutterBottom color="#55FCF1" sx={{ my: "auto" }}>
                    Create apartment
                </Typography>
                <Button variant="contained" size="large" component={Link} to={`/admin/cities/list`} style={{ backgroundColor: "#45A29E", textDecoration: 'none', color: 'white' }}>
                    Back
                </Button>
            </Stack>
            <Box sx={{ mt: 3 }} >
                <FormikProvider value={formik} >
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit} >
                        <Box sx={{ width: "100%", display: "flex" }}>
                            <Grid item sx={{ width: "70%" }}>
                                <Grid item xs={12} mb={3}>
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
                                <Grid item xs={12} mb={3}>
                                    <CssTextField
                                        fullWidth
                                        autoComplete="address"
                                        type="text"
                                        label="Address"
                                        {...getFieldProps('address')}
                                        error={Boolean(touched.address && errors.address)}
                                        helperText={touched.address && errors.address}
                                    />
                                </Grid>
                                <Grid item xs={12} mb={3}>
                                    <CssTextField
                                        fullWidth
                                        autoComplete="B"
                                        type="text"
                                        label="Description"
                                        multiline
                                        rows={4}
                                        {...getFieldProps('description')}
                                        error={Boolean(touched.description && errors.description)}
                                        helperText={touched.description && errors.description}
                                    />
                                </Grid>
                                <Grid item xs={12} mb={3}>
                                    <CssTextField
                                        fullWidth
                                        autoComplete="price"
                                        type="number"
                                        label="Price"
                                        {...getFieldProps('price')}
                                        error={Boolean(touched.price && errors.price)}
                                        helperText={touched.price && errors.price}
                                    />
                                </Grid>
                                <Grid item xs={12} mb={3}>
                                    <CssTextField
                                        fullWidth
                                        autoComplete="beds"
                                        type="number"
                                        label="Beds"
                                        {...getFieldProps('beds')}
                                        error={Boolean(touched.beds && errors.beds)}
                                        helperText={touched.beds && errors.beds}
                                    />
                                </Grid>
                                <Grid item xs={12} mb={3}>
                                    <CssTextField
                                        fullWidth
                                        autoComplete="bedrooms"
                                        type="number"
                                        label="Bedrooms"
                                        {...getFieldProps('bedrooms')}
                                        error={Boolean(touched.bedrooms && errors.bedrooms)}
                                        helperText={touched.bedrooms && errors.bedrooms}
                                    />
                                </Grid>
                                <Grid item xs={12} mb={3}>
                                    <CssTextField
                                        fullWidth
                                        autoComplete="bathrooms"
                                        type="number"
                                        label="Bathrooms"
                                        {...getFieldProps('bathrooms')}
                                        error={Boolean(touched.bathrooms && errors.bathrooms)}
                                        helperText={touched.bathrooms && errors.bathrooms}
                                    />
                                </Grid>
                                <Grid item xs={12} mb={3}>
                                    <Autocomplete
                                        options={countries}
                                        autoHighlight
                                        loading={loading}
                                        onChange={(e, value) => {
                                            console.log(value)
                                            if (value) {
                                                setFieldValue("countryId", value?.id)
                                                getCitiesByCountryId(value?.id);
                                                setFieldValue("cityId", "")
                                                setValue(null)
                                            }
                                            else {
                                                setFieldValue("countryId", "")
                                                setFieldValue("cityId", "")
                                                setValue(null)
                                                getCitiesByCountryId(0);
                                            }
                                        }}
                                        getOptionLabel={(option) => option.name}
                                        renderOption={(props, option) => (
                                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 }, backgroundColor: "#18181b" }} {...props}>
                                                <img
                                                    loading="lazy"
                                                    width="20"
                                                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                    alt=""
                                                />
                                                {option.name}
                                            </Box>
                                        )}
                                        renderInput={(params) => (
                                            <CssTextField
                                                {...params}
                                                {...getFieldProps('countryId')}
                                                label="Country *"
                                                error={Boolean(touched.countryId && errors.countryId)}
                                                helperText={touched.countryId && errors.countryId}
                                                inputProps={{
                                                    ...params.inputProps
                                                }}
                                            />
                                        )}
                                        PopperComponent={CustomPopper}
                                    />
                                </Grid>
                                <Grid item xs={12} mb={3}>
                                    <Autocomplete
                                        options={cities}
                                        autoHighlight
                                        value={value}
                                        autoComplete={false}
                                        onChange={(e, value) => {
                                            setFieldValue("cityId", value?.id)
                                            setValue(value);
                                        }}
                                        getOptionLabel={(option) => option.name}
                                        renderOption={(props, option) => (
                                            <Box key={option.id} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                {option.name}
                                            </Box>
                                        )}
                                        renderInput={(params) => (
                                            <CssTextField
                                                {...params}
                                                {...getFieldProps('cityId')}
                                                label="City"
                                                inputProps={{
                                                    ...params.inputProps,
                                                }}
                                            />
                                        )}
                                        PopperComponent={CustomPopper}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Autocomplete
                                        options={types}
                                        autoHighlight
                                        loading={loading}
                                        onChange={(e, value) => {
                                            console.log(value)
                                            if (value) {
                                                setFieldValue("typeOfApartmentId", value?.id)
                                            }
                                            else {
                                                setFieldValue("typeOfApartmentId", "")
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
                                                {...getFieldProps('typeOfApartmentId')}
                                                label="Type Of apartment *"
                                                error={Boolean(touched.typeOfApartmentId && errors.typeOfApartmentId)}
                                                helperText={touched.typeOfApartmentId && errors.typeOfApartmentId}
                                                inputProps={{
                                                    ...params.inputProps
                                                }}
                                            />
                                        )}
                                        PopperComponent={CustomPopper}
                                    />

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
                            </Grid>
                            <Grid item sx={{ display: 'flex', justifyContent: 'end', width: "30%" }} >
                                <label htmlFor="Image" style={{ height: "160px" }}>
                                    <img
                                        src={fileSelected}
                                        alt="Image"
                                        style={{ width: "160px", height: "160px", cursor: "pointer", borderRadius: 7 }} />
                                </label>
                                <input style={{ display: "none" }} type="file" name="Image" id="Image" onChange={handleImageChange} />
                            </Grid>
                        </Box>

                    </Form>
                </FormikProvider>
            </Box>
        </Box>
    )
}

export default CreateApartment;