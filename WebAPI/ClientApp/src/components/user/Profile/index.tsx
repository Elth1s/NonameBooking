import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Slide,
    Stack,
    Typography,
    CircularProgress
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import Cropper from "cropperjs";
import { toast } from "react-toastify";
import { Form, FormikProvider, useFormik } from "formik";
import React, { LegacyRef, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { CssTextField } from "../../comon/CssTextField";
import { ProfileSchema } from "./validation";
import { ProfileServerError } from "./types";
import { base64ImageToBlob } from "./actions";

import defaultImage from "../../../images/download-photo.png"
import { baseURL } from "../../../http_comon"


const Transition = React.forwardRef(function Transition(props: any, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const Profile = () => {
    const [fileSelected, setFileSelected] = React.useState<string>(defaultImage)
    const [cropperObj, setCropperObj] = useState<Cropper>();
    const imgRef = useRef<HTMLImageElement>(null);

    const { GetProfile, UpdateProfile } = useActions();
    const [loading, setLoading] = useState<boolean>(false);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);


    const { id } = useTypedSelector((store) => store.auth.user);
    const { userInfo } = useTypedSelector((store) => store.profile);

    const navigate = useNavigate();

    useEffect(() => {
        async function getProfile() {
            setLoading(true);
            try {
                document.title = "Profile";
                await GetProfile(id);
                setLoading(false);
            } catch (ex) {
                console.log("Problem fetch");
                setLoading(false);
            }
        }
        getProfile();
    }, []);

    const formik = useFormik({
        initialValues: userInfo,
        // validationSchema: ProfileSchema,
        enableReinitialize: true,
        onSubmit: async (values, { setFieldError }) => {
            try {
                if (cropperObj) {
                    let blob: Blob;
                    if (imgRef.current?.src) {
                        blob = base64ImageToBlob(imgRef.current?.src)
                        var file = new File([blob], "image.png");
                        await UpdateProfile(id, values, file);
                    }
                }
                else {
                    await UpdateProfile(id, values);
                }
                toast.success('Update success!');
            }
            catch (exeption) {
                const serverErrors = exeption as ProfileServerError;
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

        setIsDialogOpen(true);
    }

    const handleImageChange = async function (e: React.ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files;
        if (!fileList || fileList.length == 0) return;

        await selectImage(URL.createObjectURL(fileList[0]));
    };

    const rotateImg = () => {
        cropperObj?.rotate(90);
    };

    const modalClose = () => {
        setIsDialogOpen(false);
    };

    const modalSave = async function (e: React.MouseEvent<HTMLElement>) {
        const base = cropperObj?.getCroppedCanvas().toDataURL() as string;
        await setFileSelected(base)
        setIsDialogOpen(false);
    };

    const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

    return (
        <Box sx={{ flexGrow: 1, m: 1, mx: 3, }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1 }}>
                <Typography variant="h4" gutterBottom color="#55FCF1" sx={{ my: "auto" }}>
                    Profile info
                </Typography>
            </Stack>
            {loading ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress sx={{ color: "#66fcf1", mt: 3 }} />
            </Box> :
                <>
                    <Box sx={{ mt: 3 }} >
                        <FormikProvider value={formik} >
                            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                                <Stack direction="row">
                                    <Grid container spacing={4} sx={{ width: "70%" }}>
                                        <Grid item xs={12} md={6}>
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
                                        <Grid item xs={12} md={6}>
                                            <CssTextField
                                                fullWidth
                                                autoComplete="surname"
                                                type="text"
                                                label="Surname"
                                                {...getFieldProps('surname')}
                                                error={Boolean(touched.surname && errors.surname)}
                                                helperText={touched.surname && errors.surname}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <CssTextField
                                                fullWidth
                                                autoComplete="phone"
                                                type="text"
                                                label="Phone"
                                                {...getFieldProps('phone')}
                                                error={Boolean(touched.phone && errors.phone)}
                                                helperText={touched.phone && errors.phone}
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
                                    <Grid container sx={{ display: 'flex', justifyContent: 'center', width: "30%" }} >
                                        {formik.values.photo == "" || formik.values.photo == null || cropperObj != null
                                            ? <>
                                                <label htmlFor="Image">
                                                    <img
                                                        src={fileSelected}
                                                        alt="Image"
                                                        style={{ width: "160px", height: "160px", cursor: "pointer" }} />
                                                </label>
                                                <input style={{ display: "none" }} type="file" name="Image" id="Image" onChange={handleImageChange} />
                                            </>
                                            : <>
                                                <label htmlFor="Image">
                                                    <img
                                                        src={baseURL + formik.values.photo}
                                                        alt="Image"
                                                        style={{ width: "160px", height: "160px", cursor: "pointer", borderRadius: 7 }} />
                                                </label>
                                                <input style={{ display: "none" }} type="file" name="Image" id="Image" onChange={handleImageChange} />
                                            </>
                                        }

                                    </Grid>
                                </Stack>

                            </Form>
                        </FormikProvider>
                    </Box>
                    <Dialog
                        open={isDialogOpen}
                        TransitionComponent={Transition}
                        maxWidth="md"
                        keepMounted
                        onClose={modalClose}
                        aria-describedby="alert-dialog-slide-description"

                    >
                        <DialogTitle sx={{ m: 0, p: 2 }}>
                            Modal title
                            <IconButton
                                aria-label="close"
                                onClick={modalClose}
                                sx={{
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                    color: (theme) => theme.palette.grey[500],
                                }}
                            >
                                <Close />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent dividers>

                            <img ref={imgRef as LegacyRef<HTMLImageElement>}
                                src={fileSelected} />

                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={modalSave}>
                                Save changes
                            </Button>
                        </DialogActions>

                    </Dialog >
                </>
            }
        </Box>
    )
}

export default Profile;