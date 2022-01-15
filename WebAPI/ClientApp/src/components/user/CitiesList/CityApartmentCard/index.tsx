import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    Grid,
    Box
} from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";

import emptyImage from "../../../../images/empty.jpg"
import { IApartment } from "../types";


const CityApartmentCard: FC<IApartment> = ({ id, images, name, price }) => {

    return (
        <Grid item xs={5} md={4} lg={3} xl={2} sx={{ mb: 2, mr: { xs: 8, md: 14, lg: 10, xl: 6 } }}>
            <CardActionArea sx={{ height: "100%", borderRadius: 3 }} component={Link} to={`/apartment?id=${id}`}>
                <Card sx={{ backgroundColor: "#18181b", boxShadow: 0 }}>
                    <CardMedia
                        component="img"
                        sx={{ height: 170, borderRadius: 3 }}
                        image={emptyImage}
                        alt="images"
                    />
                    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", color: "#f1f1f1" }}>
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