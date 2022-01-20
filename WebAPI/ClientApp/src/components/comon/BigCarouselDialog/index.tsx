import { AppBar, Dialog, Box, IconButton, Button } from "@mui/material"
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { FC } from "react"
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';

import "./index.css"

interface IBigCarouselDialog {
    isDialogOpen: boolean,
    Transition: any,
    dialogClose: any,
    images: Array<string>
}

const BigCarouselDialog: FC<IBigCarouselDialog> = ({ isDialogOpen, Transition, dialogClose, images }) => {

    const ImagesGallery = [] as Array<ReactImageGalleryItem>;
    images.forEach(element => {
        ImagesGallery.push({ original: element, thumbnail: element })
    });
    return (
        <Dialog
            fullScreen
            open={isDialogOpen}
            onClose={dialogClose}
            TransitionComponent={Transition}
            sx={{ backgroundColor: "#18181b" }}
        >

            <Button
                variant="outlined"
                startIcon={<ArrowForwardIos fontSize="small" />}
                size="large"
                style={{ backgroundColor: "#18181b", borderColor: "#45A29E", color: "#55FCF1", position: "absolute", top: "10px", right: "10px", zIndex: 2 }}
                onClick={dialogClose}
            >
                Back
            </Button>
            <ImageGallery
                items={ImagesGallery}
                lazyLoad={true}
                showPlayButton={false}
                showFullscreenButton={false}
                additionalClass="image-gallery-slide"
            />
        </Dialog>
    )
}

export default BigCarouselDialog;