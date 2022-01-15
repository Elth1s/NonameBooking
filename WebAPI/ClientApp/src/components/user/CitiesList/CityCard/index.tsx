import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    Grid
} from "@mui/material";
import { FC } from "react";

import emptyImage from "../../../../images/empty.jpg"
import { baseURL } from "../../../../http_comon"

interface ICity {
    image: string,
    name: string,
}

const CityCard: FC<ICity> = ({ image, name }) => {
    return (
        <>
            <Grid item xs={5} md={4} lg={3} xl={2} sx={{ mb: 3, mr: { xs: 8, md: 14, lg: 10, xl: 6 } }} >
                <CardActionArea sx={{ borderRadius: 3 }}>
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

                        <CardContent sx={{ display: "flex", alignItems: "center", px: 1, width: "100%" }} >
                            <Typography gutterBottom variant="h6" component="div" color="#55FCF1" align="center" sx={{ width: "100%" }}>
                                {name}
                            </Typography>
                        </CardContent>
                    </Card>
                </CardActionArea>
            </Grid>
        </>
    )
}

export default CityCard;