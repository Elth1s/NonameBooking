import {
    Box,
    Button,
    Grid,
    Slide,
    Stack,
    Typography,
    CircularProgress,
    Autocomplete,
    Popper,
    IconButton,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableFooter,
    TablePagination,
    Paper,
    Avatar
} from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos, Add, Clear, RemoveRedEyeOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, FormikProvider, useFormik } from "formik";

import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useActions } from "../../../../hooks/useActions";
import { ApartmentSchema } from "../validation";
import { ApartmentServerError, IApartment } from "../types";
import { CssTextField } from "../../../comon/CssTextField";
import CustomPopper from "../../../comon/CustomPopper";
import { base64ImageToBlob } from "../../../comon/CropperDialog/actions";
import TablePaginationActions from "../../../comon/TablePaginationActions";
import SmallCarousel from "../../../comon/SmallCarousel";
import defaultImage from "../../../../images/download-photo.png"
import emptyImage from "../../../../images/empty.jpg"
import { baseURL } from "../../../../http_comon"


const UpdateApartment = () => {
    const { countries, cities } = useTypedSelector((state) => state.home);
    const { filters } = useTypedSelector((state) => state.adminFilter);
    const { types } = useTypedSelector((state) => state.adminTypeOfApartment);
    const { selectedApartment } = useTypedSelector((state) => state.currentUserApartment);
    const { GetCountries, GetCitiesByCountryId, GetAdminTypeOfApartments, GetUserApartment, GetAdminFilters, UpdateApartment } = useActions();

    const [loading, setLoading] = useState<boolean>(false);

    const [selectedPhotoFromBack, setSelectedPhotoFromBack] = useState<number>(0);

    const [selectedPhoto, setSelectedPhoto] = useState<number>(0);
    const [filesForSend, setFilesForSend] = useState<Array<File> | null>(null);
    const [filesForDelete, setFilesForDelete] = useState<Array<string> | null>(null);
    const [savedFiles, setSavedFiles] = useState<Array<string>>([]);
    const [selectedFilesForSend, setSelectedFilesForSend] = useState<Array<string>>([]);
    const [fileSelected, setFileSelected] = React.useState<string>(defaultImage)

    const [value, setValue] = useState<any>(null);

    const [pageFirstTable, setPageFirstTable] = useState<number>(0);
    const [rowsPerPageFirstTable, setRowsPerPageFirstTable] = useState<number>(5);

    const [pageSecondTable, setPageSecondTable] = useState<number>(0);
    const [rowsPerPageSecondTable, setRowsPerPageSecondTable] = useState<number>(5);

    const [pageThirdTable, setPageThirdTable] = useState<number>(0);
    const [rowsPerPageThirdTable, setRowsPerPageThirdTable] = useState<number>(5);

    let { id } = useParams() as any;

    const navigate = useNavigate();

    async function getCountries() {
        setLoading(true);
        try {
            await GetCountries();
            setLoading(false);
        } catch (ex) {
            toast.error("Loading countries failed.");
            setLoading(false);
        }
    }
    async function getCitiesByCountryId(id: number) {

        try {
            await GetCitiesByCountryId(id);
        } catch (ex) {
            toast.error("Loading cities failed.");
        }
    }
    async function getTypeOfApartments() {
        setLoading(true);
        try {
            await GetAdminTypeOfApartments();
            setLoading(false);
        } catch (ex) {
            toast.error("Loading type of apartments failed.");
            setLoading(false);
        }
    }
    async function getFilters() {
        setLoading(true);
        try {
            await GetAdminFilters();
            setLoading(false);
        } catch (ex) {
            toast.error("Loading filters failed.");
            setLoading(false);
        }
    }
    useEffect(() => {
        document.title = "Update apartment";
        setLoading(true);
        getTypeOfApartments();
        getCountries();
        getCitiesByCountryId(selectedApartment.countryId)
        getFilters()

        setValue({ id: selectedApartment.cityId, name: selectedApartment.cityName })
        setSavedFiles(selectedApartment.images)
        if (selectedApartment.name == "") {
            GetUserApartment(id)
        }

    }, [selectedApartment]);

    const formik = useFormik({
        initialValues: selectedApartment,
        validationSchema: ApartmentSchema,
        enableReinitialize: true,
        onSubmit: async (values, { setFieldError }) => {
            try {
                await UpdateApartment(id, values, filesForSend, filesForDelete);
                navigate("/user/apartments/list");
                toast.success('Apartment update successfully!');
            }
            catch (exeption) {
                const serverErrors = exeption as ApartmentServerError;
                if (serverErrors.errors)
                    Object.entries(serverErrors.errors).forEach(([key, value]) => {
                        if (Array.isArray(value)) {
                            let message = "";
                            value.forEach((item) => {
                                message += `${item} `;
                            });
                            setFieldError(key.toLowerCase(), message);
                        }
                    });
                let message = "Update failed! \n";
                if (serverErrors.status === 400)
                    message += "Validation failed.";
                toast.error(message);
            }

        }
    });


    const handleImageChange = async function (e: React.ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files;
        if (!fileList || fileList.length === 0) return;
        let urlFiles = [] as Array<string>
        let files = [] as Array<File>
        for (let i = 0; i < fileList.length; i++) {
            urlFiles.push(URL.createObjectURL(fileList[i]))
            files.push(fileList[i])
        }

        setSelectedFilesForSend(urlFiles);
        setFilesForSend(files)
        setSelectedPhoto(0)
    };

    const handleLeftSlide = () => {
        if (selectedPhoto > 0)
            setSelectedPhoto(selectedPhoto - 1)
    }
    const handleRightSlide = () => {
        if (selectedPhoto < selectedFilesForSend.length - 1)
            setSelectedPhoto(selectedPhoto + 1)
    }

    const handleSecondLeftSlide = () => {
        if (selectedPhotoFromBack > 0)
            setSelectedPhotoFromBack(selectedPhotoFromBack - 1)
    }
    const handleSecondRightSlide = () => {
        if (selectedPhotoFromBack < formik.values.images.length - 1)
            setSelectedPhotoFromBack(selectedPhotoFromBack + 1)
    }

    const handleChangePageFirstTable = (event: any, newPage: number) => {
        setPageFirstTable(newPage)
    };
    const handleChangeRowsPerPageFirstTable = (event: any) => {
        setRowsPerPageFirstTable(parseInt(event.target.value, 10))
        setPageFirstTable(0)
    };

    const handleChangePageSecondTable = (event: any, newPage: number) => {
        setPageSecondTable(newPage)
    };
    const handleChangeRowsPerPageSecondTable = (event: any) => {
        setRowsPerPageSecondTable(parseInt(event.target.value, 10))
        setPageSecondTable(0)
    };

    const handleChangePageThirdTable = (event: any, newPage: number) => {
        setPageThirdTable(newPage)
    };
    const handleChangeRowsPerPageThirdTable = (event: any) => {
        setRowsPerPageThirdTable(parseInt(event.target.value, 10))
        setPageThirdTable(0)
    };

    const onAddFilter = (filterId: number) => {
        const index = filters.findIndex(elem => elem.id === filterId);
        const tmpList = formik.values.filters.slice();

        const indexTmpList = tmpList.findIndex(elem => elem.id === filterId);
        if (indexTmpList === -1) {
            tmpList.push(filters[index]);
            setFieldValue("filters", tmpList)
        }
    }
    const onRemoveFilter = (filterId: number) => {
        const index = formik.values.filters.findIndex(elem => elem.id === filterId);
        const tmpList = formik.values.filters.slice();
        tmpList.splice(index, 1);
        setFieldValue("filters", tmpList)
    }

    const addOrDeleteFile = (name: string) => {
        setSelectedPhotoFromBack(0)
        if (filesForDelete != null) {
            const indexForDelete = filesForDelete.findIndex(elem => elem === name);
            const indexForSave = savedFiles.findIndex(elem => elem === name);
            const tmpListForDelete = filesForDelete.slice();
            const tmpListForSave = savedFiles.slice();
            if (indexForDelete === -1) {
                tmpListForDelete.push(name)
                tmpListForSave.splice(indexForSave, 1);
            }
            else {
                tmpListForSave.push(name)
                tmpListForDelete.splice(indexForDelete, 1);
            }

            setFilesForDelete(tmpListForDelete);
            setSavedFiles(tmpListForSave);
        }
        else {
            const indexForSave = savedFiles.findIndex(elem => elem === name);
            const tmpListForDelete = [] as Array<string>;
            const tmpListForSave = savedFiles.slice();
            tmpListForDelete.push(name)
            tmpListForSave.splice(indexForSave, 1);
            setFilesForDelete(tmpListForDelete);
            setSavedFiles(tmpListForSave);
        }
    }
    const isImageDeleted = (name: string) => {
        if (filesForDelete != null) {
            const index = filesForDelete.findIndex(elem => elem == name);
            if (index === -1)
                return false
            else
                return true
        }
    }

    const setSelectedPhotoFromSavedFile = (name: string) => {
        const index = savedFiles.findIndex(elem => elem === name);
        setSelectedPhotoFromBack(index)
    }

    const { errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;


    return (
        <Box sx={{ flexGrow: 1, m: 1, mx: 3, width: { lg: "85%", md: "95%" } }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1 }}>
                <Typography variant="h4" gutterBottom color="#55FCF1" sx={{ my: "auto" }}>
                    Update apartment
                </Typography>
                <Button variant="contained" size="large" component={Link} to={`/user/apartments/list`} style={{ backgroundColor: "#45A29E", textDecoration: 'none', color: 'white' }}>
                    Back
                </Button>
            </Stack>
            {loading ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress sx={{ color: "#66fcf1", mt: 3 }} />
            </Box> :
                <>
                    <Box sx={{ mt: 3 }} >
                        <FormikProvider value={formik} >
                            <Form autoComplete="off" noValidate onSubmit={handleSubmit} >
                                <Box sx={{ width: "100%" }}>
                                    <Grid container>
                                        <Grid item xs={6} pr={2} >
                                            <Grid item xs={12} mb={3}>
                                                <CssTextField
                                                    fullWidth
                                                    autoComplete="name"
                                                    type="text"
                                                    label="Name"
                                                    {...getFieldProps('name')}
                                                    error={Boolean(touched.name && errors.name)}
                                                    helperText={touched.name && errors.name}
                                                />
                                            </Grid>
                                            <Grid item xs={12} mb={3}>
                                                <CssTextField
                                                    fullWidth
                                                    autoComplete="address"
                                                    type="text"
                                                    label="Address"
                                                    {...getFieldProps('address')}
                                                    error={Boolean(touched.address && errors.address)}
                                                    helperText={touched.address && errors.address}
                                                />
                                            </Grid>
                                            <Grid item xs={12} mb={3}>
                                                <CssTextField
                                                    fullWidth
                                                    autoComplete="B"
                                                    type="text"
                                                    label="Description"
                                                    multiline
                                                    rows={4}
                                                    {...getFieldProps('description')}
                                                    error={Boolean(touched.description && errors.description)}
                                                    helperText={touched.description && errors.description}
                                                />
                                            </Grid>

                                        </Grid>
                                        <Grid item xs={6} pl={2}>
                                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', height: "100%" }} style={{ position: "relative" }}>
                                                <IconButton disableRipple={true} onClick={handleLeftSlide} sx={{ color: "#f1f1f1", height: 40, width: 40 }} style={{ position: "absolute", top: "40%", left: "5px", zIndex: 2 }}>
                                                    <ArrowBackIosNew style={{ display: selectedPhoto == 0 ? 'none' : 'block' }} />
                                                </IconButton>
                                                <IconButton disableRipple={true} onClick={handleRightSlide} sx={{ color: "#f1f1f1", height: 40, width: 40 }} style={{ position: "absolute", top: "40%", right: "5px", zIndex: 2 }}>
                                                    <ArrowForwardIos style={{ display: (selectedPhoto == selectedFilesForSend.length - 1) || selectedFilesForSend.length == 0 ? 'none' : 'block' }} />
                                                </IconButton>
                                                <label htmlFor="Images" >
                                                    {selectedFilesForSend.length == 0
                                                        ? <img
                                                            src={fileSelected}
                                                            alt="Image"
                                                            style={{ height: "285px", cursor: "pointer", borderRadius: 7 }} />
                                                        : <SmallCarousel images={selectedFilesForSend} selectedItem={selectedPhoto} height={285} fromBack={false} />
                                                    }
                                                </label>
                                                <input style={{ display: "none" }} type="file" multiple name="Images" id="Images" onChange={handleImageChange} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={6} mb={3} pr={2}>
                                            <CssTextField
                                                fullWidth
                                                autoComplete="bedrooms"
                                                type="number"
                                                label="Bedrooms"
                                                {...getFieldProps('bedrooms')}
                                                error={Boolean(touched.bedrooms && errors.bedrooms)}
                                                helperText={touched.bedrooms && errors.bedrooms}
                                            />
                                        </Grid>
                                        <Grid item xs={6} mb={3} pl={2}>
                                            <CssTextField
                                                fullWidth
                                                autoComplete="price"
                                                type="number"
                                                label="Price / night"
                                                {...getFieldProps('price')}
                                                error={Boolean(touched.price && errors.price)}
                                                helperText={touched.price && errors.price}
                                            />
                                        </Grid>
                                        <Grid item xs={6} mb={3} pr={2}>
                                            <CssTextField
                                                fullWidth
                                                autoComplete="bathrooms"
                                                type="number"
                                                label="Bathrooms"
                                                {...getFieldProps('bathrooms')}
                                                error={Boolean(touched.bathrooms && errors.bathrooms)}
                                                helperText={touched.bathrooms && errors.bathrooms}
                                            />
                                        </Grid>
                                        <Grid item xs={6} mb={3} pl={2}>
                                            <CssTextField
                                                fullWidth
                                                autoComplete="beds"
                                                type="number"
                                                label="Beds"
                                                {...getFieldProps('beds')}
                                                error={Boolean(touched.beds && errors.beds)}
                                                helperText={touched.beds && errors.beds}
                                            />
                                        </Grid>
                                        <Grid item xs={6} mb={3} pr={2}>
                                            <Autocomplete
                                                options={countries}
                                                autoHighlight
                                                loading={loading}
                                                defaultValue={{ id: selectedApartment.countryId, code: "", name: selectedApartment.countryName } || ""}
                                                onChange={(e, value) => {
                                                    if (value) {
                                                        setFieldValue("countryId", value?.id)
                                                        getCitiesByCountryId(value?.id);
                                                        setFieldValue("cityId", "")
                                                        setValue(null)
                                                    }
                                                    else {
                                                        setFieldValue("countryId", "")
                                                        setFieldValue("cityId", "")
                                                        setValue(null)
                                                        getCitiesByCountryId(0);
                                                    }
                                                }}
                                                isOptionEqualToValue={(option, value) => option.id == value.id && option.name == value.name}
                                                getOptionLabel={(option) => option.name}
                                                renderOption={(props, option) => (
                                                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 }, backgroundColor: "#18181b" }} {...props}>
                                                        <img
                                                            loading="lazy"
                                                            width="20"
                                                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                            alt=""
                                                        />
                                                        {option.name}
                                                    </Box>
                                                )}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        {...getFieldProps('countryId')}
                                                        label="Country *"
                                                        error={Boolean(touched.countryId && errors.countryId)}
                                                        helperText={touched.countryId && errors.countryId}
                                                        inputProps={{
                                                            ...params.inputProps
                                                        }}
                                                    />
                                                )}
                                                PopperComponent={CustomPopper}
                                            />
                                        </Grid>
                                        <Grid item xs={6} mb={3} pl={2} >
                                            <Autocomplete
                                                options={cities}
                                                autoHighlight
                                                value={value}
                                                autoComplete={false}
                                                isOptionEqualToValue={(option, value) => option.id == value.id}
                                                onChange={(e, value) => {
                                                    setFieldValue("cityId", value?.id)
                                                    setValue(value);
                                                }}
                                                getOptionLabel={(option) => option.name}
                                                renderOption={(props, option) => (
                                                    <Box key={option.id} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                        {option.name}
                                                    </Box>
                                                )}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        {...getFieldProps('cityId')}
                                                        label="City"
                                                        inputProps={{
                                                            ...params.inputProps,
                                                        }}
                                                    />
                                                )}
                                                PopperComponent={CustomPopper}
                                            />
                                        </Grid>
                                        <Grid item xs={12} mb={3} pr={4}>
                                            <Grid item xs={6}>
                                                <Autocomplete
                                                    options={types}
                                                    autoHighlight
                                                    loading={loading}
                                                    defaultValue={{ id: selectedApartment.typeOfApartmentId, name: selectedApartment.typeOfApartmentName } || ""}
                                                    onChange={(e, value) => {
                                                        if (value) {
                                                            setFieldValue("typeOfApartmentId", value?.id)
                                                        }
                                                        else {
                                                            setFieldValue("typeOfApartmentId", "")
                                                        }
                                                    }}
                                                    isOptionEqualToValue={(option, value) => option.id == value.id && option.name == value.name}
                                                    getOptionLabel={(option) => option.name}
                                                    renderOption={(props, option) => (
                                                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 }, backgroundColor: "#18181b" }} {...props}>
                                                            {option.name}
                                                        </Box>
                                                    )}
                                                    renderInput={(params) => (
                                                        <CssTextField
                                                            {...params}
                                                            {...getFieldProps('typeOfApartmentId')}
                                                            label="Type of apartment *"
                                                            error={Boolean(touched.typeOfApartmentId && errors.typeOfApartmentId)}
                                                            helperText={touched.typeOfApartmentId && errors.typeOfApartmentId}
                                                            inputProps={{
                                                                ...params.inputProps
                                                            }}
                                                        />
                                                    )}
                                                    PopperComponent={CustomPopper}
                                                />
                                            </Grid>
                                        </Grid>
                                        {/* First table */}
                                        <Grid item xs={6} mb={3} pr={2}>
                                            <TableContainer component={Paper} sx={{ mt: 3, border: "1px solid #55FCF1", borderRadius: '7px' }}>
                                                <Table aria-label="custom pagination table">
                                                    <TableHead>
                                                        <TableRow >
                                                            <TableCell component="th" scope="row" sx={{ width: 70 }} align="center" >
                                                                Id
                                                            </TableCell>
                                                            <TableCell>
                                                                Name
                                                            </TableCell>
                                                            <TableCell align="right">
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {(rowsPerPageFirstTable > 0
                                                            ? filters.slice(pageFirstTable * rowsPerPageFirstTable, pageFirstTable * rowsPerPageFirstTable + rowsPerPageFirstTable)
                                                            : filters
                                                        ).map((row) => (
                                                            <TableRow key={row.id}>
                                                                <TableCell component="th" scope="row" sx={{ width: 70 }} align="center" >
                                                                    {row.id}.
                                                                </TableCell>
                                                                <TableCell>
                                                                    {row.name}
                                                                </TableCell>
                                                                <TableCell align="right">
                                                                    <IconButton aria-label="delete" sx={{ color: "#388e3c" }} onClick={() => onAddFilter(row.id)}>
                                                                        <Add />
                                                                    </IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                    <TableFooter>
                                                        <TableRow>
                                                            <TablePagination sx={{ border: 0, color: "#55FCF1" }}
                                                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                                                colSpan={3}
                                                                count={filters.length}
                                                                rowsPerPage={rowsPerPageFirstTable}
                                                                page={pageFirstTable}
                                                                SelectProps={{
                                                                    inputProps: {
                                                                        'aria-label': 'rows per page',
                                                                    },
                                                                    native: true,
                                                                }}
                                                                onPageChange={handleChangePageFirstTable}
                                                                onRowsPerPageChange={handleChangeRowsPerPageFirstTable}
                                                                ActionsComponent={TablePaginationActions}
                                                            />
                                                        </TableRow>
                                                    </TableFooter>
                                                </Table>
                                            </TableContainer>
                                        </Grid>
                                        {/* Second table */}
                                        <Grid item xs={6} mb={3} pl={2}>
                                            <TableContainer component={Paper} sx={{ mt: 3, border: "1px solid #55FCF1", borderRadius: '7px' }}>
                                                <Table aria-label="custom pagination table">
                                                    <TableHead>
                                                        <TableRow >
                                                            <TableCell component="th" scope="row" sx={{ width: 70 }} align="center" >
                                                                Id
                                                            </TableCell>
                                                            <TableCell>
                                                                Name
                                                            </TableCell>
                                                            <TableCell align="right">
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {(rowsPerPageSecondTable > 0
                                                            ? formik.values.filters.slice(pageSecondTable * rowsPerPageSecondTable, pageSecondTable * rowsPerPageSecondTable + rowsPerPageSecondTable)
                                                            : formik.values.filters
                                                        ).map((row) => (
                                                            <TableRow key={row.id}>
                                                                <TableCell component="th" scope="row" sx={{ width: 70 }} align="center" >
                                                                    {row.id}.
                                                                </TableCell>
                                                                <TableCell>
                                                                    {row.name}
                                                                </TableCell>
                                                                <TableCell align="right">
                                                                    <IconButton aria-label="delete" sx={{ color: "#d32f2f" }} onClick={() => onRemoveFilter(row.id)}>
                                                                        <Clear />
                                                                    </IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                    <TableFooter>
                                                        <TableRow>
                                                            <TablePagination sx={{ border: 0, color: "#55FCF1" }}
                                                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                                                colSpan={3}
                                                                count={formik.values.filters.length}
                                                                rowsPerPage={rowsPerPageSecondTable}
                                                                page={pageSecondTable}
                                                                SelectProps={{
                                                                    inputProps: {
                                                                        'aria-label': 'rows per page',
                                                                    },
                                                                    native: true,
                                                                }}
                                                                onPageChange={handleChangePageSecondTable}
                                                                onRowsPerPageChange={handleChangeRowsPerPageSecondTable}
                                                                ActionsComponent={TablePaginationActions}
                                                            />
                                                        </TableRow>
                                                    </TableFooter>
                                                </Table>
                                            </TableContainer>
                                        </Grid>
                                        {/* Third table */}
                                        <Grid item xs={6} mb={3} pr={2}>
                                            <TableContainer component={Paper} sx={{ mt: 3, border: "1px solid #55FCF1", borderRadius: '7px' }}>
                                                <Table aria-label="custom pagination table">
                                                    <TableHead>
                                                        <TableRow >
                                                            <TableCell component="th" scope="row" sx={{ width: 70 }} align="center" >
                                                                №
                                                            </TableCell>
                                                            <TableCell sx={{ width: 70 }}>
                                                                Image
                                                            </TableCell>
                                                            <TableCell align="right">
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {(rowsPerPageThirdTable > 0
                                                            ? formik.values.images.slice(pageThirdTable * rowsPerPageThirdTable, pageThirdTable * rowsPerPageThirdTable + rowsPerPageThirdTable)
                                                            : formik.values.images
                                                        ).map((row, index) => (
                                                            <TableRow key={row}>
                                                                <TableCell component="th" scope="row" sx={{ width: 70 }} align="center" >
                                                                    {index + 1}.
                                                                </TableCell>
                                                                <TableCell sx={{ width: 70 }}>
                                                                    <Avatar
                                                                        src={baseURL + row}
                                                                        alt="Image"
                                                                    />
                                                                </TableCell>
                                                                <TableCell align="right">
                                                                    <IconButton sx={{ color: "#0288d1" }} disabled={isImageDeleted(row)} onClick={() => { setSelectedPhotoFromSavedFile(row) }}>
                                                                        <RemoveRedEyeOutlined />
                                                                    </IconButton>
                                                                    {isImageDeleted(row)
                                                                        ? <IconButton aria-label="delete" sx={{ color: "#388e3c" }} onClick={() => addOrDeleteFile(row)}>
                                                                            <Add />
                                                                        </IconButton>
                                                                        : <IconButton sx={{ color: "#d32f2f" }} onClick={() => { addOrDeleteFile(row) }}>
                                                                            <Clear />
                                                                        </IconButton>}
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                    <TableFooter>
                                                        <TableRow>
                                                            <TablePagination sx={{ border: 0, color: "#55FCF1" }}
                                                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                                                colSpan={3}
                                                                count={formik.values.images.length}
                                                                rowsPerPage={rowsPerPageThirdTable}
                                                                page={pageThirdTable}
                                                                SelectProps={{
                                                                    inputProps: {
                                                                        'aria-label': 'rows per page',
                                                                    },
                                                                    native: true,
                                                                }}
                                                                onPageChange={handleChangePageThirdTable}
                                                                onRowsPerPageChange={handleChangeRowsPerPageThirdTable}
                                                                ActionsComponent={TablePaginationActions}
                                                            />
                                                        </TableRow>
                                                    </TableFooter>
                                                </Table>
                                            </TableContainer>
                                        </Grid>
                                        <Grid item xs={6} pl={2} pt={3}>
                                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', height: "100%" }} style={{ position: "relative" }}>
                                                <IconButton disableRipple={true} onClick={handleSecondLeftSlide} sx={{ color: "#f1f1f1", height: 40, width: 40 }} style={{ position: "absolute", top: "35%", left: "5px", zIndex: 2 }}>
                                                    <ArrowBackIosNew style={{ display: selectedPhotoFromBack == 0 ? 'none' : 'block' }} />
                                                </IconButton>
                                                <IconButton disableRipple={true} onClick={handleSecondRightSlide} sx={{ color: "#f1f1f1", height: 40, width: 40 }} style={{ position: "absolute", top: "35%", right: "5px", zIndex: 2 }}>
                                                    <ArrowForwardIos style={{ display: (selectedPhotoFromBack == savedFiles.length - 1) || savedFiles.length == 0 ? 'none' : 'block' }} />
                                                </IconButton>
                                                {savedFiles.length == 0
                                                    ? <img
                                                        src={emptyImage}
                                                        alt="Image"
                                                        style={{ height: "285px", cursor: "pointer", borderRadius: 7 }} />
                                                    : <SmallCarousel images={savedFiles} selectedItem={selectedPhotoFromBack} height={285} />
                                                }
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} mt={3} display="flex" justifyContent="end" >
                                            <LoadingButton
                                                sx={{ paddingX: "35px" }}
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                                loading={isSubmitting}
                                                style={{ backgroundColor: "#45A29E" }}
                                            >
                                                Update
                                            </LoadingButton>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Form>
                        </FormikProvider>
                    </Box >
                </>
            }
        </Box >
    )
}

export default UpdateApartment;