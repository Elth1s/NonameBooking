import {
    Box,
    CircularProgress,
    Divider,
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

    const { apartments } = useTypedSelector((state) => state.userApartment);
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
            let id = params.get("cityId");
            if (id === null) {
                navigate("/");
            }
            else
                await GetApartments(id, search);
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
                                apartment.cityName
                            </Typography>
                        </Stack>
                        <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                            {apartments.map((apartment) => (
                                <ApartmentCard {...apartment} />
                            ))}
                        </Grid>
                    </Box>
                </>}
        </>
    )
}

export default ApartmentsList;