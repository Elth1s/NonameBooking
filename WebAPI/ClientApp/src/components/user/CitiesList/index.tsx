import {
    Box,
    CircularProgress,
    Typography,
    Stack,
    Grid
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { ISearch } from "../types";
import CityApartmentCard from "./CityApartmentCard";
import CityCard from "./CityCard";



const CitiesList = () => {
    const { citiesWithApartment, citiesWithoutApartment } = useTypedSelector((state) => state.userCity);
    const { GetCitiesWithApartments } = useActions();

    const [loadingPage, setLoadingPage] = useState<boolean>(false);
    const navigate = useNavigate();

    const search: ISearch = {
        priceRange: null,
        dateRange: null,
        typesOfApartment: [],
        filters: [],
        beds: 0,
        bedrooms: 0,
        bathrooms: 0,
    }


    async function getCitiesWithApartments(search: ISearch) {
        setLoadingPage(true);
        try {
            const url = window.location.search;
            const params = new URLSearchParams(url);
            let id = params.get("countryId");
            if (id === null) {
                navigate("/");
            }
            else
                await GetCitiesWithApartments(id, search);
            setLoadingPage(false);
        } catch (ex) {
            console.log("Problem fetch");
            setLoadingPage(false);
        }
    }
    useEffect(() => {
        document.title = "Cities";
        getCitiesWithApartments(search)
    }, []);


    return (
        <>
            {loadingPage
                ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress sx={{ color: "#66fcf1", mt: 3 }} />
                </Box>
                : <>
                    {citiesWithApartment.map((city) => (
                        city.apartments
                            ? <Box key={city.id}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1 }}>
                                    <Typography variant="h4" gutterBottom color="#55FCF1" sx={{ my: "auto" }}>
                                        {city.name}
                                    </Typography>
                                </Stack>
                                <Box sx={{ mb: 3 }} >
                                    <Stack direction="row">
                                        <Grid container>
                                            {city.apartments.slice(0, 4).map((apartment) => (
                                                <CityApartmentCard key={apartment.id} {...apartment} />
                                            ))}
                                            {city.apartments.length > 4 && <h1>Hello</h1>}
                                        </Grid>
                                    </Stack>
                                </Box>
                            </Box>
                            : <></>
                    ))}
                    <Box>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1 }}>
                            <Typography variant="h4" gutterBottom color="#55FCF1" sx={{ my: "auto" }}>
                                More popular cities
                            </Typography>
                        </Stack>
                        <Box sx={{ mb: 3 }} >
                            <Stack direction="row">
                                <Grid container >
                                    {citiesWithoutApartment.map((city) => (
                                        <CityCard key={city.id} {...city} />
                                    ))}

                                </Grid>
                            </Stack>
                        </Box>
                    </Box>
                </>
            }
        </>
    )
}

export default CitiesList;