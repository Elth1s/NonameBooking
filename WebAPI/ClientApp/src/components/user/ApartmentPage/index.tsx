import {
    Box,
    CircularProgress,
    Typography,
    Stack,
    ImageList,
    ImageListItem,
    Breadcrumbs,
    Divider,
    Grid,
    Slide,
    Button
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState, forwardRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';

import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { getNewImages } from "./actions"
import { IDateRange } from "../types"
import emptyImage from "../../../images/empty.jpg"
import PlaceOffersDialog from "../../comon/PlaceOffersDialog";
import SelectDate from "../../comon/SelectDate";

function srcset(image: string, size: number, rows = 1, cols = 1) {
    if (image === "")
        return {
            src: emptyImage,
            srcSet: emptyImage
        };
    else
        return {
            src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${size * cols}&h=${size * rows
                }&fit=crop&auto=format&dpr=2 2x`
        };
}

const Transition = forwardRef(function Transition(props: any, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const ApartmentPage = () => {
    const { selectedApartment } = useTypedSelector((state) => state.userApartmentPage);
    const { user } = useTypedSelector((state) => state.auth);
    const { GetApartment, Reserve } = useActions();

    const [loadingPage, setLoadingPage] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isPlaceOffersDialogOpen, setIsPlaceOffersDialogOpen] = useState(false);
    const [dateValue, setDateValue] = useState<any>([null, null]);

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

    const placeOffersDialogOpen = () => {
        setIsPlaceOffersDialogOpen(true);
    };

    const placeOffersDialogClose = () => {
        setIsPlaceOffersDialogOpen(false);
    };

    async function onClickReserve() {
        setIsSubmitting(true);
        try {
            if (dateValue[0] === null && dateValue[1] === null) {
                toast.error("Select free dates");
            }
            else {
                let dateRange: IDateRange = {
                    start: dateValue[0],
                    end: dateValue[1]
                }
                let length = getDatesRange(dateRange)
                await Reserve(dateRange, length * selectedApartment.price, user.id, selectedApartment.id);
                toast.success("Reserve success");
            }
            setIsSubmitting(false);
        } catch (ex) {
            toast.error("Reserve failed");
            setIsSubmitting(false);
        }
    }

    function addDays(date: Date, days: number): Date {
        date.setDate(date.getDate() + days);
        return date;
    }
    function getDatesRange(dates: IDateRange) {
        let dateArray = new Array<Date>();
        let currentDate = new Date(dates.start);
        dates.end.setHours(0, 0, 0, 0);

        while (currentDate < dates.end) {
            currentDate.setHours(0, 0, 0, 0);
            dateArray.push(new Date(currentDate));
            currentDate = addDays(currentDate, 1);
        }
        return dateArray.length;
    }
    return (
        <>
            {loadingPage
                ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress sx={{ color: "#66fcf1", mt: 3 }} />
                </Box>
                : <>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h4" gutterBottom color="#55FCF1" sx={{ my: "auto" }}>
                            {selectedApartment.name}
                        </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: 1 }}>
                        <Typography
                            component={Link} to={`/apartments?countryId=${selectedApartment.countryId}&cityId=${selectedApartment.cityId}`} style={{ color: 'white' }}
                            variant="subtitle1"
                        >
                            {selectedApartment.cityName},{selectedApartment.countryName}
                        </Typography>
                    </Stack>
                    <Stack direction="row">
                        <Stack sx={{ width: { md: "75%" } }}>
                            <ImageList
                                sx={{ height: 446, borderRadius: 3 }}
                                variant="quilted"
                                cols={5}
                                rowHeight={221}
                            >
                                {getNewImages(selectedApartment.images.slice(0, 5)).map((item) => (
                                    <ImageListItem
                                        key={item.img}
                                        cols={item.cols || 1}
                                        rows={item.rows || 1}
                                    >
                                        <img
                                            {...srcset(item.img, 221, item.rows, item.cols)}
                                            alt="ApartmentImages"
                                            loading="lazy"
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                            <Typography variant="h4" gutterBottom color="#55FCF1" sx={{ my: "auto" }}>
                                {selectedApartment.typeOfApartmentName}, hosted by {selectedApartment.ownerFullName}
                            </Typography>
                            <Breadcrumbs separator="·" aria-label="breadcrumb" sx={{ color: "#f1f1f1" }}>
                                <Typography
                                    variant="subtitle1"
                                    component="div"
                                >
                                    {selectedApartment.bedrooms} {selectedApartment.bedrooms > 1 ? "bedrooms" : "bedroom"}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    component="div"
                                >
                                    {selectedApartment.beds} {selectedApartment.beds > 1 ? "beds" : "bed"}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    component="div"
                                >
                                    {selectedApartment.bathrooms} {selectedApartment.bathrooms > 1 ? "bathrooms" : "bathroom"}
                                </Typography>
                            </Breadcrumbs>
                            <Divider sx={{ my: 1, width: "100%", background: "#45A29E" }} />
                            <Typography variant="h6" gutterBottom color="#f1f1f1" sx={{ my: 2 }}>
                                {selectedApartment.description}
                            </Typography>
                            <Divider sx={{ my: 1, width: "100%", background: "#45A29E" }} />
                            <Typography variant="h5" gutterBottom color="#55FCF1" sx={{ my: 2 }}>
                                What this place offers
                            </Typography>
                            <Grid container sx={{ display: "flex", width: { md: "50%" }, justifyContent: "space-between" }}>
                                {selectedApartment.filterGroupWithFilters.map((filterGroup) => (
                                    <Grid item md={5} key={filterGroup.id}>
                                        <Typography variant="h6" gutterBottom color="#f1f1f1">
                                            {filterGroup.filters[0].name}
                                        </Typography>
                                    </Grid>

                                ))}
                                <Button
                                    sx={{ my: 2 }}
                                    variant="contained"
                                    style={{ backgroundColor: "#45A29E" }}
                                    onClick={placeOffersDialogOpen}
                                >
                                    Show all amenities
                                </Button>
                            </Grid>

                        </Stack>
                        <Stack sx={{ width: { md: "25%" } }}>
                            <Box style={{ position: "sticky", top: 100 }}
                                sx={{
                                    border: 1,
                                    borderColor: "#45A29E",
                                    borderRadius: 3,
                                    height: 150,
                                    m: 4,
                                    mt: 2,
                                    mr: 0,
                                    p: 4,
                                }}
                            >
                                <Box>
                                    <Typography variant="h5" gutterBottom color="#55FCF1" sx={{ my: 1 }}>
                                        <b>${selectedApartment.price}</b> / night
                                    </Typography>
                                    <SelectDate datesForDisable={selectedApartment.dates} value={dateValue} setValue={setDateValue} />
                                    <LoadingButton
                                        loading={isSubmitting}
                                        size="large"
                                        variant="contained"
                                        sx={{ width: "100%", my: 2 }}
                                        style={{ backgroundColor: "#45A29E" }}
                                        onClick={onClickReserve}
                                    >
                                        {dateValue[0] != null && dateValue[1] != null ? "Reserve" : "Check free dates"}
                                    </LoadingButton>
                                </Box>
                            </Box>
                        </Stack>
                    </Stack>
                </>
            }
            <PlaceOffersDialog
                Transition={Transition}
                isDialogOpen={isPlaceOffersDialogOpen}
                dialogClose={placeOffersDialogClose}
                filterGroup={selectedApartment.filterGroupWithFilters} />
        </>
    )
}

export default ApartmentPage;