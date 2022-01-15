import {
    Box,
    CircularProgress
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

const ApartmentPage = () => {
    const { selectedApartment } = useTypedSelector((state) => state.userApartmentPage);
    const { GetApartment } = useActions();

    const [loadingPage, setLoadingPage] = useState<boolean>(false);
    const navigate = useNavigate();


    async function getApartments() {
        setLoadingPage(true);
        try {
            const url = window.location.search;
            const params = new URLSearchParams(url);
            let id = params.get("id");
            if (id === null) {
                navigate("/");
            }
            else
                await GetApartment(id);
            setLoadingPage(false);
        } catch (ex) {
            console.log("Problem fetch");
            setLoadingPage(false);
        }
    }
    useEffect(() => {
        document.title = "Apartment";
        getApartments()
    }, []);
    return (
        <>
            {loadingPage
                ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress sx={{ color: "#66fcf1", mt: 3 }} />
                </Box>
                : <>
                    <h1>{selectedApartment && selectedApartment.name}</h1>
                </>
            }
        </>
    )
}

export default ApartmentPage;