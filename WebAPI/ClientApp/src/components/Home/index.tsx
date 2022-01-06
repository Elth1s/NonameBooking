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
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


import { CssTextField } from "../comon/CssTextField";
import { ISearch } from "./types";
import { SearchSchema } from "./validation";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";

const HomePage = () => {
    const navigate = useNavigate();

    const { countries } = useTypedSelector((state) => state.home);
    const { GetCountries } = useActions();

    async function getCountries() {
        try {
            await GetCountries();
        } catch (ex) {
            console.log("Problem fetch");
        }
    }
    useEffect(() => {
        getCountries();
    }, []);


    const searchModel: ISearch = { country: "", city: "" };
    const formik = useFormik({
        initialValues: searchModel,
        validationSchema: SearchSchema,
        onSubmit: async (values, { setFieldError }) => {
            console.log(values)
        }
    });

    const { errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

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
                                sx={{ width: 300 }}
                                options={countries}
                                autoHighlight
                                onChange={(e, value) => {
                                    if (value)
                                        setFieldValue("country", value?.name)
                                    else
                                        setFieldValue("country", "")
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
                                        {...getFieldProps('country')}
                                        autoComplete="country"
                                        label="Country *"
                                        error={Boolean(touched.country && errors.country)}
                                        helperText={touched.country && errors.country}
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'country',// disable autocomplete and autofill
                                        }}
                                    />
                                )}
                            />
                            {/* <CssTextField
                                sx={{ marginX: 2 }}
                                autoComplete="country"
                                label="country"
                                {...getFieldProps('country')}
                                error={Boolean(touched.country && errors.country)}
                                helperText={touched.country && errors.country} /> */}
                            <CssTextField
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
                                helperText={touched.city && errors.city} />
                            <CssTextField
                                sx={{ marginX: 2 }}
                                autoComplete="city"
                                label="City"
                                {...getFieldProps('city')}
                                error={Boolean(touched.city && errors.city)}
                                helperText={touched.city && errors.city} />
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