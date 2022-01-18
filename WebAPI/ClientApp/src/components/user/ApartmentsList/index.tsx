import {
    Box,
    CircularProgress,
    Grid,
    Stack,
    Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { ISearch } from "../types";
import ApartmentCard from "./ApartmentCard";

const ApartmentsList = () => {

    const { count, cityName, apartments } = useTypedSelector((state) => state.userApartment);
    const { GetApartments } = useActions();

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


    async function getApartments(search: ISearch) {
        setLoadingPage(true);
        try {
            const url = window.location.search;
            const params = new URLSearchParams(url);
            let cityId = params.get("cityId");
            let countryId = params.get("countryId");
            if (cityId === null || countryId === null) {
                navigate("/");
            }
            else
                await GetApartments(cityId, countryId, search);
            setLoadingPage(false);
        } catch (ex) {
            console.log("Problem fetch");
            setLoadingPage(false);
        }
    }
    useEffect(() => {
        document.title = "Apartments";
        getApartments(search)
    }, []);
    return (
        <>
            {loadingPage
                ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress sx={{ color: "#66fcf1", mt: 3 }} />
                </Box>
                : <>
                    <Box>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1 }}>
                            <Typography variant="h4" gutterBottom color="#55FCF1" sx={{ my: "auto" }}>
                                {cityName}: {count} apartments
                            </Typography>
                        </Stack>
                        <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                            {apartments.map((apartment) => (
                                <ApartmentCard key={apartment.id} {...apartment} />
                            ))}
                        </Grid>
                    </Box>
                </>}
        </>
    )
}

export default ApartmentsList;