import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { ISearch } from "../types";








const CitiesList = () => {
    const { cities } = useTypedSelector((state) => state.userCities);
    const { GetCitiesWithApartments } = useActions();

    const [loadingPage, setLoadingPage] = useState<boolean>(false);
    const navigate = useNavigate();

    const search: ISearch = {
        priceRange: null,
        dateRange: null,
        typesOfApartment: [1, 2, 3, 4],
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
            console.log(id)
            if (id === null) {
                navigate("/");
            }
            else
                await GetCitiesWithApartments(id, search);
            console.log("after")
            setLoadingPage(false);
        } catch (ex) {
            console.log("Problem fetch");
            setLoadingPage(false);
        }
    }
    useEffect(() => {
        document.title = "Apartments";
        getCitiesWithApartments(search)
    }, []);


    return (
        <>
            <h1>List</h1>
        </>
    )
}

export default CitiesList;