import { Close } from "@mui/icons-material";
import { Dialog, DialogTitle, Grid, Typography, Slide, IconButton, DialogContent, DialogActions, Button } from "@mui/material";
import React, { FC } from "react";


interface ICropperDialog {
    isDialogOpen: boolean,
    onClose: any
}


const Transition = React.forwardRef(function Transition(props: any, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const CropperDialog: FC<ICropperDialog> = ({ isDialogOpen, onClose }) => {
    return (
        <Dialog
            open={isDialogOpen}
            TransitionComponent={Transition}
            keepMounted
            maxWidth="md"
            onClose={onClose}
            aria-describedby="alert-dialog-slide-description"
            PaperProps={{
                style: { borderRadius: 10, background: "#221f1f", minWidth: "550px", minHeight: "300px" }
            }}

        >
            <DialogTitle sx={{ m: 0, p: 2 }}>

                <IconButton
                    aria-label="close"
                    onClick={onClose}
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
                <Typography gutterBottom>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </Typography>
                <Typography gutterBottom>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                    Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                </Typography>
                <Typography gutterBottom>
                    Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
                    magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
                    ullamcorper nulla non metus auctor fringilla.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onClose}>
                    Save changes
                </Button>
            </DialogActions>

        </Dialog >
    )
}


export default CropperDialog;