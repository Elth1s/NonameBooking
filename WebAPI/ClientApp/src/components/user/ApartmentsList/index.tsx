import {
    Box,
    CircularProgress,
    Grid,
    Stack,
    Typography,
    Button,
    Slide,
    Pagination,
    PaginationItem
} from "@mui/material";
import { FilterList } from '@mui/icons-material';
import { useEffect, useState, forwardRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import qs from "qs";

import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IDateRange, ISearch } from "../types";
import ApartmentCard from "./ApartmentCard";
import FiltersDialog from "../../comon/FiltersDialog";

const Transition = forwardRef(function Transition(props: any, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const ApartmentsList = () => {

    const { count, cityName, apartments } = useTypedSelector((state) => state.userApartment);
    const { GetApartments } = useActions();

    const [loadingPage, setLoadingPage] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const [isFiltersDialog, setIsFiltersDialogOpen] = useState<boolean>(false);

    const [cityId, setCityId] = useState<number>(0);
    const [page, setPage] = useState<number>(1);

    const [priceValue, setPriceValue] = useState<any>([null, null]);
    const [dateValue, setDateValue] = useState<any>([null, null]);

    const navigate = useNavigate();

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


    async function getApartments(page: number, search: ISearch) {
        setLoadingPage(true);
        try {
            const url = window.location.search;
            const params = new URLSearchParams(url);
            let cityIdParams = params.get("cityId");
            let countryIdParams = params.get("countryId");
            let pageParams = params.get("page");
            if (pageParams !== null && +pageParams !== page) {
                setPage(+pageParams)
            }
            if (cityIdParams === null || countryIdParams === null) {
                navigate("/");
            }
            else {
                setCityId(+cityIdParams)
                setSearchParams(qs.stringify({ cityId: +cityIdParams, page: page, ...search }));
                await GetApartments(+cityIdParams, page, search);
            }
            setLoadingPage(false);
        } catch (ex) {
            console.log("Problem fetch");
            setLoadingPage(false);
        }
    }
    useEffect(() => {
        document.title = "Apartments";
        getApartments(page, search)
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
        getApartments(1, search)
    }
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
                                {cityName}:<Typography fontSize="1.7rem" color="#f1f1f1" display="inline"> {count} apartments</Typography>
                            </Typography>
                            <Button
                                sx={{ my: 2 }}
                                variant="contained"
                                style={{ backgroundColor: "#45A29E" }}
                                onClick={filtersDialogOpen}
                                startIcon={<FilterList />}
                            >
                                Filters
                            </Button>
                        </Stack>
                        <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                            {apartments.map((apartment) => (
                                <ApartmentCard key={apartment.id} {...apartment} />
                            ))}
                        </Grid>
                        <Grid container>
                            <Pagination count={Math.ceil(count / 4)} page={page} shape="rounded" size="large" showFirstButton showLastButton sx={{ marginTop: 4, marginX: "auto" }} style={{ color: "#55FCF1" }}
                                onChange={(event: any, value) => {
                                    setSearchParams(qs.stringify({ cityId: cityId, page: value, ...search }));
                                    setPage(value)
                                    getApartments(value, search)
                                }}
                                renderItem={(item) => <PaginationItem {...item}
                                    sx={{ color: "#55FCF1" }} />} />
                        </Grid>
                    </Box>
                </>}
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

export default ApartmentsList;