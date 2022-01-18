import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    Grid,
    Box,
    Divider,
    Breadcrumbs,
    IconButton
} from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { FC, useState } from "react";
import { Link } from "react-router-dom";

import emptyImage from "../../../../images/empty.jpg"
import SmallCarousel from "../../../comon/SmallCarousel";
import { IApartment } from "../types";

const ApartmentCard: FC<IApartment> = ({ id, typeOfApartmentName, cityName, filterName, images, name, price, bedrooms, beds, bathrooms }) => {
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
        <Grid item xs={5} sx={{ position: "relative" }}>
            <IconButton disableRipple={true} onClick={handleLeftSlide} sx={{ color: "#f1f1f1", height: 40, width: 40 }} style={{ position: "absolute", top: "50%", left: "2px", zIndex: 2 }}>
                <ArrowBackIosNew style={{ display: selectedPhoto == 0 ? 'none' : 'block' }} />
            </IconButton >
            <IconButton disableRipple={true} onClick={handleRightSlide} sx={{ color: "#f1f1f1", height: 40, width: 40 }} style={{ position: "absolute", top: "50%", right: "50%", zIndex: 2 }}>
                <ArrowForwardIos style={{ display: (selectedPhoto == images.length - 1) || images.length == 0 ? 'none' : 'block' }} />
            </IconButton>
            <Divider sx={{ my: 3, width: "100%", background: "#45A29E" }} />
            <CardActionArea sx={{ borderRadius: 3 }} component={Link} to={`/apartment?id=${id}`} >
                <Card sx={{ display: "flex", backgroundColor: "#18181b", boxShadow: 0 }}>

                    {images.length > 0
                        ? <SmallCarousel images={images} selectedItem={selectedPhoto} height={230} />
                        : <Box sx={{ width: "100%" }}>
                            <CardMedia
                                component="img"
                                sx={{ height: 230 }}
                                image={emptyImage}
                                alt="ApartmentImage"
                            />
                        </Box>
                    }
                    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", color: "#f1f1f1" }}>
                        <CardContent sx={{ py: 0 }}>
                            <Typography
                                variant="subtitle2"
                                component="div"
                            >
                                {typeOfApartmentName} in {cityName}
                            </Typography>
                            <Typography component="div" variant="h5" color="#55FCF1">
                                {name}
                            </Typography>
                            <Divider sx={{ my: 1, width: "10%", background: "#45A29E" }} />
                            <Breadcrumbs separator="·" aria-label="breadcrumb" sx={{ color: "#f1f1f1" }}>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                >
                                    {bedrooms} {bedrooms > 1 ? "bedrooms" : "bedroom"}
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                >
                                    {beds} {beds > 1 ? "beds" : "bed"}
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                >
                                    {bathrooms} {bathrooms > 1 ? "bathrooms" : "bathroom"}
                                </Typography>
                            </Breadcrumbs>
                            <Breadcrumbs separator="·" aria-label="breadcrumb" sx={{ color: "#f1f1f1" }}>
                                {filterName.slice(0, 3).map((filter) => (
                                    <Typography
                                        key={filter}
                                        variant="subtitle2"
                                        component="div"
                                    >
                                        {filter}
                                    </Typography>
                                ))}
                            </Breadcrumbs>
                        </CardContent>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "end",
                                pr: 2,
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

export default ApartmentCard;