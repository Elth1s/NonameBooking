import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    Grid,
    Box,
    IconButton
} from "@mui/material";
import { ArrowForwardIos, ArrowBackIosNew } from '@mui/icons-material';
import { FC, useState } from "react";
import { Link } from "react-router-dom";

import emptyImage from "../../../../images/empty.jpg"
import SmallCarousel from "../../../comon/SmallCarousel";
import { IApartment } from "../types";


const CityApartmentCard: FC<IApartment> = ({ id, images, name, price }) => {
    const [selectedPhoto, setSelectedPhoto] = useState<number>(0);

    const handleLeftSlide = () => {
        if (selectedPhoto > 0)
            setSelectedPhoto(selectedPhoto - 1)
    }
    const handleRightSlide = () => {
        if (selectedPhoto < images.length - 1)
            setSelectedPhoto(selectedPhoto + 1)
    }

    return (
        <Grid item xs={5} md={4} lg={3} xl={2} sx={{
            mb: 2, mr: { xs: 8, md: 14, lg: 10, xl: 6 }, position: "relative"
        }} >
            <IconButton disableRipple={true} onClick={handleLeftSlide} sx={{ color: "#f1f1f1", height: 40, width: 40 }} style={{ position: "absolute", top: "70px", left: "2px", zIndex: 1 }}>
                <ArrowBackIosNew style={{ display: selectedPhoto == 0 ? 'none' : 'block' }} />
            </IconButton >
            <IconButton disableRipple={true} onClick={handleRightSlide} sx={{ color: "#f1f1f1", height: 40, width: 40 }} style={{ position: "absolute", top: "70px", right: "2px", zIndex: 1 }}>
                <ArrowForwardIos style={{ display: (selectedPhoto == images.length - 1) || images.length == 0 ? 'none' : 'block' }} />
            </IconButton>
            <CardActionArea sx={{ height: "100%", borderRadius: 3 }} component={Link} to={`/apartment?id=${id}`}>
                <Card sx={{ backgroundColor: "#18181b", boxShadow: 0 }}>
                    {images.length > 0
                        ? <SmallCarousel images={images} selectedItem={selectedPhoto} height={170} />
                        : <CardMedia
                            component="img"
                            sx={{ height: 170 }}
                            image={emptyImage}
                            alt="images"
                        />
                    }
                    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", color: "#f1f1f1" }}>
                        <CardContent sx={{ p: 1 }}>
                            <Typography gutterBottom variant="h6" component="div" sx={{ color: "#55FCF1" }}>
                                {name}
                            </Typography>
                        </CardContent>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "end",
                                m: 2,
                                mb: 1,
                                mt: "auto"
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                color="#f1f1f1"
                            >
                                <b>${price}</b> / night
                            </Typography>
                        </Box>
                    </Box>
                </Card>
            </CardActionArea>
        </Grid >
    );
}

export default CityApartmentCard;