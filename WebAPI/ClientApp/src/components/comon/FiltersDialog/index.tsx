import {
    Dialog,
    DialogTitle,
    IconButton,
    DialogContent,
    Typography,
    DialogActions,
    Button,
    Grid,
    InputAdornment,
    Stack,
    Divider,
    Box,
    Checkbox,
    CircularProgress,
    Slider
} from "@mui/material";
import { Close, Visibility, VisibilityOff, FiberManualRecord, Remove, Add } from '@mui/icons-material';

import { FC, useState, useEffect } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import { toast } from "react-toastify";

import { useActions } from "../../../hooks/useActions";
import { IFilterGroup } from "../../user/types";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import RoomsAndBedsCard from "./RoomsAndBedsCard";
import { CssTextField } from "../CssTextField";


interface IFiltersDialog {
    isDialogOpen: boolean,
    dialogClose: any,
    Transition: any,
    selectedFilters: Array<string>,
    addOrDeleteFilter: any,
    selectedTypesOfApartments: Array<string>,
    addOrDeleteTypeOfApartment: any,
    priceValue: any,
    setPriceValue: any,
    dateValue: any,
    setDateValue: any,
    beds: string | null,
    setBeds: any,
    bathrooms: string | null,
    setBathrooms: any,
    bedrooms: string | null,
    setBedrooms: any,
    applyFilters: any
}

const minPriceDistance = 1000;

const FiltersDialog: FC<IFiltersDialog> = ({ isDialogOpen, Transition, dialogClose, selectedFilters, addOrDeleteFilter, selectedTypesOfApartments, addOrDeleteTypeOfApartment, priceValue, setPriceValue, dateValue, setDateValue, beds, setBeds, bathrooms, setBathrooms, bedrooms, setBedrooms, applyFilters }) => {

    const { GetFiltersForSearch, GetTypesOfApartmentForSearch } = useActions();
    const { filterGroups, typeOfApartments } = useTypedSelector((state) => state.search);

    const [loading, setLoading] = useState<boolean>(false);


    async function getFiltersForSearch() {
        setLoading(true);
        try {
            await GetFiltersForSearch();
            setLoading(false);
        } catch (ex) {
            toast.error("Loading filters failed.");
            setLoading(false);
        }
    }
    async function getTypesOfApartments() {
        try {
            await GetTypesOfApartmentForSearch();
        } catch (ex) {
            toast.error("Loading type of apartments failed.");
        }
    }
    useEffect(() => {
        getTypesOfApartments();
        getFiltersForSearch();
    }, []);

    const isFilterChecked = (id: number) => {
        const index = selectedFilters.findIndex(elem => elem == id.toString());
        if (index === -1)
            return false
        else
            return true
    }
    const isTypeOfApartmentChecked = (id: number) => {
        const index = selectedTypesOfApartments.findIndex(elem => elem == id.toString());
        if (index === -1)
            return false
        else
            return true
    }
    const handlePriceChange = (event: any, newValue: any, activeThumb: any) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setPriceValue({ start: Math.min(newValue[0], priceValue[1] - minPriceDistance), end: priceValue[1] });
        } else {
            setPriceValue({ start: priceValue[0], end: Math.max(newValue[1], priceValue[0] + minPriceDistance) });
        }
    };
    const handleChangeMinPrice = (event: any) => {
        setPriceValue({ start: (event.target.value >= 10 ? Math.min(event.target.value, priceValue[1] - minPriceDistance) : 10), end: priceValue[1] });
    }
    const handleChangeMaxPrice = (event: any) => {
        setPriceValue({ start: priceValue[0], end: (event.target.value <= 10000 ? Math.max(event.target.value, priceValue[0] + minPriceDistance) : 10000) });
    }
    return (
        <Dialog
            open={isDialogOpen}
            TransitionComponent={Transition}
            maxWidth="md"
            onClose={dialogClose}
            aria-describedby="alert-dialog-slide-description"
            PaperProps={{
                style: { borderRadius: 10, background: "#18181b", minWidth: "650px", maxHeight: "750px" }
            }}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} color="#55FCF1">
                Filters
                <IconButton
                    aria-label="close"
                    onClick={dialogClose}
                    sx={{
                        position: 'absolute',
                        my: "auto",
                        right: 8,
                        top: 10,
                        color: "#55FCF1"
                    }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ borderColor: '#45A29E' }}>
                {loading
                    ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress sx={{ color: "#66fcf1", mt: 3 }} />
                    </Box>
                    : <>
                        <Typography variant="h5" gutterBottom color="#55FCF1" sx={{ mt: 3 }}>
                            Rooms and beds
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: 'column', width: "70%" }}>
                            <RoomsAndBedsCard name={"Bedrooms"} value={bedrooms} setValue={setBedrooms} />
                            <RoomsAndBedsCard name={"Beds"} value={beds} setValue={setBeds} />
                            <RoomsAndBedsCard name={"Bathrooms"} value={bathrooms} setValue={setBathrooms} />
                        </Box>
                        <Typography variant="h5" gutterBottom color="#55FCF1" sx={{ mt: 3 }}>
                            Price
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: 'column', width: "70%" }}>
                            <Slider
                                sx={{ color: "#55FCF1" }}
                                getAriaLabel={() => "Minimum distance"}
                                value={priceValue}
                                min={10}
                                max={10000}
                                onChange={handlePriceChange}
                                valueLabelDisplay="auto"
                                disableSwap
                            />
                            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                                <CssTextField label="Min price" type="number" InputProps={{ inputProps: { min: 10, max: priceValue[1] - 1000 } }} onChange={handleChangeMinPrice} value={priceValue[0]} />
                                <CssTextField label="Max price" type="number" InputProps={{ inputProps: { min: priceValue[0] + 1000, max: 10000 } }} onChange={handleChangeMaxPrice} value={priceValue[1]} />
                            </Box>
                        </Box>
                        <Typography variant="h5" gutterBottom color="#55FCF1" sx={{ mt: 3 }}>
                            Type of apartments
                        </Typography>
                        <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                            {typeOfApartments.map((item) => (
                                <Grid item xs={5}>
                                    <Box key={item.id} sx={{ display: "flex", alignItems: "center" }}>
                                        <Checkbox sx={{ color: "#55FCF1", '&.Mui-checked': { color: "#55FCF1", }, }} checked={isTypeOfApartmentChecked(item.id)} onChange={() => addOrDeleteTypeOfApartment(item.id)} />
                                        <Typography variant="h6" gutterBottom color="#f1f1f1" sx={{ my: "auto" }}>
                                            {item.name}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                        {filterGroups.map((item) => (
                            item.filters
                            && <>
                                <Typography key={item.id} variant="h5" gutterBottom color="#55FCF1" sx={{ mt: 3 }}>
                                    {item.name}
                                </Typography>
                                <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                                    {item.filters.map((filter) => (
                                        <Grid item xs={5}>
                                            <Box key={filter.id} sx={{ display: "flex", alignItems: "center" }}>
                                                <Checkbox sx={{ color: "#55FCF1", '&.Mui-checked': { color: "#55FCF1", }, }} checked={isFilterChecked(filter.id)} onChange={() => addOrDeleteFilter(filter.id)} />
                                                <Typography variant="h6" gutterBottom color="#f1f1f1" sx={{ my: "auto" }}>
                                                    {filter.name}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </>
                        ))}
                    </>}
            </DialogContent>
            <DialogActions>
                <Button autoFocus size="medium"
                    variant="contained"
                    style={{ backgroundColor: "#45A29E" }}
                    onClick={applyFilters}
                >
                    Save changes
                </Button>
            </DialogActions>
        </Dialog >
    )
}

export default FiltersDialog;
