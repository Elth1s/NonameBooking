import {
    Autocomplete,
    Avatar,
    Box,
    IconButton,
    Typography
} from "@mui/material";
import { Search } from '@mui/icons-material';
import {
    Form,
    FormikProvider,
    useFormik
} from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import { CssTextField } from "../comon/CssTextField";
import { ISearch } from "./types";
import { SearchSchema } from "./validation";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";

const HomePage = () => {
    const navigate = useNavigate();

    const { countries, cities } = useTypedSelector((state) => state.home);
    const { GetCountries, GetCitiesByCountryId } = useActions();

    const [value, setValue] = useState<any>(null);

    async function getCountries() {
        try {
            await GetCountries();
        } catch (ex) {
            console.log("Problem fetch");
        }
    }
    async function getCitiesByCountryId(id: number) {
        try {
            await GetCitiesByCountryId(id);
        } catch (ex) {
            console.log("Problem fetch");
        }
    }
    useEffect(() => {
        document.title = "Noname Booking";
        getCountries();
    }, []);


    const searchModel: ISearch = { countryId: "", cityId: "" };
    const formik = useFormik({
        initialValues: searchModel,
        validationSchema: SearchSchema,
        onSubmit: async (values, { setFieldError }) => {
            if (values.cityId)
                navigate(`/apartments?countryId=${values.countryId}&cityId=${values.cityId}`)
            else
                navigate(`/cities?countryId=${values.countryId}&cityId=${"NONE"}`)

        }
    });


    const { errors, touched, handleSubmit, getFieldProps, setFieldValue } = formik;

    return (
        <>
            <Box sx={{ borderRadius: "30px", height: "90vh", backgroundImage: "url(https://images.unsplash.com/photo-1594237926304-3e833086e6ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80)", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                <Typography variant="h2" gutterBottom component="div" sx={{ py: 4 }} style={{ textAlign: "center" }}>
                    Not sure where to stay?<br />
                    Great!
                </Typography>
                <FormikProvider value={formik} >
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit} >
                        <Box sx={{ display: 'flex', justifyContent: 'center', }}>
                            <Autocomplete
                                sx={{ width: 223, marginX: 2 }}
                                options={countries}
                                autoHighlight
                                onChange={(e, value) => {
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
                                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
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
                                            ...params.inputProps,
                                            autoComplete: 'countryId',
                                        }}
                                    />
                                )}
                            />

                            <Autocomplete
                                sx={{ width: 223, marginX: 2 }}
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
                                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
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
                                            autoComplete: 'cityId',
                                        }}
                                    />
                                )}
                            />
                            {/* <CssTextField
                                sx={{ marginX: 2 }}
                                autoComplete="city"
                                label="City"
                                {...getFieldProps('city')}
                                error={Boolean(touched.city && errors.city)}
                                helperText={touched.city && errors.city} />
                            <CssTextField
                                sx={{ marginX: 2 }}
                                autoComplete="city"
                                label="City"
                                {...getFieldProps('city')}
                                error={Boolean(touched.city && errors.city)}
                                helperText={touched.city && errors.city} /> */}
                            <IconButton
                                sx={{ paddingY: 0, height: 52 }}
                                type="submit"
                            >
                                <Avatar sx={{ width: 52, height: 52, backgroundColor: "#45a29e" }} >
                                    <Search fontSize="large" />
                                </Avatar>
                            </IconButton>
                        </Box>
                    </Form>
                </FormikProvider>
            </Box>
        </>
    );
}

export default HomePage;