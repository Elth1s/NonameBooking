import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { LegacyRef } from "react";
interface ICropperDialog {
    isDialogOpen: boolean,
    Transition: any,
    modalClose: any,
    imgRef: LegacyRef<HTMLImageElement>,
    image: string,
    modalSave: any
}
const CropperDialog: React.FC<ICropperDialog> = ({ isDialogOpen, Transition, modalClose, imgRef, image, modalSave }) => {
    return (
        <Dialog
            open={isDialogOpen}
            TransitionComponent={Transition}
            maxWidth="md"
            keepMounted
            onClose={modalClose}
            aria-describedby="alert-dialog-slide-description"
            PaperProps={{
                style: { borderRadius: 10, background: "#18181b", minWidth: "550px", minHeight: "300px" }
            }}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} color="#55FCF1">
                Change photo
                <IconButton
                    aria-label="close"
                    onClick={modalClose}
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
            <DialogContent dividers sx={{ borderColor: '#45A29E' }}>

                <img ref={imgRef}
                    alt="SelectedImage"
                    src={image} />

            </DialogContent>
            <DialogActions>
                <Button autoFocus size="medium"
                    variant="contained"
                    style={{ backgroundColor: "#45A29E" }}
                    onClick={modalSave}>
                    Save changes
                </Button>
            </DialogActions>

        </Dialog >
    )
}
export default CropperDialog;