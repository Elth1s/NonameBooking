import {
    Dialog,
    DialogTitle,
    IconButton,
    DialogContent,
    Typography,
    DialogActions,
    Button,
    Grid,
    InputAdornment
} from "@mui/material";
import { Close, Visibility, VisibilityOff } from '@mui/icons-material';

import { FC, useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import { toast } from "react-toastify";

import { ChangePasswordServerError, IChangePasswordModel } from "./types";
import { ChangePasswordSchema } from "./validation";
import { CssTextField } from "../CssTextField";
import { LoadingButton } from "@mui/lab";
import { useActions } from "../../../hooks/useActions";


interface IChangePasswordDialog {
    isChangePasswordDialogOpen: boolean,
    Transition: any,
    changePasswordDialogClose: any,
    id: string
}

const ChangePasswordDialog: FC<IChangePasswordDialog> = ({ isChangePasswordDialogOpen, Transition, changePasswordDialogClose, id }) => {
    const { ChangePassword } = useActions();

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const changePasswordModel: IChangePasswordModel = { oldPassword: '', password: '', confirmPassword: '' };

    const formik = useFormik({
        initialValues: changePasswordModel,
        validationSchema: ChangePasswordSchema,
        onSubmit: async (values, { setFieldError }) => {
            try {
                await ChangePassword(id, values);
                toast.success('Change password success!');
                changePasswordDialogClose()
            }
            catch (exeption) {
                const serverErrors = exeption as ChangePasswordServerError;
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
                let message = "Change password failed! \n";
                if (serverErrors.status === 400)
                    message += serverErrors.title
                toast.error(message);
            }

        }
    });

    const handleShowOldPassword = () => {
        setShowOldPassword((show) => !show);
    };
    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword((show) => !show);
    };

    const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

    return (
        <Dialog
            open={isChangePasswordDialogOpen}
            TransitionComponent={Transition}
            maxWidth="md"
            keepMounted
            onClose={changePasswordDialogClose}
            aria-describedby="alert-dialog-slide-description"
            PaperProps={{
                style: { borderRadius: 10, background: "#18181b", minWidth: "550px", minHeight: "300px" }
            }}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} color="#55FCF1">
                Update password
                <IconButton
                    aria-label="close"
                    onClick={changePasswordDialogClose}
                    sx={{
                        position: 'absolute',
                        my: "auto",
                        right: 8,
                        top: 10,
                        color: "#55FCF1"
                    }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>
            <FormikProvider value={formik} >
                <Form autoComplete="off" noValidate onSubmit={handleSubmit} >
                    <DialogContent dividers sx={{ borderColor: '#45A29E' }}>

                        <Grid sx={{ p: 3, maxWidth: "600px" }} container spacing={4}>
                            <Grid item xs={12}>
                                <CssTextField
                                    fullWidth
                                    autoComplete="oldPassword"
                                    type={showOldPassword ? 'text' : 'password'}
                                    label="Old password"
                                    {...getFieldProps('oldPassword')}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleShowOldPassword} edge="end">
                                                    {showOldPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    error={Boolean(touched.oldPassword && errors.oldPassword)}
                                    helperText={touched.oldPassword && errors.oldPassword}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <CssTextField
                                    fullWidth
                                    autoComplete="password"
                                    type={showPassword ? 'text' : 'password'}
                                    label="Password"
                                    {...getFieldProps('password')}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleShowPassword} edge="end">
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    error={Boolean(touched.password && errors.password)}
                                    helperText={touched.password && errors.password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CssTextField
                                    fullWidth
                                    autoComplete="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    label="Confirm password"
                                    {...getFieldProps('confirmPassword')}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleShowConfirmPassword} edge="end">
                                                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                                    helperText={touched.confirmPassword && errors.confirmPassword}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <LoadingButton
                            type="submit"
                            loading={isSubmitting}
                            sx={{ paddingX: "35px" }}
                            size="large"
                            variant="contained"
                            style={{ backgroundColor: "#45A29E" }}
                        >
                            Change
                        </LoadingButton>
                    </DialogActions>
                </Form>
            </FormikProvider>
        </Dialog >
    )
}

export default ChangePasswordDialog;
