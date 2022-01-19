import {
    Box,
    CircularProgress,
    Typography,
    Stack,
    Grid,
    Slide,
    Button
} from "@mui/material";
import { ArrowForwardIos, FilterList } from '@mui/icons-material';
import { useEffect, useState, forwardRef } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import qs from "qs";
import { toast } from 'react-toastify';
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { ISearch } from "../types";
import CityApartmentCard from "./CityApartmentCard";
import CityCard from "./CityCard";
import FiltersDialog from "../../comon/FiltersDialog";

const Transition = forwardRef(function Transition(props: any, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const CitiesList = () => {
    const { citiesWithApartment, citiesWithoutApartment } = useTypedSelector((state) => state.userCity);
    const { GetCitiesWithApartments } = useActions();

    const [loadingPage, setLoadingPage] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();

    const [isFiltersDialog, setIsFiltersDialogOpen] = useState<boolean>(false);

    const [priceValue, setPriceValue] = useState<any>([null, null]);
    const [dateValue, setDateValue] = useState<any>([null, null]);

    const [search, setSearch] = useState<ISearch>(
        {
            countryId: searchParams.get("countryId"),
            priceStart: searchParams.get("priceStart"),
            priceEnd: searchParams.get("priceEnd"),
            dateStart: searchParams.get("dateStart"),
            dateEnd: searchParams.get("dateEnd"),
            typesOfApartment: searchParams.getAll("typeOfApartment"),
            filters: searchParams.getAll("filter"),
            beds: searchParams.get("beds"),
            bedrooms: searchParams.get("bedrooms"),
            bathrooms: searchParams.get("bathrooms"),

        }
    )

    async function getCitiesWithApartments(search: ISearch) {
        setLoadingPage(true);
        try {
            const url = window.location.search;
            const params = new URLSearchParams(url);
            let id = params.get("countryId");
            if (id === null) {
                navigate("/");
            }
            else {
                await GetCitiesWithApartments(search);
            }
            setLoadingPage(false);
        } catch (ex) {
            toast.error("Loading cities failed.");
            setLoadingPage(false);
        }
    }
    useEffect(() => {
        document.title = "Cities";
        getCitiesWithApartments(search)
    }, []);

    const filtersDialogOpen = () => {
        setIsFiltersDialogOpen(true);
    };

    const filtersDialogClose = () => {
        setIsFiltersDialogOpen(false);
    };

    const addOrDeleteFilter = (id: string) => {
        const index = search.filters.findIndex(elem => elem === id);
        const tmpList = search.filters.slice();
        if (index === -1)
            tmpList.push(id)
        else
            tmpList.splice(index, 1);
        let data: ISearch = {
            ...search,
            filters: tmpList,
        };
        setSearch(data);
    }
    const addOrDeleteTypeOfApartment = (id: string) => {
        const index = search.typesOfApartment.findIndex(elem => elem === id);
        const tmpList = search.typesOfApartment.slice();
        if (index === -1)
            tmpList.push(id)
        else
            tmpList.splice(index, 1);
        let data: ISearch = {
            ...search,
            typesOfApartment: tmpList,
        };
        setSearch(data);
    }
    const setBeds = (value: number) => {
        let data: ISearch = {
            ...search,
            beds: value.toString(),
        };
        setSearch(data);
    }
    const setBathrooms = (value: number) => {
        let data: ISearch = {
            ...search,
            bathrooms: value.toString(),
        };
        setSearch(data);
    }
    const setBedrooms = (value: number) => {
        let data: ISearch = {
            ...search,
            bedrooms: value.toString(),
        };
        setSearch(data);
    }

    const applyFilters = () => {
        filtersDialogClose()
        setSearchParams(qs.stringify({ ...search }));
        getCitiesWithApartments(search)
    }

    return (
        <>
            {loadingPage
                ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress sx={{ color: "#66fcf1", mt: 3 }} />
                </Box>
                : <Box>
                    <Box style={{ position: "relative", height: 30 }}>
                        <Button
                            sx={{ my: 2 }}
                            variant="contained"
                            style={{ backgroundColor: "#45A29E", position: "absolute", right: "50px", top: "0px" }}
                            onClick={filtersDialogOpen}
                            startIcon={<FilterList />}
                        >
                            Filters
                        </Button>
                    </Box>
                    {citiesWithApartment.length != 0
                        ? <>
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
                                                    {city.apartments.length > 4 &&
                                                        <Box component={Link} to={`/apartments?countryId=${search.countryId}&cityId=${city.id}`} style={{ textDecoration: 'none' }}
                                                            sx={{
                                                                height: 170,
                                                                width: 250,
                                                                backgroundColor: "inherit",
                                                                border: 1,
                                                                borderRadius: 3,
                                                                borderColor: "#45A29E",
                                                                display: "flex",
                                                                justifyContent: "space-between",
                                                                alignItems: "end"
                                                            }}>
                                                            <Typography variant="h6" gutterBottom color="#55FCF1" sx={{ m: 1 }}>
                                                                Show all
                                                            </Typography>
                                                            <ArrowForwardIos sx={{ m: 1, mb: 1.5, color: "#55FCF1" }} />
                                                        </Box>}
                                                </Grid>
                                            </Stack>
                                        </Box>
                                    </Box>
                                    : <></>
                            ))}
                        </> : <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1 }}>
                            <Typography variant="h4" gutterBottom color="#55FCF1" sx={{ my: "auto" }}>
                                No city found
                            </Typography>
                        </Stack>}
                    <Box>
                        {citiesWithoutApartment.length != 0
                            && <>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1 }}>
                                    <Typography variant="h4" gutterBottom color="#55FCF1" sx={{ my: "auto" }}>
                                        More popular cities
                                    </Typography>
                                </Stack>
                                <Box sx={{ mb: 3 }} >
                                    <Stack direction="row">
                                        <Grid container >
                                            {citiesWithoutApartment.map((city) => (
                                                <CityCard key={city.id} countryId={search.countryId != null ? search.countryId : "0"} {...city} />
                                            ))}

                                        </Grid>
                                    </Stack>
                                </Box>
                            </>}

                    </Box>
                </Box>
            }
            <FiltersDialog
                Transition={Transition}
                isDialogOpen={isFiltersDialog}
                dialogClose={filtersDialogClose}
                selectedFilters={search.filters}
                addOrDeleteFilter={addOrDeleteFilter}
                selectedTypesOfApartments={search.typesOfApartment}
                addOrDeleteTypeOfApartment={addOrDeleteTypeOfApartment}
                priceValue={priceValue}
                setPriceValue={setPriceValue}
                dateValue={dateValue}
                setDateValue={setDateValue}
                beds={search.beds}
                setBeds={setBeds}
                bathrooms={search.bathrooms}
                setBathrooms={setBathrooms}
                bedrooms={search.bedrooms}
                setBedrooms={setBedrooms}
                applyFilters={applyFilters} />
        </>
    )
}

export default CitiesList;