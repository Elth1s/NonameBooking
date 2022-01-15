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
import { baseURL } from "../../../../http_comon"

interface ICity {
    countryId: string,
    id: number,
    image: string,
    name: string,
}

const CityCard: FC<ICity> = ({ countryId, id, image, name }) => {
    return (
        <>
            <Grid item xs={5} md={4} lg={3} xl={2} sx={{ mb: 3, mr: { xs: 8, md: 14, lg: 10, xl: 6 } }} >
                <CardActionArea sx={{ borderRadius: 3 }} component={Link} to={`/apartments?countryId=${countryId}&cityId=${id}`}>
                    <Card sx={{ display: "flex", backgroundColor: "#18181b", boxShadow: 0 }}>
                        {image
                            ? <CardMedia
                                component="img"
                                sx={{ width: 140, borderRadius: 3 }}
                                image={baseURL + image}
                                alt="images"
                            />
                            : <CardMedia
                                component="img"
                                sx={{ width: 140, borderRadius: 3 }}
                                image={emptyImage}
                                alt="images"
                            />}

                        <Box sx={{ display: "flex", alignItems: "center", width: "100%", color: "#f1f1f1" }}>
                            <Typography gutterBottom variant="h6" component="div" color="#f1f1f1" align="center" sx={{ width: "100%", mb: 0 }}>
                                {name}
                            </Typography>
                        </Box>
                    </Card>
                </CardActionArea>
            </Grid>
        </>
    )
}

export default CityCard;