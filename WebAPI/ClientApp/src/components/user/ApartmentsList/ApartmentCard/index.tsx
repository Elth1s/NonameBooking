import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    Grid,
    Box,
    Divider,
    Breadcrumbs
} from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";

import emptyImage from "../../../../images/empty.jpg"
import { IApartment } from "../types";

const ApartmentCard: FC<IApartment> = ({ id, typeOfApartmentName, cityName, filterName, images, name, price, bedrooms, beds, bathrooms }) => {
    return (
        <Grid item xs={5}>
            <Divider sx={{ my: 3, width: "100%", background: "#45A29E" }} />
            <CardActionArea sx={{ borderRadius: 3 }} component={Link} to={`/apartment?id=${id}`} >
                <Card sx={{ display: "flex", backgroundColor: "#18181b", boxShadow: 0 }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 280, borderRadius: 3 }}
                        image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                        alt="Live from space album cover"
                    />
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