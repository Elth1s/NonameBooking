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
import Cropper from "cropperjs";
import { toast } from "react-toastify";
import { Form, FormikProvider, useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useActions } from "../../../../hooks/useActions";
import { CssTextField } from "../../../comon/CssTextField";
import { CitySchema } from "../validation";
import { CityServerError, IAdminCity } from "../types";
import { base64ImageToBlob } from "../../../comon/CropperDialog/actions";
import CropperDialog from "../../../comon/CropperDialog";
import CustomPopper from "../../../comon/CustomPopper";

import defaultImage from "../../../../images/download-photo.png"

const Transition = React.forwardRef(function Transition(props: any, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const CreateCity = () => {
    const [fileSelected, setFileSelected] = React.useState<string>(defaultImage)
    const [cropperObj, setCropperObj] = useState<Cropper>();
    const imgRef = useRef<HTMLImageElement>(null);

    const { countries } = useTypedSelector((state) => state.home);
    const [loading, setLoading] = useState<boolean>(false);
    const [isCropperDialogOpen, setIsCropperDialogOpen] = React.useState(false);
    const { GetCountries, CreateCity } = useActions();
    const navigate = useNavigate();

    async function getCountries() {
        setLoading(true);
        try {
            await GetCountries();
            setLoading(false);
        } catch (ex) {
            console.log("Problem fetch");
            setLoading(false);
        }
    }
    useEffect(() => {
        document.title = "Create city";
        getCountries();
    }, []);


    const cityModel: IAdminCity = { name: '', countryId: '', image: '', countryName: '' };

    const formik = useFormik({
        initialValues: cityModel,
        validationSchema: CitySchema,
        enableReinitialize: true,
        onSubmit: async (values, { setFieldError }) => {
            try {
                if (cropperObj) {
                    let blob: Blob;
                    if (imgRef.current?.src) {
                        blob = base64ImageToBlob(imgRef.current?.src)
                        var file = new File([blob], "image.png");
                        await CreateCity(values, file)
                        navigate("/admin/cities/list");
                        toast.success('City create successfully!');
                    }
                }
                else {
                    toast.error('File is required.');
                }
            }
            catch (exeption) {
                const serverErrors = exeption as CityServerError;
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

    const selectImage = async (url: string) => {
        if (!cropperObj) {
            const cropper = new Cropper(imgRef.current as HTMLImageElement, {
                aspectRatio: 1 / 1,
                viewMode: 1,
                dragMode: 'move',
            });
            cropper.replace(url);
            setCropperObj(cropper);
        }
        else
            cropperObj?.replace(url);

        setIsCropperDialogOpen(true);
    }

    const handleImageChange = async function (e: React.ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files;
        if (!fileList || fileList.length === 0) return;

        await selectImage(URL.createObjectURL(fileList[0]));
    };

    // const rotateImg = () => {
    //     cropperObj?.rotate(90);
    // };

    const cropperDialogClose = () => {
        setIsCropperDialogOpen(false);
    };

    const { errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

    const cropperDialogSave = async function (e: React.MouseEvent<HTMLElement>) {
        const base = cropperObj?.getCroppedCanvas().toDataURL() as string;
        await setFileSelected(base)
        setIsCropperDialogOpen(false);
    };


    return (
        <Box sx={{ flexGrow: 1, m: 1, mx: 3, width: { xl: "50%", lg: "65%", md: "95%" } }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1 }}>
                <Typography variant="h4" gutterBottom color="#55FCF1" sx={{ my: "auto" }}>
                    Create city
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
                                <Grid item xs={12}>
                                    <Autocomplete
                                        options={countries}
                                        autoHighlight
                                        loading={loading}
                                        onChange={(e, value) => {
                                            console.log(value)
                                            if (value) {
                                                setFieldValue("countryId", value?.id)
                                            }
                                            else {
                                                setFieldValue("countryId", "")
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
                            <Grid item sx={{ display: 'flex', justifyContent: 'end', width: "30%" }} >
                                <label htmlFor="Image">
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
            <CropperDialog
                Transition={Transition}
                imgRef={imgRef}
                modalSave={cropperDialogSave}
                isDialogOpen={isCropperDialogOpen}
                modalClose={cropperDialogClose}
                image={fileSelected} />
        </Box>
    )
}

export default CreateCity;