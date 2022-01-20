import {
    Dialog,
    DialogTitle,
    IconButton,
    DialogContent,
    Typography,
    DialogActions,
    Button,
    Grid,
    InputAdornment,
    Stack,
    Divider,
    Box
} from "@mui/material";
import { Close, Visibility, VisibilityOff, FiberManualRecord } from '@mui/icons-material';

import { FC, useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import { toast } from "react-toastify";

import { useActions } from "../../../hooks/useActions";
import { IFilterGroup } from "../../user/types";


interface IPlaceOffersDialog {
    isDialogOpen: boolean,
    dialogClose: any,
    Transition: any,
    filterGroup: Array<IFilterGroup>
}

const PlaceOffersDialog: FC<IPlaceOffersDialog> = ({ isDialogOpen, Transition, dialogClose, filterGroup }) => {

    return (
        <Dialog
            open={isDialogOpen}
            TransitionComponent={Transition}
            maxWidth="md"
            keepMounted
            onClose={dialogClose}
            aria-describedby="alert-dialog-slide-description"
            PaperProps={{
                style: { borderRadius: 10, background: "#18181b", minWidth: "550px", maxHeight: "650px" }
            }}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} color="#55FCF1">
                What this place offers
                <IconButton
                    aria-label="close"
                    onClick={dialogClose}
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
            <DialogContent sx={{ borderTop: 1, borderColor: '#45A29E' }}>
                {filterGroup.map((item) => (
                    item.filters
                    && <>
                        <Typography key={item.id} variant="h5" gutterBottom color="#55FCF1" sx={{ mt: 3 }}>
                            {item.name}
                        </Typography>
                        {item.filters.map((filter) => (
                            <Box key={filter.name} sx={{ display: "flex", alignItems: "center" }}>
                                <FiberManualRecord fontSize="small" sx={{ color: "#f1f1f1", pr: 1 }} />
                                <Typography variant="h6" gutterBottom color="#f1f1f1" sx={{ my: "auto" }}>
                                    {filter.name}
                                </Typography>
                            </Box>
                        ))}
                    </>
                ))}
            </DialogContent>

        </Dialog >
    )
}

export default PlaceOffersDialog;
